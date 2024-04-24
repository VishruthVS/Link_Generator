import axios from "axios";
import { useRef, useState } from "react";
const FormData = require("form-data");

const DragDropFiles = () => {
  const [files, setFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();
  const [webViewLink, setWebViewLink] = useState("");
  const [webContentLink, setWebContentLink] = useState("");
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    setFiles(droppedFiles);
  };

  // Send files to the server
  const handleUpload = async () => {
    setIsLoading(true);
    console.log(files);

    const formData = new FormData();
    formData.append("Files", files[0]); // Assuming you only want to upload the first file
    // console.log(formData);
    console.log(formData.get("Files"));
    // for (var x of formData) console.log(x);

    // console.log(formData);
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    try {
      console.log("Before Axios Post");
      // const response = await axios.post(
      //   "http://localhost:5000/api/upload",
      //   { formData },
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //     processData: false, // Prevent jQuery from automatically processing the data
      //     contentType: false, // Prevent jQuery from automatically setting Content-Type
      //   }
      // );
      // const response = await axios({
      //   method: "post",
      //   url: "http://localhost:5000/api/upload",
      //   data: formData,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //     //  boundary=${formData._boundary}`,
      //   },
      // });
      const response = await axios.post(
        "https://cerise-piglet-sari.cyclic.app/api/upload",
        formData
        // {
        //   // headers: {
        //   //   "Content-Type": "multipart/form-data",
        //   // },
        //   // headers: { "Content-Type": "multipart/form-data" },
        //   // processData: false, // Prevent jQuery from automatically processing the data
        //   // contentType: false, // Prevent jQuery from automatically setting Content-Type
        // }
      );
      console.log("After Axios Post"); // Add this line
      console.log("hi");

      const fileId = response.data.id; // Retrieve the id from the response
       const urlResponse = await axios.get(
        `https://cerise-piglet-sari.cyclic.app/api/generate-url/${fileId}`
      )
      console.log("Upload completed. File ID:", fileId);
      console.log("Upload completed:", response.data);
        console.log("Response data:", response.data);
      setIsLoading(false);
      setWebViewLink(urlResponse.data.webViewLink);
      setWebContentLink(urlResponse.data.webContentLink);
     console.log("webViewLink:", urlResponse.data.webViewLink);
console.log("webContentLink:", urlResponse.data.webContentLink);

    } catch (error) {
      console.error("Error uploading file:", error);
      setIsLoading(false);
     
    }
  };
  const handleFileInputChange = (event) => {
    const selectedFiles = event.target.files;
    console.log("Selected files:", selectedFiles);
    console.log("selectedFiles");
    setFiles(selectedFiles);
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
          name="Files"
          multiple
          // onChange={(event) => setFiles(event.target.files)}
          onChange={handleFileInputChange}
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
          {/* Display links if available */}
        {webViewLink && (
          <div>
            <strong>WebView Link:</strong>{" "}
            <a href={webViewLink} target="_blank" rel="noopener noreferrer">
              {webViewLink}
            </a>
          </div>
        )}
        {webContentLink && (
          <div>
            <strong>WebContent Link:</strong>{" "}
            <a href={webContentLink} target="_blank" rel="noopener noreferrer">
              {webContentLink}
            </a>
          </div>
        )}
        </div>
      </div>
    );
  }
};

export default DragDropFiles;
