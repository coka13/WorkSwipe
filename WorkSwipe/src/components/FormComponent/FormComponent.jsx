import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SelectVariants from "../SelectComponent/SelectComponent";
import CheckBox from "../CheckBox/CheckBox";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CustomChildrenModal from "../CustomChildrenModal/CustomChildrenModal";
import "./FormComponent.css";

export default function FormComponent({ props }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (event, prop) => {
    prop.onChange(event);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <div className="FieldsWraper">
        {props.map((prop, index) => {
          if (prop.type === "select") {
            return (
              <SelectVariants
                key={index}
                prop={prop}
                value={prop.value}
                onChange={(event) => handleInputChange(event, prop)}
                required={prop.required}
              />
            );
          } else if (prop.type === "check") {
            return (
              <div key={index}>
                <IconButton onClick={handleOpenModal}>
                  <span style={{ fontWeight: "bold" }}>{prop.title}</span>
                  {prop.Icon}
                </IconButton>

                {prop.options.length > 0 && (
                  
                  <CustomChildrenModal
                    open={isModalOpen}
                    setOpen={setIsModalOpen}
                    title={prop.title}
                    description={prop.description}
                  
                   
                  >
                    <CheckBox
                      options={prop.options}
                      name={prop.title}
                      checkedList={prop.checkedList}
                      dispatchFunc={prop.selectDispatchFunc}
                      onSubmit={prop.onSubmit}
                    />
                  </CustomChildrenModal>
                )}
              </div>
            );
          } else if (prop.type === "textarea") {
            return (
              <TextField
                sx={{ marginBottom: "10px" }}
                key={index}
                label={prop.label}
                name={prop.name}
                required={prop.required}
                value={prop.value}
                onChange={prop.onChange}
                type={prop.formType}
              />
            );
          } else {
            return (
              <TextField
                sx={{ marginBottom: "10px" }}
                key={index}
                required={prop.required}
                variant={prop.variant || "outlined"}
                id={prop.id}
                label={prop.label}
                name={prop.name}
                type={prop.formType}
                value={prop.value}
                onChange={(event) => handleInputChange(event, prop)}
              />
            );
          }
        })}
      </div>
    </Box>
  );
}
