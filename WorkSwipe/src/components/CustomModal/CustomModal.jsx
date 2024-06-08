import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BasicButtons from "../BasicButtons/BasicButtons";
import FormComponent from "../FormComponent/FormComponent";
import "./CustomModal.css";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl, jobSeekerRoute } from "../../utils/routes";


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

export default function CustomModal({
  title,
  dispatchFunc,
  description,
  open,
  setOpen,
  type,
  allowedUpdates,
}) {
  const [inputValue, setInputValue] = useState("");
  const id = useSelector((state) => state.auth._id);
  const dispatch = useDispatch();

  const handleClose = () => {
    setInputValue("");
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    // Create the updatedFields object with a dynamic key
    const updatedFields = { [title.toString()]: inputValue };
    
    if (inputValue !== "") {
      fetch(`${baseUrl}${jobSeekerRoute}/updateJobSeeker/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Handle successful response here if needed
          console.log('Response:', data);
        })
        .catch(error => {
          // Handle errors here
          console.error('Error:', error);
        });
    }
    if (inputValue !== "") {
      fetch(`${baseUrl}${jobSeekerRoute}/updateJobSeeker/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Handle successful response here if needed
          console.log("Response:", data);
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error:", error);
        });
    }
  
    if (inputValue !== "" && allowedUpdates[title.charAt(0).toUpperCase() + title.slice(1)]) {
      dispatch(dispatchFunc({ field: title, value: inputValue }));
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

        <FormComponent
          props={[
            {
              name: title,
              type: type,
              value: inputValue,
              onChange: handleInputChange,
            },
          ]}
        />
        <BasicButtons text={"Submit"} onClick={handleSubmit} />
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
      </Box>
    </Modal>
  );
}
