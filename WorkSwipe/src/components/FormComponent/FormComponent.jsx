import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SelectVariants from "../SelectComponent/SelectComponent";
import TextArea from "../TextArea/TextArea";
import CheckBox from "../CheckBox/CheckBox";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CustomChildrenModal from "../CustomChildrenModal/CustomChildrenModal";
import { useDispatch } from "react-redux";
import "./FormComponent.css";

export default function FormComponent({ props }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (event, prop) => {
    const { name, value } = event.target;
    dispatch(prop.dispatchFunc({ name, value }));
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
     
    >
      <div className="FieldsWraper">
        {props.map((prop, index) => {
          if (prop.type === "select") {
            return (
              <SelectVariants
                key={index}
                prop={prop}
                value={prop.form[prop.name]}
                onChange={(event) => handleInputChange(event, prop)}
              />
            );
          } else if (prop.type === "check") {
            return (
              <div key={index}>
                <IconButton onClick={handleOpenModal}>
                  <span style={{ fontWeight: "bold" }}>{prop.title}</span>
                  {prop.Icon}
                </IconButton>
                <CustomChildrenModal
                  open={isModalOpen}
                  setOpen={setIsModalOpen}
                  title={prop.title}
                  description={prop.description}
                  checkedList={prop.checkedList}
                >
                  <CheckBox
                    options={prop.options}
                    checkedList={prop.checkedList}
                    dispatchFunc={prop.dispatchFunc}
                  />
                </CustomChildrenModal>
              </div>
            );
          } else if (prop.type === "textarea") {
            return (
              <TextArea
                key={index}
                label={prop.label}
                name={prop.name}
                required={prop.required}
                value={prop.form[prop.name]}
                onChange={(event) => handleInputChange(event, prop)}
              />
            );
          } else if (prop.type === "other") {
            return (
              <TextField
                id={prop.id}
                variant={prop.variant || "outlined"}
                key={index}
                label={prop.label}
                name={prop.name}
                required={prop.required}
                value={prop.value}
                onChange={prop.onChange}

              />
            );
          } else {
            return (
              <TextField
                key={index}
                required={prop.required}
                variant={prop.variant || "outlined"}
                id={prop.id}
                label={prop.label}
                name={prop.name}
                type={prop.type}
                value={prop.form[prop.name]}
                onChange={(event) => handleInputChange(event, prop)}
              />
            );
          }
        })}
      </div>
    </Box>
  );
}
