import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CustomLinkNavigate from "../CustomLinkNavigate/CustomLinkNavigate";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomModal from "../CustomModal/CustomModal";
import { useState } from "react";
import FormComponent from "../FormComponent/FormComponent";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./DisplayCard.css";

export default function DisplayCard({
  allowedUpdates,
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
  selectDispatchFunc,
  list,
  security
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState("");
  console.log(db)
  console.log(allowedUpdates)

  const handleEditDetails = (key) => {
    setCurrentEdit(key.charAt(0).toLowerCase() + key.slice(1));
    setIsModalOpen(true);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "#1976D2" }}>{db.Name[0]}</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon sx={{ color: "#1976D2", fontSize: 20 }} />
          </IconButton>
        }
        title={
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            {db.Name}
          </Typography>
        }
      />
      <CardContent sx={{ padding: "16px 16px 0px 16px", margin: "0" }}>
        <CardMedia
          component="img"
          image={img}
          alt={db.name}
          sx={{ pointerEvents: "none" }}
        />
        {Object.keys(db).map((key, index) => {
          const value = db[key];
          if (Array.isArray(value)) {
            return (
              <div key={index}>
                <div className="header">{key}:</div>
                <ul>
                  {value.map((tech, techIndex) => (
                    <li key={techIndex}>
                      <Typography className="profileInfo" >
                        {tech.name}
                        {value.length > 1 && allowedUpdates[key] && (
                          <IconButton onClick={() => handleDeleteList(tech._id)}>
                            <DeleteIcon sx={{ marginRight: 1, color: "#1976D2", fontSize: 20 }} />
                          </IconButton>
                        )}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            );
          } else if (key === "gitHubUrl" || key === "linkedInUrl") {
            return (
              <Typography className="profileInfo" key={index} >
                {key === "gitHubUrl" ? (
                  <a href={value} target="_blank" rel="noopener noreferrer">
                    <IconButton>
                      <GitHubIcon sx={{ color: "#1976D2", fontSize: 20 }} />
                    </IconButton>
                  </a>
                ) : (
                  <a href={value} target="_blank" rel="noopener noreferrer">
                    <IconButton>
                      <LinkedInIcon sx={{ color: "#1976D2", fontSize: 20 }} />
                    </IconButton>
                  </a>
                )}
                {allowedUpdates[key] && (
                  <IconButton onClick={() => handleEditDetails(key)}>
                    <EditIcon sx={{margin:"0", color: "#1976D2", fontSize: 20 }} />
                  </IconButton>
                )}
              </Typography>
            );
          } else {
            return (
              <Typography className="profileInfo" key={index} sx={{marginBottom:"15px"}}>
                <span style={{ fontWeight: "bold" }}>{key}</span>: {value}
                {allowedUpdates[key] && (
                  <IconButton onClick={() => handleEditDetails(key)}>
                    <EditIcon sx={{margin:"0", color: "#1976D2", fontSize: 20 }} />
                  </IconButton>
                )}
              </Typography>
            );
          }
        })}
      </CardContent>
      <CardActions disableSpacing sx={{ padding: "0", margin: "0" }} />
      <CustomModal
        allowedUpdates={allowedUpdates}
        dispatchFunc={dispatchFunc}
        title={currentEdit}
        placeholder={`Edit ${currentEdit}`}
        description={`Enter your new ${currentEdit} and press the submit button`}
        open={isModalOpen}
        setOpen={setIsModalOpen}
        onSubmit={(newValue) => handleEdit(currentEdit, newValue)} // Pass the field and value to handleEdit
        type={"other"}
      />
      {list && list.length > 0 && (
        <FormComponent
          props={[
            {
              title: title,
              description: description,
              type: type,
              options: list,
              Icon: formIcon,
              checkedList: checkedList,
              dispatchFunc: dispatchFunc,
              selectDispatchFunc: selectDispatchFunc,
            },
          ]}
        />
      )}
      {security &&(

        <CustomLinkNavigate
           to={"/security"}
           label={"Change Password"}
         />

      )}
    </Card>
  );
}
