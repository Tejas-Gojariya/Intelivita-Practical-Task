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
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((record, i) => {
            const realIndex = records.findIndex((r) => r.email === record.email);
            return (
              <tr key={i}>
                <td>{record.id}</td>
                <td>
                  <input
                    value={record.name}
                    onChange={(e) =>
                      handleEdit(realIndex, 'name', e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    value={record.email}
                    onChange={(e) =>
                      handleEdit(realIndex, 'email', e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(record.email)}
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
      <div>
        {Array.from({ length: Math.ceil(filtered.length / pageSize) }).map(
          (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default RecordList;
