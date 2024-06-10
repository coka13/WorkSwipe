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
import Collapse from "@mui/material/Collapse";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import StarIcon from "@mui/icons-material/Star";
import MailIcon from "@mui/icons-material/Mail";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery } from "@tanstack/react-query";
import { baseUrl, technologyRoute } from "../../utils/routes";
import "./MatchCard.css";

const MatchCard = ({ match, index, handleDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["get-match-technologies-by-ids", index],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}${technologyRoute}/technologiesByIDs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            required: match.technologies,
            niceToHave: match.niceToHave, // add niceToHave to the body
          }),
        }
      );
      return response.json();
    },
  });

  console.log("data", data);

  return (
    <Card
      className={expanded ? "expanded" : ""}
      sx={{ width: 300, margin: "3px" }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#1976D2" }}>{match.name.charAt(0)}</Avatar>
        }
        action={
          <IconButton onClick={() => handleDelete(index)} aria-label="settings">
            <DeleteIcon sx={{ color: "#1976D2" }} />
          </IconButton>
        }
        title={
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            {match.name}
          </Typography>
        }
      />

      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          image={match.url}
          alt={match.name}
          sx={{
            pointerEvents: "none",
            padding: "0.6rem",
            width: "100px",
            height: "100px",
            objectFit: "contain",
            marginBottom: "20px",
          }}
        />
        <div>
          <Typography className="profileInfo" sx={{ fontWeight: "bold" }}>
            <WorkIcon sx={{ marginRight: 1, color: "#1976D2" }} />
            {match.position}
          </Typography>
          <Typography className="profileInfo" sx={{ fontWeight: "bold" }}>
            <StarIcon sx={{ marginRight: 1, color: "#1976D2" }} />
            {match.exp} years of experience
          </Typography>
          <Typography className="profileInfo" sx={{ fontWeight: "bold" }}>
            <PlaceIcon sx={{ marginRight: 1, color: "#1976D2" }} />
            {match.location}
          </Typography>
          <Typography className="profileInfo" sx={{ fontWeight: "bold" }}>
            <MailIcon sx={{ marginRight: 1, color: "#1976D2" }} />
            <a href={`mailto:${match.emailHR}`} style={{ color: "#1976D2" }}>
              {match.emailHR}
            </a>
          </Typography>
        </div>
      </CardContent>
      <div className="buttons">
        <CardActions>
          <a href={match.linkedInUrl} target="_blank" rel="noopener noreferrer">
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
          {isLoading && <Typography>Loading...</Typography>}
          {error && <Typography>Error loading technologies</Typography>}
          {data && (
            <>
              <h4>Required:</h4>
              <ul className="list">
                {data.required &&
                  data.required.map((tech, index) => (
                    <li style={{ fontWeight: "bold" }} key={index}>
                      {tech.name}
                    </li>
                  ))}
              </ul>
              <h4>Advantage:</h4>
              <ul className="list">
                {data.niceToHave &&
                  data.niceToHave.map((tech, index) => (
                    <li style={{ fontWeight: "bold" }} key={index}>
                      {tech.name}
                    </li>
                  ))}
              </ul>
            </>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default MatchCard;
