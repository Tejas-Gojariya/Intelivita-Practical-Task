import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editRecord, deleteRecord } from '../features/recordsSlice';

const RecordList = () => {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.records.data);
  const search = useSelector((state) => state.records.searchQuery.toLowerCase());
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const filtered = records.filter(
    (r) =>
      r.id.toString().includes(search) ||
      r.name.toLowerCase().includes(search) ||
      r.email.toLowerCase().includes(search)
  );

  const paginated = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const handleEdit = (index, field, value) => {
    dispatch(editRecord({ index, field, value }));
  };

  const handleDelete = (email) => {
    dispatch(deleteRecord(email));
  };

  return (

    <div className="max-w-7xl mx-auto my-8 px-6 flex-col item justify-center">
      {filtered.length === 0 ? (
        <p className="text-center text-lg text-gray-500 mt-4">No records available. Please upload a JSON file.</p>
      ) : (
        <>
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-indigo-600 text-white text-sm uppercase font-medium">
              <tr>
                <th className="px-4 py-3 border-b">ID</th>
                <th className="px-4 py-3 border-b">Name</th>
                <th className="px-4 py-3 border-b">Email</th>
                <th className="px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((record, i) => {
                const realIndex = records.findIndex((r) => r.email === record.email);
                return (
                  <tr key={i} className="hover:bg-gray-100 border-b">
                    <td className="px-4 py-4 text-sm text-gray-800">{record.id}</td>
                    <td className="px-4 py-4">
                      <input
                        value={record.name}
                        onChange={(e) => handleEdit(realIndex, 'name', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <input
                        value={record.email}
                        onChange={(e) => handleEdit(realIndex, 'email', e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDelete(record.email)}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: Math.ceil(filtered.length / pageSize) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`px-4 py-2 mx-1 text-sm rounded-lg transition ${page === i
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecordList;
