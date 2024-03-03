import React, { useState } from "react";
import "./App.css";
import DragDropFiles from "./components/DragDropFiles";
import Loader from "./components/loader";
function App() {
  const [selectedFileType, setSelectedFileType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [droppedFile, setDroppedFile] = useState(null);
  // Event handler for when the user selects an option
  const handleFileTypeChange = (event) => {
    setSelectedFileType(event.target.value);
    setIsLoading(true);
    // axios
    //   .post("/api/upload")
    //   .then(() => {
    //     setIsLoading(false); // Stop loading after data is fetched
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setIsLoading(false);
    //   });
    setTimeout(() => {
      setIsLoading(false); // Stop loading after data is fetched
    }, 2000);
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    // Assuming you want to upload the first file only
    const file = files[0];
    console.log("File dropped:", file);
    // You can perform upload logic here
    setDroppedFile(file); // Set the dropped file in state
    setIsLoading(true); // You can set loading state here if needed
  };

  // Prevent default behavior for drag events
  const handleDragOver = (event) => {
    event.preventDefault();
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
      <div
        className="border border-gray-300 border-dashed rounded-md p-6"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="text-lg font-medium text-gray-600">
          Drag and Drop your media files here
        </div>
        <div className="text-sm text-gray-500 mt-1">
          Supported formats: JPG, PNG, PDF, MP4, etc.
        </div>
      </div>
      {droppedFile && (
        <div className="mt-4">
          <div>File Name: {droppedFile.name}</div>
          <div>File Size: {droppedFile.size} bytes</div>
          <div>File Type: {droppedFile.type}</div>
        </div>
      )}
      <Loader isLoading={isLoading} />
      <div className="text-cyan-500">
        Hi, this is Vishruth. You selected: {selectedFileType}
      </div>
      <DragDropFiles />
    </div>
  );
}

export default App;
