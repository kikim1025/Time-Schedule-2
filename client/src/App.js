import React from 'react';
import Schedule from './components/Schedule';
import './App.css';

class App extends React.Component {
  
  render() {
    return ( 
      <div id='page'>
        <Schedule />
      </div>
    );
  };
};

export default App;