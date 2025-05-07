import React from 'react';
import { useDispatch } from 'react-redux';
import { uploadRecords } from '../features/recordsSlice';

const Upload = () => {
  const dispatch = useDispatch();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        dispatch(uploadRecords(json));
      } catch (err) {
        console.error('Invalid JSON file:', err);
        alert("Invalid JSON format. Please upload a valid JSON file.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="w-full">
      <label
        htmlFor="jsonUpload"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Upload JSON File
      </label>
      <input
        id="jsonUpload"
        type="file"
        accept=".json"
        onChange={handleUpload}
        className="block w-full text-sm text-gray-900 file:mr- file:py-3 file:px-4
                   file:rounded-md file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100
                   cursor-pointer border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default Upload;
