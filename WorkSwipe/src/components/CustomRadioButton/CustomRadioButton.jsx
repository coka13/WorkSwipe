import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function CustomRadioButton({ title, list ,onClick}) {
 
  return (
    <FormControl>
      <FormLabel  id="demo-row-radio-buttons-group-label" sx={{color:"#1976D2",fontWeight:"bold"}}>  {title}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue={list[0]}
      >
        {list.map((item) => {
          return (
            <FormControlLabel value={item} control={<Radio />}   label={item}         onClick={onClick} />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
