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
          if(!prop.id){
            prop.id= 'outlined-basic'
          }
          if (prop.type === "select") {

            return <SelectVariants prop={prop} />;
          } else {
            return (
              <TextField
                required={prop.required}
                variant= {prop.variant}
                id={prop.id}
                label={prop.name}
                type={prop.type}
              />
            );
          }
        })}
      </div>
    </Box>
  );
}
