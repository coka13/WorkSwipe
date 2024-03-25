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

export default function DisplayCard({ db }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#1976D2" }} >
            {db.name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon sx={{ color: "#1976D2" }} />
          </IconButton>
        }
        title={
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            {db.name}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        image={db.url}
        alt={db.name}
        sx={{ pointerEvents: "none", padding: "2rem" }}
      />
{Object.keys(db).map((key, index) => {
  return (
    <Typography key={index}>
      {key} : {db[key]}
    </Typography>
  );
})}
      <CardContent></CardContent>
      <CardActions disableSpacing></CardActions>
      <CardContent></CardContent>
    </Card>
  );
}
