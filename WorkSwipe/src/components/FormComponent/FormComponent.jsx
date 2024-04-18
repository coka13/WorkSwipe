import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SelectVariants from "../SelectComponent/SelectComponent";
import TextArea from "../TextArea/TextArea";
import { generateUuid } from "../../utils/uuidGenerator";
import "./FormComponent.css";
import CheckBox from "../CheckBox/CheckBox";
import CustomModal2 from "../CustomModal2/CustomModal2";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import BiotechIcon from "@mui/icons-material/Biotech";

export default function FormComponent({ props }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Box component="form" noValidate autoComplete="off">
      <div className="FieldsWraper">
        {props.map((prop) => {
          console.log(prop);
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
                    Choose technologies
                  </span>
                  <BiotechIcon />
                </IconButton>
                <CustomModal2
                  open={isModalOpen}
                  setOpen={setIsModalOpen}
                  title={prop.title}
                  description={prop.description}
                >
                  <CheckBox options={prop.options} />
                </CustomModal2>
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
              />
            );
          }
        })}
      </div>
    </Box>
  );
}
