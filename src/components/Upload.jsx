import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadRecords } from '../features/recordsSlice';

const Upload = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setError('Please select a JSON file to upload.');
      setSuccess('');
      return;
    }
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        dispatch(uploadRecords(json));
        setSuccess('File uploaded successfully!');
        setError('');
      } catch (err) {
        setError('Error parsing JSON file. Please check the file format.');
        setSuccess('');
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
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {success && <p className="mt-2 text-green-500">{success}</p>}
    </div>
  );
};

export default Upload;
