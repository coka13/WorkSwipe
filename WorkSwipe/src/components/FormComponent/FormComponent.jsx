import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SelectVariants from "../SelectComponent/SelectComponent";

export default function FormComponent({ props }) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        
      }}
      noValidate
      autoComplete="off"
    >
      <div className="FieldsWraper">
        {props.map((prop) => {
          if (prop.type === "select") {
            return (
                <SelectVariants prop={prop}/>
            );
          } else {
            return (
              <TextField
                required
                name={prop.id}
                placeholder={prop.placeholder}
                type={prop.type}
    
              />
            );
          }
        })}
      </div>
    </Box>
  );
}
