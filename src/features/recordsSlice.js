import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  searchQuery: '',
};

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    uploadRecords: (state, action) => {
      const newData = action.payload;
      const merged = [...state.data, ...newData];
      const unique = Array.from(new Map(merged.map(item => [item.email, item])).values());
      state.data = unique;
    },
    deleteRecord: (state, action) => {
      state.data = state.data.filter(r => r.email !== action.payload);
    },
    editRecord: (state, action) => {
      const { index, field, value } = action.payload;
      const isDuplicate =
        field === 'email' &&
        state.data.some((r, i) => r.email === value && i !== index);
      if (isDuplicate) {
        alert('Email must be unique');
        return;
      }
      state.data[index][field] = value;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { uploadRecords, deleteRecord, editRecord, setSearchQuery } = recordsSlice.actions;
export default recordsSlice.reducer;
