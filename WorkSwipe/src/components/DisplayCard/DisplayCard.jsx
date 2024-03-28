import * as React from "react";
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
import "./DisplayCard.css";

export default function DisplayCard({ db, img }) {
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
      <CardContent>
        <CardMedia
          component="img"
          image={img}
          alt={db.name}
          sx={{ pointerEvents: "none", padding: "2rem" }}
        />
        {Object.keys(db).map((key, index) => {
          let value = db[key];
          if (Array.isArray(value)) {
            return (
              <div key={index}>
                <div className="header">{key}:</div>
                <ul className="list">
                  {value.map((tech, techIndex) => (
                    <li key={techIndex}>
                      <Typography className="profileInfo">
                        {tech}
                        <IconButton>
                          <EditIcon
                            sx={{ marginRight: 1, color: "#1976D2" }}
                          ></EditIcon>
                        </IconButton>
                        <IconButton>
                          <DeleteIcon
                            sx={{ marginRight: 1, color: "#1976D2" }}
                          ></DeleteIcon>
                        </IconButton>
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            );
          } else {
            return (
              <Typography className="profileInfo" key={index}>
                <span style={{ fontWeight: "bold" }}>{key}</span>: {value}
                <IconButton>
                  <EditIcon
                    sx={{ marginRight: 1, color: "#1976D2" }}
                  ></EditIcon>
                </IconButton>
              </Typography>
            );
          }
        })}
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}
