import React, { useState } from "react";
import "./App.css";
import DragDropFiles from "./components/DragDropFiles";
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
    <div>
      <div role="alert" class="rounded-xl border border-gray-100 bg-white p-4">
  <div class="flex items-start gap-4">
    <span class="text-green-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </span>

  <div class="flex-1">
  <strong class="block font-medium text-gray-900"> </strong>

  <p class="mt-1 text-sm font-semibold text-gray-700"> Note: Please avoid uploading images larger than 100KB.</p>
</div>


    <button class="text-gray-500 transition hover:text-gray-600">
      <span class="sr-only">Dismiss popup</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-6 w-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</div>
        <DragDropFiles />
    </div>
    /*
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
        <option value="images">images</option>
        <option value="pdfs">PDFs</option>
        <option value="documents">Docum</option>
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
    */
  );
}

export default App;
