import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SelectVariants from "../SelectComponent/SelectComponent";
import TextArea from "../TextArea/TextArea";
import { generateUuid } from "../../utils/uuidGenerator";
import CheckBox from "../CheckBox/CheckBox";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CustomChildrenModal from "../CustomChildrenModal/CustomChildrenModal";
import { useDispatch } from "react-redux";
import "./FormComponent.css";

export default function FormComponent({
  props,
  checkedList,
  Icon,
  dispatchFunc,
  form
}) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(dispatchFunc({ name, value }));
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <div className="FieldsWraper">
        {props.map((prop) => {
          if (!prop.id) {
            prop.id = generateUuid();
          }

          if (prop.type === "select") {
            return (
              <SelectVariants
                key={prop.id}
                prop={prop}
                value={
                  form[prop.name] !== undefined
                    ? form[prop.name]
                    : ""
                }
                onChange={handleInputChange}
              />
            );
          } else if (prop.type === "check") {
            return (
              <>
                <IconButton key={prop.id} onClick={handleOpenModal}>
                  <span style={{ fontWeight: "bold" }}>{prop.title}</span>
                  {Icon}
                </IconButton>
                <CustomChildrenModal
                  open={isModalOpen}
                  setOpen={setIsModalOpen}
                  title={prop.title}
                  description={prop.description}
                  checkedList={checkedList}
                >
                  <CheckBox
                    options={prop.options}
                    checkedList={checkedList}
                    dispatchFunc={dispatchFunc}
                  />
                </CustomChildrenModal>
              </>
            );
          } else if (prop.type === "textarea") {
            return (
              <TextArea
                key={prop.id}
                label={prop.label}
                name={prop.name}
                required={prop.required}
                value={
                  form[prop.name] !== undefined
                    ? form[prop.name]
                    : ""
                }
                onChange={handleInputChange}
              />
            );
          } else {
            return (
              <TextField
                key={prop.id}
                required={prop.required}
                variant={prop.variant || "outlined"}
                id={prop.id}
                label={prop.label}
                name={prop.name}
                type={prop.type}
                value={
                  form[prop.name] !== undefined
                    ? form[prop.name]
                    : ""
                }
                onChange={handleInputChange}
              />
            );
          }
        })}
      </div>
    </Box>
  );
}
