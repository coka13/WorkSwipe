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
  Icon,
  Button,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Collapse from "@mui/material/Collapse";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import HouseIcon from "@mui/icons-material/House";
import StarIcon from "@mui/icons-material/Star";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
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
        <div>No cards to display.</div>
      ) : (
        <TinderCard
          ref={childRefs[currentIndex]}
          className="swipe"
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
                <Avatar sx={{ bgcolor: "#1976D2" }} aria-label="recipe">
                  {db[currentIndex].name.charAt(0)}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={db[currentIndex].name}
            />

            <CardContent>
              <CardMedia
                component="img"
                height="194"
                image={db[currentIndex].url}
                alt={db[currentIndex].name}
              />
              <Typography>
                <StarIcon />
                {db[currentIndex].exp} years of experience
              </Typography>

              <Typography>
                <HouseIcon></HouseIcon>
                {db[currentIndex].residence}
              </Typography>
              <Typography>
                <AlternateEmailIcon />
                {db[currentIndex].email}
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
                  <LinkedInIcon />
                </IconButton>
              </a>

              <a
                href={db[currentIndex].gitHub}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton aria-label="GitHub">
                  <GitHubIcon />
                </IconButton>
              </a>
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
                Technologies
              </IconButton>

            </CardActions>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
              <ul>
                {db[currentIndex].technologies.map((tech)=>{
                    return <li>{tech}</li>
                })}
              </ul>

              </CardContent>
            </Collapse>
            <div className="buttons">
            <Button variant="contained"
              style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
              onClick={() => swipe("left")}
            >
              Swipe left!
            </Button>
            <Button variant="contained"
              style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
              onClick={() => goBack()}
            >
              Undo swipe!
            </Button>
            <Button variant="contained"
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
