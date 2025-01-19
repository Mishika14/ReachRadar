import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import extractText from "../helperfunctions/ExtractTextfromPDF";
import processImage from "../helperfunctions/Imagetext";
import AnalysisPage from "./AnalysisPage";

const FileUpload = () => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [resultText, setResultText] = useState(""); // Store extracted text
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (file) {
            const fileType = file.type;
            if (fileType === "application/pdf" || fileType === "image/png" || fileType === "image/jpeg") {
                toast.success(
                    `Uploaded ${fileType === "application/pdf" ? "PDF" : "Image"} file.`
                );
                const processFile = fileType === "application/pdf" ? extractText : processImage;

                setIsLoading(true); // Set loading to true

                processFile(file)
                    .then((text) => {
                        setResultText(text);
                        setIsLoading(false); // Stop loading after success
                        toast.success("Text extraction successful!");
                    })
                    .catch((err) => {
                        console.error("File Processing Error:", err);
                        setIsLoading(false); // Stop loading on error
                        toast.error("Failed to process the file. Please try again.");
                    });
            } else {
                toast.error("File format not supported. Please use PDF, PNG, or JPEG.");
            }
        } else {
            toast.error("No file selected!");
        }
    };

    return (
        <>
            <div className="min-h-screen bg-black flex flex-col lg:flex-row">
                {/* Toast container */}
                <ToastContainer />
                
                {/* Left Section */}
                <div className="flex-1 flex flex-col justify-center items-center p-6 bg-black text-white shadow-lg lg:w-1/2">
                    <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">
                        Upload Your Documents Here
                    </h1>

                    <div
                        className={`border-dashed border-4 rounded-lg h-1/2 w-full max-w-lg text-center transition-all duration-300 ${
                            dragActive ? "bg-gray-200 border-black" : "bg-slate-600 border-gray-400"
                        }`}
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                    >
                        <div className="flex flex-col items-center text-center mb-6">
                            <img src="/images/file.png" alt="Upload" className="h-14 mb-4" />
                            <p className="text-gray-300">Drag and drop your file here or click to upload</p>
                        </div>

                        <div className="flex flex-col gap-4 items-center">
                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="fileInput"
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-8 py-3 rounded-lg cursor-pointer"
                            >
                                Select File
                            </label>
                            <button
                                onClick={handleUpload}
                                className="bg-red-400 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Upload File
                            </button>
                        </div>

                        {file && (
                            <p className="text-sm text-gray-300 mt-4">
                                Selected File: <strong>{file.name}</strong>
                            </p>
                        )}
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex-1 flex flex-col justify-center items-center p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black lg:w-1/2">
                    <div className="w-full max-w-3xl h-[600px] bg-white flex flex-col items-center text-black p-8 rounded-2xl shadow-2xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                        <h3 className="text-4xl font-extrabold font-nunito mb-6 text-gray-900 text-center tracking-wide">
                            Extracted Text
                        </h3>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <p className="text-gray-600 text-lg animate-pulse">Extracting text, please wait...</p>
                            </div>
                        ) : (
                            <p className="text-gray-700 whitespace-pre-wrap text-base leading-relaxed">
                                {resultText || "No text extracted yet."}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Conditional rendering for the Analysis page */}
            {resultText && <AnalysisPage result={resultText} />}
        </>
    );
};

export default FileUpload;
