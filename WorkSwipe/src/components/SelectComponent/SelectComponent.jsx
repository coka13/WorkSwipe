import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { useState } from "react";
import "./SelectComponent.css";

export default function SelectVariants({ prop }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value)
  
  };
  return (
    <>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel  id={prop.name}>{prop.label}</InputLabel>
        <Select 
          labelId={prop.name}
          id={prop.id}
          value={value}
          onChange={handleChange}
          label={prop.label}
        >
    
            {prop.options.map((option) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
        
        </Select>
      </FormControl>
    </>
  );
}
