  
import React from "react";
import './HomeScreen.css';
import lopo from './lopo.png';

function HomeScreen() {
    return (
        <div className="homescreen">
        <div className="homescreen__img"> 
        <img src={lopo} height="450vh" width="700vw"
        style={{
          
          

        }} alt=""></img>
        </div>
          <div className="homescreen__text">
        <h2>WELCOME </h2>
        <h2>.....let's connect</h2>
          
  
          </div>
        
      </div>
    )
}

export default HomeScreen