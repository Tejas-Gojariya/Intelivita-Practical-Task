import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../features/recordsSlice';

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="mb-8">
      <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
        Search Records
      </label>
      <div className="relative">
        <input
          id="search"
          type="text"
          placeholder="Search by ID, Name, or Email..."
          onKeyUp={handleSearch}
          className="w-full rounded-lg border border-gray-300 bg-white py-3 px-4 pr-10 text-sm shadow-sm 
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
                     placeholder-gray-400"
        />
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
