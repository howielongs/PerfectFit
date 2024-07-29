import './App.css';
import React from "react";
import Header from './Header';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TinderCards from './TinderCards';
import SwipeButtons from './SwipeButtons';


function App() {
  return (
    <div className="App">
      <Header/>
      <Router>
        <Routes>
          <Route path="/chat" element={<h1>I am the chat page</h1>} />
          <Route
            path="/"
            element={
              <div>
                <TinderCards />
                <SwipeButtons/>
              </div>
            }
          />
        </Routes>
        {/* Tinder Cards*/}
        {/* Buttons */}
        {/* Chat Screens */}
        {/* Individual Chat Scren */}
      </Router>

    </div>
  );
}

export default App;
