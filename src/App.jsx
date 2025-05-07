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
      <div className="min-h-screen bg-gray-50">
        <div className="p-4 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Client Records Management
          </h1>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mb-4 lg:mb-0">
              <Upload />
            </div>
            <div>
              <SearchBar />
            </div>
          </div>
          <RecordList />
        </div>
      </div>
    </Provider>
  );
}

export default App;