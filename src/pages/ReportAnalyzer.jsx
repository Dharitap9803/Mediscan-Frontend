import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import "../styles/ReportAnalyzer.css";
import image from "/src/assets/images/image.jpg";
import loader from "../../src/assets/images/Loading (1).gif";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReportAnalyzer = () =>
{
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) =>
  {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const fileType = selectedFile.type;

      // Allow only JSON and PDF files
      if (fileType !== "application/pdf" && fileType !== "application/json") {
        toast.error("❌ Only JSON files are allowed.");
        setFile(null);
        setFileName('');
        return;
      }

      setFile(selectedFile);
      setFileName(selectedFile.name);
      toast.success("✅ File uploaded successfully!");
    }
  };

  const handleUpload = async () =>
  {
    if (!file) {
      toast.warning("⚠️ Please upload a lab report first.");
      return;
    }

    if (file.type === "application/json") {
      toast.info("ℹ️ JSON file uploaded successfully, but it won't be analyzed.");
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/medical/upload-pdf`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response)

      toast.success("✅ File uploaded and sent for analysis!");
      navigate('/Visualize', { state: response.data.report });

    } catch (error) {
      console.error('Error uploading file', error);
      toast.error("❌ Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () =>
  {
    fileInputRef.current.click();
  };

  return (
    <>
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3001} hideProgressBar={false} closeOnClick pauseOnHover draggable theme="colored" />

      {loading ? (
        <div className="loading">
          <img className="gif" src={loader} alt="Loading..." />
          <p>Uploading...</p>
        </div>
      ) : (
        <div className={`card-container ${loading ? 'blur-effect' : ''}`}>
          <div className="card1">
            <h2 className="title">Upload your "LAB REPORT"</h2>
            <p className="subtitle">Please attach a LAB REPORT to proceed</p>

            <div className="upload-section">
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <button className="upload-button" onClick={handleButtonClick} disabled={loading}>
                <FaCloudUploadAlt />
                <span>Upload LAB REPORT</span>
              </button>
            </div>

            <div className="divider"></div>

            <div className="attached-section">
              <p className="attached-title">Attached LAB REPORT</p>
              <p className="attached-placeholder">
                {fileName ? fileName : 'Uploaded LAB REPORT will be shown here'}
              </p>
            </div>

            <button className="continue-button" onClick={handleUpload}>
              Continue
            </button>
          </div>

          <div className="card2">
            <h2 className="card-title">Guide to upload a LAB REPORT</h2>
            <div className="card-content">
              <img
                src={image}
                className="card-image"
                alt="Guide to upload LAB REPORT"
              />
              <ul className="card-instructions">
                <li>Supported file types: JSON (.json), </li>
                <li>Maximum allowed file size: 2MB</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportAnalyzer;