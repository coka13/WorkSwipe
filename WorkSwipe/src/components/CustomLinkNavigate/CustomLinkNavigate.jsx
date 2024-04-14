import React from 'react';
import { Link } from 'react-router-dom';
import './CustomLinkNavigate.css';

const CustomLinkNavigate = ({ text, to, label, fontSize = "x-small", children }) => {
  return (
    <span className='switchauth' style={{ fontSize: fontSize }}>
      {text} <Link to={to} style={{ color: "#1976D2", textDecoration: 'none' }}>
        {label} 
        {children}
      </Link>
    </span>
  );
};

export default CustomLinkNavigate;
