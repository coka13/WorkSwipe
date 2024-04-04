import React from 'react'

const TextArea = (name , label , type ,required ) => {
  return (
    <textarea label={label} name={name} type={type} required={required}/>
  )
}

export default TextArea