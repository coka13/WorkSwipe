
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    CardActions,
    IconButton,
    Typography,
    
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Collapse from "@mui/material/Collapse";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import StarIcon from "@mui/icons-material/Star";
import MailIcon from "@mui/icons-material/Mail";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";
import { useState } from "react";
import "./MatchCard.css";

const MatchCard = ({match}) => {
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    
  return (

    <Card className="match-card" sx={{ maxWidth: 345, overflowY:"scroll"}}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: "#1976D2" }}>
          {match.name.charAt(0)}
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon sx={{ color: "#1976D2" }} />
        </IconButton>
      }
      title={
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          {match.name}
        </Typography>
      }
    />

    <CardContent sx={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}} >
      <CardMedia
        component="img"
        image={match.url}
        alt={match.name}
        sx={{ pointerEvents: "none", padding: "0.6rem",width:"100px",height:"100px",objectFit:"contain",marginBottom:"20px"}}
      />
      <div>
      <Typography
        className="profileInfo"
        sx={{ fontWeight: "bold" }}
      >
        <WorkIcon sx={{ marginRight: 1, color: "#1976D2" }} />
        {match.position}
      </Typography>
      <Typography
        className="profileInfo"
        sx={{ fontWeight: "bold" }}
      >
        <StarIcon sx={{ marginRight: 1, color: "#1976D2" }} />
        {match.exp} years of experience
      </Typography>
      <Typography
        className="profileInfo"
        sx={{ fontWeight: "bold" }}
      >
        <PlaceIcon sx={{ marginRight: 1, color: "#1976D2" }} />
        {match.location}
      </Typography>
      <Typography
        className="profileInfo"
        sx={{ fontWeight: "bold" }}
      >
        <MailIcon sx={{ marginRight: 1, color: "#1976D2" }} />
        <a
          href={`mailto:${match.email}`}
          style={{ color: "#1976D2" }}
        >
          {match.email}
        </a>
      </Typography>
      </div>
    </CardContent>
    <div className="buttons">
      <CardActions>
        <a
          href={match.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton aria-label="LinkedIn">
            <LinkedInIcon sx={{ color: "#1976D2" }} />
          </IconButton>
        </a>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ color: "black" }} />
          <span style={{ color: "#1976D2", fontWeight: "bold" }}>
            Technologies
          </span>
        </IconButton>
      </CardActions>
    </div>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <h4>Required:</h4>
        <ul className="list">
          {match.technologies.map((tech, index) => (
            <li style={{ fontWeight: "bold" }} key={index}>
              {tech}
            </li>
          ))}
        </ul>
        <h4>Advantage:</h4>
        <ul className="list">
          {match.niceToHave.map((tech, index) => (
            <li style={{ fontWeight: "bold" }} key={index}>
              {tech}
            </li>
          ))}
        </ul>
      </CardContent>
    </Collapse>
  </Card>
  )
}

export default MatchCard