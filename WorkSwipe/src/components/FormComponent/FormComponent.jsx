import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SelectVariants from "../SelectComponent/SelectComponent";
import TextArea from "../TextArea/TextArea";
import { generateUuid } from "../../utils/uuidGenerator";
import CheckBox from "../CheckBox/CheckBox";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import BiotechIcon from "@mui/icons-material/Biotech";
import CustomChildrenModal from "../CustomChildrenModal/CustomChildrenModal";
import "./FormComponent.css";

export default function FormComponent({ props,checkedList }) {
  console.log("props",props)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <div className="FieldsWraper">
        {props.map((prop) => {
          
          if (!prop.id) {
            prop.id = generateUuid();
          }
          if (prop.type === "select") {
            return <SelectVariants prop={prop} key={prop.id} />;
          } else if (prop.type === "check") {
            return (
              <>
                <IconButton onClick={handleOpenModal}>
                  <span style={{ fontWeight: "bold" }}>
                    {prop.title}
                  </span>
                  <BiotechIcon />
                </IconButton>
                <CustomChildrenModal
                  open={isModalOpen}
                  setOpen={setIsModalOpen}
                  title={prop.title}
                  description={prop.description}
                >
                  <CheckBox options={prop.options} checkedList={checkedList}  />
                </CustomChildrenModal>
              </>
            );
          } else if (prop.type === "textarea") {
            return (
              <TextArea
                label={prop.label}
                name={prop.name}
                required
                key={prop.id}
              />
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
                onChange={prop.onChange} 
              />
            );
          }
        })}
      </div>
    </Box>
  );
}
