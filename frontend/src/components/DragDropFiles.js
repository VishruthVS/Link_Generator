import { useRef, useState } from "react";

const DragDropFiles = () => {
  const [files, setFiles] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  // send files to the server // learn from my other video
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("Files", files);
    console.log(formData.getAll());
    // fetch(
    //   "link", {
    //     method: "POST",
    //     body: formData
    //   }
    // )
  };

  //   if (files)
  //     return (
  //       <div className="uploads">
  //         <ul>
  //           {Array.from(files).map((file, idx) => (
  //             <li key={idx}>{file.name}</li>
  //           ))}
  //         </ul>
  //         <div className="actions">
  //           <button onClick={() => setFiles(null)}>Cancel</button>
  //           <button onClick={handleUpload}>Upload</button>
  //         </div>
  //       </div>
  //     );

  //   return (
  //     <>
  //       <div className="dropzone" onDragOver={handleDragOver} onDrop={handleDrop}>
  //         <h1>Drag and Drop Files to Upload</h1>
  //         <h1>Or</h1>
  //         <input
  //           type="file"
  //           multiple
  //           onChange={(event) => setFiles(event.target.files)}
  //           hidden
  //           accept="image/png, image/jpeg"
  //           ref={inputRef}
  //         />
  //         <button onClick={() => inputRef.current.click()}>Select Files</button>
  //       </div>
  //     </>
  //   );
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
              {file.name}
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
          >
            Upload
          </button>
        </div>
      </div>
    );
  }
};

export default DragDropFiles;
