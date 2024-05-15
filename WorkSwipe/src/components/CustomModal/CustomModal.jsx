import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BasicButtons from "../BasicButtons/BasicButtons";
import FormComponent from "../FormComponent/FormComponent";
import "./CustomModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CustomModal({ title, description, placeholder, open, setOpen, onSubmit,type }) {
  const [inputValue, setInputValue] = React.useState("");

  const handleClose = () => {
    setInputValue("");
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      if(inputValue!==""){
      onSubmit(inputValue);
      }
    }
    handleClose();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="modal-box" onKeyDown={handleKeyDown}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>

        <FormComponent props={[{ id: title, placeholder, type: type, value: inputValue, onChange: handleInputChange }]} />
        <BasicButtons text={"Submit"} onClick={handleSubmit} />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
      </Box>
    </Modal>
  );
}
