import { Modal, Box, Typography } from "@mui/material";
import "./CustomModal2.css";
import React from "react";
import BasicButtons from "../BasicButtons/BasicButtons";

const CustomModal2 = ({ children, open, setOpen, title, description, placeholder }) => {
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
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="modal-box">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {children}
        <BasicButtons text={"Submit"} placeholder={placeholder} />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
      </Box>
    </Modal>
  );
};

export default CustomModal2;
