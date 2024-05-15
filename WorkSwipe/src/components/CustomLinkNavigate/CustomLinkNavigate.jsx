import React from 'react'
import { Link } from 'react-router-dom'
import "./CustomLinkNavigate.css"


const CustomLinkNavigate = ({ text, to, label, fontSize = "medium", children ,color="#1976D2"}) => {
  return (
    <span className='switchauth' style={{ fontSize: fontSize,fontFamily:"cursive"}}>
      {text} <Link to={to} style={{ color: color, textDecoration: 'none',fontFamily:"cursive" }}>
        {label} 
        {children}
      </Link>
    </span>
  );
};

export default CustomLinkNavigate;
