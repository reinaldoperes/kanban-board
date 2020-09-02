import React from 'react';
import './App.css';
import data from "./data.json";

import Board from "react-trello";
import ScrollContainer from 'react-indiana-drag-scroll';

function App() {
  return (
    <div className="App">
        <Board data={data} draggable collapsibleLanes editable />            
  </div>
  );
}

export default App;
