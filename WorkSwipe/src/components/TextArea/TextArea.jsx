import React from 'react'
import "./TextArea.css"
const TextArea = ({name , label  ,required }) => {
  return (
    <textarea  label={label} name={name} required={required}/>
  )
}

export default TextArea