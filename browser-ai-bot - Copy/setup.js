const fs = require("fs");
const path = require("path");

// Define the project structure
const projectName = "browser-ai-bot";
const files = [
  "manifest.json",
  "background.js",
  "content.js",
  "popup.html",
  "popup.js",
  "styles.css",
  "icon.png"
];

// Create the main project folder
const projectPath = path.join(__dirname, projectName);
if (!fs.existsSync(projectPath)) {
  fs.mkdirSync(projectPath);
}

// Create each file inside the project folder
files.forEach(file => {
  const filePath = path.join(projectPath, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "", "utf8"); // Create an empty file
    console.log(`Created: ${file}`);
  }
});

console.log("Project structure created successfully!");
