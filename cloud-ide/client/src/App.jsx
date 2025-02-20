import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Terminal from "./components/terminal";
import FileTree from "./components/tree";
import socket from "./socket";
import AceEditor from "react-ace";

// Import necessary Ace editor modes
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

// Rename the function to avoid conflicts
const determineFileMode = (filename) => {
  if (!filename) return 'text';
  
  const extension = filename.split('.').pop().toLowerCase();
  const modeMap = {
    'js': 'javascript',
    'jsx': 'javascript',
    'py': 'python',
    'html': 'html',
    'css': 'css',
  };
  return modeMap[extension] || 'text';
};

function App() {
  const [fileTree, setFileTree] = useState({});
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [code, setCode] = useState("");
  const [fileTreeWidth, setFileTreeWidth] = useState(250); // Default width
  const [isResizing, setIsResizing] = useState(false);

  const isSaved = selectedFileContent === code;

  // Add this useEffect to fetch the file tree on component mount
  useEffect(() => {
    getFileTree(); // Initial fetch when component mounts
  }, []);

  useEffect(() => {
    if (!isSaved && code) {
      const timer = setTimeout(() => {
        socket.emit("file:change", {
          path: selectedFile,
          content: code,
        });
      }, 5 * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [code, selectedFile, isSaved]);

  useEffect(() => {
    setCode("");
  }, [selectedFile]);

  useEffect(() => {
    setCode(selectedFileContent);
  }, [selectedFileContent]);

  const getFileTree = async () => {
    try {
      const response = await fetch("http://localhost:9000/files");
      const result = await response.json();
      setFileTree(result.tree);
    } catch (error) {
      console.error("Error fetching file tree:", error);
    }
  };

  const getFileContents = useCallback(async () => {
    if (!selectedFile) return;
    const response = await fetch(
      `http://localhost:9000/files/content?path=${selectedFile}`
    );
    const result = await response.json();
    setSelectedFileContent(result.content);
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) getFileContents();
  }, [getFileContents, selectedFile]);

  useEffect(() => {
    socket.on("file:refresh", getFileTree);
    return () => {
      socket.off("file:refresh", getFileTree);
    };
  }, []);

  // Handle mouse down on the resize handle
  const handleMouseDown = (e) => {
    setIsResizing(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Handle mouse move while resizing
  const handleMouseMove = useCallback((e) => {
    if (isResizing) {
      // Limit the minimum and maximum width
      const newWidth = Math.max(150, Math.min(600, e.clientX));
      setFileTreeWidth(newWidth);
    }
  }, [isResizing]);

  // Handle mouse up after resizing
  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  // Clean up event listeners
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className="playground-container bg-gray-900">
      <div className="editor-container">
        {/* File Tree with dynamic width */}
        <div 
          className="files"
          style={{ width: fileTreeWidth, minWidth: fileTreeWidth, maxWidth: fileTreeWidth }}
        >
          <FileTree
            onSelect={(path) => {
              setSelectedFileContent("");
              setSelectedFile(path);
            }}
            tree={fileTree}
          />
        </div>

        {/* Resize Handle */}
        <div
          className="resize-handle"
          onMouseDown={handleMouseDown}
          style={{ 
            cursor: isResizing ? 'col-resize' : 'ew-resize',
            userSelect: 'none'
          }}
        />

        {/* Editor */}
        <div className="editor bg-gray-800 rounded-lg shadow-xl">
          {selectedFile && (
            <p className="px-4 py-2 text-gray-300 border-b border-gray-700 flex justify-between items-center">
              <span>{selectedFile.replaceAll("/", " > ")}</span>
              <span className={`px-2 py-1 rounded-md text-sm ${
                isSaved 
                ? 'bg-green-500/20 text-green-300' 
                : 'bg-yellow-500/20 text-yellow-300'
              }`}>
                {isSaved ? "Saved" : "Unsaved"}
              </span>
            </p>
          )}
          <AceEditor
            width="100%"
            height="calc(100vh - 150px)"
            mode={determineFileMode(selectedFile)}
            theme="dracula"
            value={code}
            onChange={(e) => setCode(e)}
            name="code-editor"
            fontSize={14}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
            className="rounded-b-lg"
          />
        </div>
      </div>
      <div className="terminal-container">
        <Terminal />
      </div>
    </div>
  );
}

export default App;
