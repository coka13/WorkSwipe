import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import React from 'react'
import "./CheckBox.css"

const CheckBox = ({options}) => {
  return (
    <div
className="scrollable-container"
>
<FormGroup>
  {options.map((option) => (
    <FormControlLabel
      key={option}
      label={option}
      control={<Checkbox />}
    />
  ))}
</FormGroup>
</div>
  )
}

export default CheckBox




