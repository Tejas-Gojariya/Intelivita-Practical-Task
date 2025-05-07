import './App.css'
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Upload from './components/Upload';
import RecordList from './components/RecordList';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <Provider store={store}>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Client Records Management</h1>
        <Upload />
        <SearchBar />
        <RecordList />
      </div>
    </Provider>
  );
}

export default App;