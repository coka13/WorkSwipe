import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SelectVariants from "../SelectComponent/SelectComponent";
import TextArea from "../TextArea/TextArea";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { generateUuid } from "../../utils/uuidGenerator";
import "./FormComponent.css";

export default function FormComponent({ props }) {
  return (
    <Box component="form" noValidate autoComplete="off">
      <div className="FieldsWraper">
        {props.map((prop) => {
          if (!prop.id) {
            prop.id = generateUuid();
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
          }else if(prop.type==="textarea"){
            <TextArea/>
          } 
          else {
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
