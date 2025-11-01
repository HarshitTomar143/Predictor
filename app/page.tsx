"use client"
import { useState, useRef } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [marks, setMarks] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load answer key
  const answerKey: { [key: string]: string } = {
    "q1": "A",
    "q2": "B",
    "q3": "C",
    "q4": "D",
    "q5": "A",
    "q6": "B",
    "q7": "C",
    "q8": "D",
    "q9": "A",
    "q10": "B",
    "q11": "C",
    "q12": "D",
    "q13": "A",
    "q14": "B",
    "q15": "C",
    "q16": "D",
    "q17": "A",
    "q18": "B",
    "q19": "C",
    "q20": "D",
    "q21": "A",
    "q22": "B",
    "q23": "C",
    "q24": "D",
    "q25": "A",
    "q26": "B",
    "q27": "C",
    "q28": "D",
    "q29": "A",
    "q30": "B",
    "q31": "C",
    "q32": "D",
    "q33": "A",
    "q34": "B",
    "q35": "C",
    "q36": "D",
    "q37": "A",
    "q38": "B",
    "q39": "C",
    "q40": "D",
    "q41": "A",
    "q42": "B",
    "q43": "C",
    "q44": "D",
    "q45": "A",
    "q46": "B",
    "q47": "C",
    "q48": "D",
    "q49": "A",
    "q50": "B",
    "q51": "C",
    "q52": "D",
    "q53": "A",
    "q54": "B",
    "q55": "C",
    "q56": "D",
    "q57": "A",
    "q58": "B",
    "q59": "C",
    "q60": "D"
  };

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    setIsSuccess(true);
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
    
    // Process the file to calculate marks
    processFileForMarks(selectedFile);
  };

  const processFileForMarks = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const uploadedAnswers = JSON.parse(e.target?.result as string);
        let correct = 0;
        
        // Compare answers
        for (const question in answerKey) {
          if (uploadedAnswers[question] === answerKey[question]) {
            correct++;
          }
        }
        
        setCorrectCount(correct);
        setMarks(correct * 4);
      } catch (error) {
        console.error("Error processing file:", error);
        setMarks(null);
        setCorrectCount(null);
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full max-w-md p-8 bg-white dark:bg-black rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
          Answer Checker
        </h1>
        
        {/* File Upload Section */}
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
            isDragging 
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
              : "border-gray-300 hover:border-gray-400 dark:border-zinc-700 dark:hover:border-zinc-600"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            className="hidden"
            aria-label="File upload"
            accept=".json"
          />
          
          <div className="flex flex-col items-center justify-center gap-3">
            <svg 
              className="w-10 h-10 text-gray-400 dark:text-zinc-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="text-gray-600 dark:text-zinc-400">
              <span className="font-medium text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-gray-500 dark:text-zinc-500">
              JSON files only
            </p>
          </div>
        </div>
        
        {/* Success Message */}
        {isSuccess && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center animate-fadeIn">
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span>File uploaded successfully!</span>
          </div>
        )}
        
        {/* File Info Display */}
        {file && (
          <div className="mt-4 p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg">
            <p className="text-sm font-medium text-gray-900 dark:text-zinc-50">Uploaded File:</p>
            <p className="text-sm text-gray-600 dark:text-zinc-400 truncate">{file.name}</p>
            <p className="text-xs text-gray-500 dark:text-zinc-500 mt-1">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}
        
        {/* Marks Display */}
        {marks !== null && correctCount !== null && (
          <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-bold text-center text-blue-800 dark:text-blue-200 mb-4">
              Results
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white dark:bg-black rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Correct Answers</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{correctCount}/60</p>
              </div>
              <div className="text-center p-3 bg-white dark:bg-black rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Your Marks</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{marks}/240</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Calculation: {correctCount} correct × 4 = {marks} marks
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}