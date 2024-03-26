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
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Collapse from "@mui/material/Collapse";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import StarIcon from "@mui/icons-material/Star";
import MailIcon from "@mui/icons-material/Mail";
import WorkIcon from "@mui/icons-material/Work";
import PlaceIcon from "@mui/icons-material/Place";

const SimpleCard = ({ db }) => {
  const [lastDirection, setLastDirection] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(
    db.length > 0 ? db.length - 1 : 0
  ); // Ensure currentIndex is initialized properly
  const [dbLength, setDBlength] = useState(db.length);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    [db.length]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;
  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    setDBlength(dbLength - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    setDBlength(dbLength + 1);
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);

    const cardRef = childRefs[newIndex].current;
    if (cardRef) {
      await cardRef.restoreCard();
    }
  };
  return (
    <>
      {dbLength === 0 ? (
        <Alert variant="filled" severity="error" sx={{ fontWeight: "bold" }}>
          <AlertTitle sx={{ fontWeight: "bold" }}>Error</AlertTitle>
          There are no more work offers left at the moment
        </Alert>
      ) : (
        <TinderCard
          ref={childRefs[currentIndex]}
          key={db[currentIndex].name}
          onSwipe={(dir) => swiped(dir, db[currentIndex].name, currentIndex)}
          onCardLeftScreen={() =>
            outOfFrame(db[currentIndex].name, currentIndex)
          }
          preventSwipe={["up", "down"]}
        >
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
              <Typography className="profileInfo" sx={{ fontWeight: "bold" }}>
                <WorkIcon sx={{ marginRight: 1, color: "#1976D2" }} />
                {db[currentIndex].position}
              </Typography>
              <Typography className="profileInfo" sx={{ fontWeight: "bold" }}>
                <StarIcon sx={{ marginRight: 1, color: "#1976D2" }} />
                {db[currentIndex].exp} years of experience
              </Typography>
              <Typography className="profileInfo" sx={{ fontWeight: "bold" }}>
                <PlaceIcon sx={{ marginRight: 1, color: "#1976D2" }} />
                {db[currentIndex].location}
              </Typography>
              <Typography className="profileInfo" sx={{ fontWeight: "bold" }}>
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
                  {db[currentIndex].technologies.map((tech, index) => {
                    return (
                      <li style={{ fontWeight: "bold" }} key={index}>
                        {tech}
                      </li>
                    );
                  })}
                </ul>
                <h4>Advantage:</h4>
                <ul className="list">
                  {db[currentIndex].niceToHave.map((tech, index) => {
                    return (
                      <li style={{ fontWeight: "bold" }} key={index}>
                        {tech}
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Collapse>
            <div className="buttons">
              <Button
                variant="contained"
                style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
                onClick={() => swipe("left")}
              >
                Swipe left!
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
                onClick={() => goBack()}
              >
                Undo swipe!
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
                onClick={() => swipe("right")}
              >
                Swipe right!
              </Button>
            </div>
          </Card>

          {lastDirection ? (
            <h2 className="infoText">You swiped {lastDirection}</h2>
          ) : null}
        </TinderCard>
      )}
    </>
  );
};

export default SimpleCard;
