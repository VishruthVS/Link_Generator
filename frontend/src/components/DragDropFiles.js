import axios from "axios";
import { useRef, useState } from "react";

const DragDropFiles = () => {
  const [files, setFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  // Send files to the server
  const handleUpload = async () => {
    setIsLoading(true);
    console.log(files);

    const formData = new FormData();
    formData.append("Files", files[0]); // Assuming you only want to upload the first file
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const fileId = response.data.id; // Retrieve the id from the response
      console.log("Upload completed. File ID:", fileId);
      console.log("Upload completed:", response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsLoading(false);
    }
  };

  if (!files) {
    return (
      <div
        className="border border-gray-300 border-dashed rounded-md p-6"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h1 className="text-lg font-medium text-gray-600">
          Drag and Drop Files to Upload
        </h1>
        <h1>Or</h1>
        <input
          type="file"
          multiple
          onChange={(event) => setFiles(event.target.files)}
          hidden
          accept="image/png, image/jpeg"
          ref={inputRef}
          className="hidden"
        />
        <button
          onClick={() => inputRef.current.click()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Select Files
        </button>
      </div>
    );
  } else {
    return (
      <div className="uploads">
        <ul className="space-y-2">
          {Array.from(files).map((file, idx) => (
            <li key={idx} className="bg-gray-200 rounded-md p-2">
              <div>
                <strong>File Name:</strong> {file.name}
              </div>
              <div>
                <strong>File Size:</strong> {file.size} bytes
              </div>
              <div>
                <strong>File Type:</strong> {file.type}
              </div>
            </li>
          ))}
        </ul>
        <div className="actions mt-4">
          <button
            onClick={() => setFiles(null)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    );
  }
};

export default DragDropFiles;
