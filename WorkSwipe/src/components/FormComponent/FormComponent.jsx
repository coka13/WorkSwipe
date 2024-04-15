import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SelectVariants from "../SelectComponent/SelectComponent";
import TextArea from "../TextArea/TextArea";
import { generateUuid } from "../../utils/uuidGenerator";
import "./FormComponent.css";
import CheckBox from "../CheckBox/CheckBox";

export default function FormComponent({ props }) {
  return (
    <Box component="form" noValidate autoComplete="off">
      <div className="FieldsWraper">
        {props.map((prop) => {
          console.log(prop)
          if (!prop.id) {
            prop.id = generateUuid();
          }
          if (prop.type === "select") {
            return <SelectVariants prop={prop} />;
          } else if (prop.type === "check") {
            console.log(prop.options);
            return (
              <div className="scrollable-container">
                <MultiCheckbox title={prop.name} options={prop.options} />
              </div>
             
            );
          }else if(prop.type==="textarea"){
            
            return(
            <TextArea 
            label={prop.label}
            name={prop.name}
            required/>)
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
