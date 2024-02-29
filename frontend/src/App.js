import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedFileType, setSelectedFileType] = useState("");

  // Event handler for when the user selects an option
  const handleFileTypeChange = (event) => {
    setSelectedFileType(event.target.value);
  };

  return (
    <div className="p-4">
      <label htmlFor="fileType" className="block mb-2 text-gray-700">
        Select File Type:
      </label>
      <select
        id="fileType"
        name="fileType"
        value={selectedFileType} // Controlled component: value is determined by state
        onChange={handleFileTypeChange} // Event handler for changes
        className="block w-full px-4 py-2 mt-1 mb-4 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="images">Images</option>
        <option value="pdfs">PDFs</option>
        <option value="documents">Documents</option>
        <option value="videos">Videos</option>
        <option value="audio">Audio</option>
        <option value="archives">Archives</option>
        <option value="others">Others</option>
      </select>
      <div className="text-cyan-500">
        Hi, this is Vishruth. You selected: {selectedFileType}
      </div>
    </div>
  );
}

export default App;
