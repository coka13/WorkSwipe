import React from 'react'
import { Link } from 'react-router-dom'
import "./CustomLinkNavigate.css"
const CustomLinkNavigate = ({text , to ,label, fontSize="x-small"}) => {
  return (
    <span className='switchauth' style={{fontSize:fontSize}}> {text} <Link to={to} >{label}</Link>
    </span>
  )
}

export default CustomLinkNavigate