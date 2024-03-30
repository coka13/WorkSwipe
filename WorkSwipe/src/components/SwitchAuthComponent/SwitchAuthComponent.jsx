import React from 'react'
import { Link } from 'react-router-dom'
import "./SwitchAuthComponent.css"
const SwitchAuthComponent = ({text , to ,label}) => {
  return (
    <span className='switchauth'> {text} <Link to={to} >{label}</Link>
    </span>
  )
}

export default SwitchAuthComponent