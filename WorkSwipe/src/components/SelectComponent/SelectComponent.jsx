import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";

export default function SelectVariants({ prop }) {
  //   const [age, setAge] = React.useState('');

  //   const handleChange = (event) => {
  //     setAge(event.target.value);
  //   };
  return (
    <>
   
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id={prop.name}>{prop.placeholder}</InputLabel>
          <Select
            labelId={prop.name}
            id={prop.id}
            value={prop.value}
            // onChange={handleChange}
            placeholder={prop.placeholder}
          >
            {prop.options.map((option) => (
              <MenuItem value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      
    </>
  );
}
