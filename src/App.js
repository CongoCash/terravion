import React, { Component } from 'react';
import './App.css';
import Images from './components/images/Images'

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Images />
      </div>
    );
  }
}

export default App;
