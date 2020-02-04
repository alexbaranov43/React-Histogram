import React from 'react';
import logo from './logo.svg';
import './App.css';
import Histogram from './Histogram';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Histogram />
      </header>
    </div>
  );
}

export default App;
