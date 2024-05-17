import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomModal from "../CustomModal/CustomModal";
import { useState } from "react";
import FormComponent from "../FormComponent/FormComponent";
import { useSelector } from "react-redux";
import "./DisplayCard.css";

export default function DisplayCard({
  db,
  img,
  handleEdit,
  handleDeleteList,
  checkedList,
  formIcon,
  title,
  description,
  type,
  dispatchFunc,
  role
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState("");

  const handleEditDetails = (key) => {
    setCurrentEdit(key.charAt(0).toLowerCase() + key.slice(1));
    setIsModalOpen(true);
  };

  const techList = useSelector((state) => state.technologies.technologies);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "#1976D2" }}>{db.Name[0]}</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon sx={{ color: "#1976D2" }} />
          </IconButton>
        }
        title={
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            {db.Name}
          </Typography>
        }
      />
      <CardContent sx={{padding:"16px 16px 0px 16px",margin:"0"}} >
        <CardMedia
          component="img"
          image={img}
          alt={db.name}
          sx={{ pointerEvents: "none"}}
        />
        {Object.keys(db).map((key, index) => {
          const value = db[key];
          {
            console.log(value, value.length);
          }
          if (Array.isArray(value)) {
            return (
              <div key={index}>
                <div className="header">{key}:</div>
                <ul className="list" >
                  {value.map((tech, techIndex) => (
                    <li key={techIndex}>
                      <Typography className="profileInfo">
                        {tech}

                        {value.length > 1 && (
                          <IconButton onClick={() => handleDeleteList(tech)}>
                            <DeleteIcon
                              sx={{ marginRight: 1, color: "#1976D2" }}
                            />
                          </IconButton>
                        )}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            );
          } else {
            return (
              <>
                <Typography className="profileInfo" key={index}>
                  <span style={{ fontWeight: "bold" }}>{key}</span>: {value}
                  <IconButton onClick={() => handleEditDetails(key)}>
                    <EditIcon sx={{ marginRight: 1, color: "#1976D2" }} />
                  </IconButton>
                </Typography>
              </>
            );
          }
        })}
      </CardContent>
      <CardActions disableSpacing sx={{padding:"0",margin:"0"}} />
      <CustomModal
        title={currentEdit}
        placeholder={`Edit ${currentEdit}`}
        description={`Enter your new ${currentEdit} and press the submit button`}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        onSubmit={(newValue) => handleEdit(currentEdit, newValue)} // Pass the field and value to handleEdit
        type={"profile"}
      />

      <FormComponent
        props={[
          {
            title: title,
            description: description,
            type: type,
            options: techList,
            Icon: formIcon,
            checkedList : checkedList,
            dispatchFunc : dispatchFunc,
          },
        ]}

      />
    </Card>
  );
}
