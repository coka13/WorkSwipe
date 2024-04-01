import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SelectVariants from "../SelectComponent/SelectComponent";
import "./FormComponent.css";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export default function FormComponent({ props }) {
  return (
    <Box component="form" noValidate autoComplete="off">
      <div className="FieldsWraper">
        {props.map((prop) => {
          if (!prop.id) {
            prop.id = "outlined-basic";
          }
          if (prop.type === "select") {
            return <SelectVariants prop={prop} />;
          } else if (prop.type === "check") {
            return (
              <div
                className="scrollable-container"
              >
                <FormGroup>
                  {prop.options.map((option) => (
                    <FormControlLabel
                      key={option}
                      label={option}
                      control={<Checkbox />}
                    />
                  ))}
                </FormGroup>
              </div>
            );
          } else {
            return (
              <TextField
                key={prop.id}
                required={prop.required}
                variant={prop.variant}
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
