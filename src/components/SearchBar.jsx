import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../features/recordsSlice';

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by ID, Name, or Email"
        className="w-full p-2 border rounded"
        onKeyUp={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
