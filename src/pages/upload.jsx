import React, { useState, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import "../styles/upload.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileType = selectedFile.type;

      if (fileType !== "application/json" && fileType !== "application/pdf") {
        toast.error("❌ Only JSON or PDF files are allowed.");
        setFile(null);
        setFileName("");
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      toast.success("✅ File uploaded successfully!");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.warning("⚠️ Please upload a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("✅ File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("❌ Error uploading file. Please try again.");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="upload-container">
      <ToastContainer />
      <h2>Upload Your Data</h2>
      <div className="upload-section">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button onClick={handleButtonClick}>
          <FaCloudUploadAlt /> Upload File
        </button>
        {fileName && <p>Selected File: {fileName}</p>}
      </div>
      <button onClick={handleUpload}>Submit</button>
    </div>
  );
};

export default Upload;