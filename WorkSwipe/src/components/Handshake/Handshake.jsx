import React from 'react';
import './Handshake.css';


const Handshake = () => {
  return (
    <> 
    
    <div id="body" className="grey lighten-2 valign-wrapper">
      <div id="opty_hands" className="valign">
        <div id="left-arm">
          <div className="left-hand"><span>...</span></div>
          <div className="left-shake"><span>_<br />_<br />_</span></div>
        </div>
        <div id="right-arm">
          <div className="right-hand"><span>...</span></div>
          <div className="right-shake"></div>
        </div>
      </div>
     
    </div>
    
    </>
  );    
};

export default Handshake;
