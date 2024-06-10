import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
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
import { useDispatch, useSelector } from "react-redux";
import { setDeleteOffer } from "../../store/slices/jobOffersSlice";
import Handshake from "../Handshake/Handshake";
import { useQuery } from "@tanstack/react-query";
import { baseUrl, technologyRoute } from "../../utils/routes";
import "./TinderCard.css";

const SimpleCard = ({ db, handleRightSwipe }) => {
  const offersLength = useSelector(
    (state) => state.opportunities.offers.length
  );

  const dispatch = useDispatch();
  const [lastDirection, setLastDirection] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [match, setMatch] = useState(false);
  
  const role = useSelector((state) => state.auth.role);

  const { data, error, isLoading } = useQuery({
    queryKey: ["get-offer-technologies-by-ids", currentIndex], // add currentIndex to queryKey
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}${technologyRoute}/technologiesByIDs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            required: db[currentIndex].technologies,
            niceToHave: db[currentIndex].niceToHave // add niceToHave to the body
          }),
        }
      );
      return response.json();
    },
    enabled: role === "Job Seeker", // only fetch data if role is "Job Seeker"
  });


  useEffect(() => {
    setCurrentIndex(0);
    const isMatch = handleRightSwipe(lastDirection);
    setMatch(isMatch);
  
    if (isMatch) {
      const timer = setTimeout(() => {
        setMatch(false); // Reset match to false after the timer expires
      }, 1500); // 1.5 second
      return () => clearTimeout(timer);
    }
  }, [offersLength, currentIndex, lastDirection]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const swiped = (direction) => {
    setLastDirection(direction);
    dispatch(setDeleteOffer({ id: db[currentIndex]._id }));
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`);
  };

  if (db.length === 0 && !match) {
    return (
      <>
        <div className="crickets" alt="crickets" />
      </>
    );
  }

  return (
    <>
      {match === true && <Handshake />}
      {!match && db[currentIndex] && (
        <TinderCard
          className={expanded ? 'expanded' : ''}
          key={db[currentIndex]?.name}
          onSwipe={(dir) => swiped(dir, db[currentIndex]?.name, currentIndex)}
          onCardLeftScreen={() => outOfFrame(db[currentIndex]?.name, currentIndex)}
          preventSwipe={["up", "down"]}
        >
          {db[currentIndex] && (
            <Card sx={{ width: 300, overflowY: "scroll" }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "#1976D2" }}>
                    {db[currentIndex].name.charAt(0)}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon sx={{ color: "#1976D2" }} />
                  </IconButton>
                }
                title={
                  <Typography variant="h5" style={{ fontWeight: "bold" }}>
                    {db[currentIndex].name}
                  </Typography>
                }
              />

              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  image={db[currentIndex].image}
                  alt={db[currentIndex].name}
                  sx={{
                    pointerEvents: "none",
                    padding: "0.6rem",
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                    marginBottom: "20px",
                    display: "flex",
                    alignSelf: "center",
                  }}
                />
                <Typography className="profileInfo" sx={{ fontWeight: "bold" }}>
                  <WorkIcon sx={{ marginRight: 1, color: "#1976D2" }} />
                  {db[currentIndex].position}
                </Typography>
                <Typography className="profileInfo" sx={{ fontWeight: "bold" }}>
                  <StarIcon sx={{ marginRight: 1, color: "#1976D2" }} />
                  {db[currentIndex].experience + " years of experience"} 
                </Typography>
                <Typography className="profileInfo" sx={{ fontWeight: "bold" }}>
                  <PlaceIcon sx={{ marginRight: 1, color: "#1976D2" }} />
                  {db[currentIndex].location}
                </Typography>
                <Typography className="profileInfo" sx={{ fontWeight: "bold" }}>
                  <MailIcon sx={{ marginRight: 1, color: "#1976D2" }} />
                  <a
                    href={`mailto:${db[currentIndex].emailHR}`}
                    style={{ color: "#1976D2" }}
                  >
                    {db[currentIndex].emailHR}
                  </a>
                </Typography>
              </CardContent>
              <div className="buttons">
                <CardActions>
                  <a
                    href={db[currentIndex].linkedInUrl}
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
                    {data?.required && data.required.map((tech, index) => (
                      <li style={{ fontWeight: "bold" }} key={index}>
                        {tech.name}
                      </li>
                    ))}
                  </ul>
                  <h4>Advantage:</h4>
                  <ul className="list">
                    {data?.niceToHave && data.niceToHave.map((tech, index) => (
                      <li style={{ fontWeight: "bold" }} key={index}>
                        {tech.name}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Collapse>
            </Card>
          )}
        </TinderCard>
      )}
    </>
  );
};

export default SimpleCard;
