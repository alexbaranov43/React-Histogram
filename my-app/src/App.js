import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Generate Random Numbers
        </p>
        <button>
          Generate
          </button>
      </header>
    </div>
  );
}

export default App;
