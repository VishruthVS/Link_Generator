import React, { useState } from "react";
import "./App.css";
import Loader from "./components/loader";

function App() {
  const [selectedFileType, setSelectedFileType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Event handler for when the user selects an option
  const handleFileTypeChange = (event) => {
    setSelectedFileType(event.target.value);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); // Stop loading after data is fetched
    }, 2000);
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
      <Loader isLoading={isLoading} />
      <div className="text-cyan-500">
        Hi, this is Vishruth. You selected: {selectedFileType}
      </div>
    </div>
  );
}

export default App;
