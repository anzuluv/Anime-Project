import React from "react";
import "../App.css";

export default function Tooltip({ children, text }) {
    const [show, setShow] = React.useState(false);
  
    return (
      <div>
        <div
        
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
        <div className="tooltip" style={show ? { visibility: "visible" } : {}}>
          {text}
        </div>
        
      </div>
    );
  }
  