
import React from 'react';
import { useDispatch } from 'react-redux';
import { uploadRecords } from '../features/recordsSlice';

const Upload = () => {
  const dispatch = useDispatch();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        dispatch(uploadRecords(json));
      } catch (err) {
        console.log('Error:', err);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="mb-4">
      <label className="text-md font-semibold mb-2">Upload JSON</label>
      <input
        type="file"
        accept=".json"
        onChange={handleUpload}
        className="border p-2 rounded-md w-full"
      />
    </div>
  );
};

export default Upload;
