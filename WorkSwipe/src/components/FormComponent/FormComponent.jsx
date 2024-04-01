import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SelectVariants from "../SelectComponent/SelectComponent";
import MultiCheckbox from "../MultiCheckbox/MultiCheckbox";
import "./FormComponent.css";

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
            console.log(prop.options);
            return (
              <div className="scrollable-container">
                <MultiCheckbox title={prop.name} options={prop.options} />
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
