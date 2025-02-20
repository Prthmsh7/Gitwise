import { useState } from 'react';
import { 
  FaChevronDown, 
  FaChevronRight, 
  FaFolder, 
  FaFolderOpen,
  FaFileCode,
  FaFile,
  FaImage,
} from 'react-icons/fa';

const getFileIcon = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  
  const iconMap = {
    js: <FaFileCode className="text-yellow-500" />,
    jsx: <FaFileCode className="text-blue-500" />,
    ts: <FaFileCode className="text-blue-600" />,
    tsx: <FaFileCode className="text-blue-600" />,
    py: <FaFileCode className="text-green-500" />,
    html: <FaFileCode className="text-orange-500" />,
    css: <FaFileCode className="text-blue-400" />,
    png: <FaImage className="text-purple-500" />,
    jpg: <FaImage className="text-purple-500" />,
    jpeg: <FaImage className="text-purple-500" />,
    default: <FaFile className="text-gray-400" />
  };

  return iconMap[extension] || iconMap.default;
};

const FileTreeNode = ({ fileName, nodes, onSelect, path }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isDir = !!nodes;

  const handleClick = (e) => {
    e.stopPropagation();
    if (isDir) {
      setIsExpanded(!isExpanded);
    } else {
      onSelect(path);
    }
  };

  return (
    <div className="file-tree-node">
      <div 
        onClick={handleClick}
        className={`flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-700 rounded
          ${!isDir && 'hover:text-blue-400'}`}
      >
        {isDir && (
          <span className="text-gray-400">
            {isExpanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
          </span>
        )}
        <span className="text-lg">
          {isDir ? (
            isExpanded ? <FaFolderOpen className="text-yellow-400" /> : <FaFolder className="text-yellow-400" />
          ) : (
            getFileIcon(fileName)
          )}
        </span>
        <span className={`text-sm text-gray-100 ${isDir ? 'font-medium' : ''}`}>
          {fileName}
        </span>
      </div>

      {isDir && isExpanded && fileName !== "node_modules" && (
        <ul className="ml-4 border-l border-gray-600">
          {Object.keys(nodes).sort((a, b) => {
            const aIsDir = !!nodes[a];
            const bIsDir = !!nodes[b];
            if (aIsDir && !bIsDir) return -1;
            if (!aIsDir && bIsDir) return 1;
            return a.localeCompare(b);
          }).map((child) => (
            <li key={child}>
              <FileTreeNode
                onSelect={onSelect}
                path={path + "/" + child}
                fileName={child}
                nodes={nodes[child]}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const FileTree = ({ tree, onSelect }) => {
  return (
    <div className="p-2">
      <FileTreeNode onSelect={onSelect} fileName="/" path="" nodes={tree} />
    </div>
  );
};

export default FileTree;
