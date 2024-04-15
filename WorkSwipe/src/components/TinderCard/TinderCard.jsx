import React, { useState, useRef, useMemo, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "./TinderCard.css";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
  Typography,
  Button,
  Alert,
  AlertTitle,
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

const SimpleCard = ({ db, handleRightSwipe }) => {
  const offersLength = useSelector(
    (state) => state.opportunities.offers.length
  );
  const dispatch = useDispatch();
  const [lastDirection, setLastDirection] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dbLength, setDBlength] = useState(offersLength);
  const [match, setMatch] = useState(false);

  useEffect(() => {
    setDBlength(offersLength);
    setCurrentIndex(0);
    const isMatch = handleRightSwipe(lastDirection);
    setMatch(isMatch);

    if (isMatch) {
      const timer = setTimeout(() => {
        setMatch(false);
      }, 1500); // 1.5 second

      return () => clearTimeout(timer);
    }
  }, [offersLength, currentIndex, lastDirection]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(offersLength)
        .fill(0)
        .map((i) => React.createRef()),
    [offersLength]
  );

  const swiped = (direction) => {
    setLastDirection(direction);
    setDBlength(dbLength - 1);
    dispatch(setDeleteOffer({ id: db[currentIndex]._id }));
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
  };

  return (
    <>
      {match === true && <Handshake />}
      {dbLength === 0 ? (
        <Alert variant="filled" severity="error" sx={{ fontWeight: "bold" }}>
          <AlertTitle sx={{ fontWeight: "bold" }}>Error</AlertTitle>
          There are no more work offers left at the moment
        </Alert>
      ) : (
        !match && (
          <TinderCard
          className="tinder-card"
            ref={childRefs[currentIndex]}
            key={db[currentIndex]?.name}
            onSwipe={(dir) => swiped(dir, db[currentIndex]?.name, currentIndex)}
            onCardLeftScreen={() =>
              outOfFrame(db[currentIndex]?.name, currentIndex)
            }
            preventSwipe={["up", "down"]}
          >
            {db[currentIndex] && (
              <Card sx={{ maxWidth: 345 }}>
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

                <CardContent>
                  <CardMedia
                    component="img"
                    image={db[currentIndex].url}
                    alt={db[currentIndex].name}
                    sx={{ pointerEvents: "none", padding: "2rem" }}
                  />
                  <Typography
                    className="profileInfo"
                    sx={{ fontWeight: "bold" }}
                  >
                    <WorkIcon sx={{ marginRight: 1, color: "#1976D2" }} />
                    {db[currentIndex].position}
                  </Typography>
                  <Typography
                    className="profileInfo"
                    sx={{ fontWeight: "bold" }}
                  >
                    <StarIcon sx={{ marginRight: 1, color: "#1976D2" }} />
                    {db[currentIndex].exp} years of experience
                  </Typography>
                  <Typography
                    className="profileInfo"
                    sx={{ fontWeight: "bold" }}
                  >
                    <PlaceIcon sx={{ marginRight: 1, color: "#1976D2" }} />
                    {db[currentIndex].location}
                  </Typography>
                  <Typography
                    className="profileInfo"
                    sx={{ fontWeight: "bold" }}
                  >
                    <MailIcon sx={{ marginRight: 1, color: "#1976D2" }} />
                    <a
                      href={`mailto:${db[currentIndex].email}`}
                      style={{ color: "#1976D2" }}
                    >
                      {db[currentIndex].email}
                    </a>
                  </Typography>
                </CardContent>
                <div className="buttons">
                  <CardActions>
                    <a
                      href={db[currentIndex].linkedIn}
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
                      {db[currentIndex].technologies.map((tech, index) => (
                        <li style={{ fontWeight: "bold" }} key={index}>
                          {tech}
                        </li>
                      ))}
                    </ul>
                    <h4>Advantage:</h4>
                    <ul className="list">
                      {db[currentIndex].niceToHave.map((tech, index) => (
                        <li style={{ fontWeight: "bold" }} key={index}>
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Collapse>
              </Card>
            )}
          </TinderCard>
        )
      )}
    </>
  );
};

export default SimpleCard;
