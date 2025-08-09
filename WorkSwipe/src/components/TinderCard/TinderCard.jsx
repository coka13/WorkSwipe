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
    <div className="swipe-container">
      {match === true && <Handshake />}
      {!match && db[currentIndex] && (
        <div className="card-stack">
          {/* Show next card behind current one for depth */}
          {db[currentIndex + 1] && (
            <div className="card-background">
              <div className="job-card preview-card">
                <div className="card-image-container">
                  <img 
                    src={db[currentIndex + 1].image} 
                    alt={db[currentIndex + 1].name}
                    className="card-image"
                  />
                  <div className="gradient-overlay" />
                </div>
                <div className="card-content-preview">
                  <h3 className="company-name">{db[currentIndex + 1].name}</h3>
                  <p className="job-position">{db[currentIndex + 1].position}</p>
                </div>
              </div>
            </div>
          )}
          
          <TinderCard
            className="tinder-card-modern"
            key={db[currentIndex]?.name}
            onSwipe={(dir) => swiped(dir, db[currentIndex]?.name, currentIndex)}
            onCardLeftScreen={() => outOfFrame(db[currentIndex]?.name, currentIndex)}
            preventSwipe={["up", "down"]}
          >
            <div className="job-card">
              <div className="card-image-container">
                <img 
                  src={db[currentIndex].image} 
                  alt={db[currentIndex].name}
                  className="card-image"
                />
                <div className="gradient-overlay" />
                <div className="company-info-overlay">
                  <h2 className="company-name">{db[currentIndex].name}</h2>
                  <div className="company-details">
                    <span className="company-size">{db[currentIndex].companySize || "Growing Team"}</span>
                    <span className="location">📍 {db[currentIndex].location}</span>
                  </div>
                </div>
              </div>
              
              <div className="card-content">
                <div className="job-header">
                  <h3 className="job-title">{db[currentIndex].position}</h3>
                  <div className="salary-range">
                    {db[currentIndex].salary || "$70,000 - $90,000"}
                  </div>
                </div>
                
                <div className="job-description">
                  <p>{db[currentIndex].description || "Join our innovative team and make an impact!"}</p>
                </div>
                
                <div className="job-details">
                  <div className="detail-item">
                    <div className="detail-icon">💼</div>
                    <span>{db[currentIndex].experience} years experience</span>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-icon">🌐</div>
                    <span>{db[currentIndex].website}</span>
                  </div>
                </div>
                
                <div className="tech-stack-section">
                  <h4 className="section-title">Required Technologies</h4>
                  <div className="tech-tags">
                    {data?.required && data.required.map((tech, index) => (
                      <span key={index} className="tech-tag required">
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  
                  {data?.niceToHave && data.niceToHave.length > 0 && (
                    <>
                      <h4 className="section-title bonus-title">Nice to Have</h4>
                      <div className="tech-tags">
                        {data.niceToHave.map((tech, index) => (
                          <span key={index} className="tech-tag bonus">
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                {db[currentIndex].perks && (
                  <div className="perks-section">
                    <h4 className="section-title">Perks & Benefits</h4>
                    <div className="perks-list">
                      {db[currentIndex].perks.map((perk, index) => (
                        <span key={index} className="perk-item">
                          ✨ {perk}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="action-buttons">
                  <button 
                    className="action-btn contact-btn"
                    onClick={() => window.open(`mailto:${db[currentIndex].emailHR}`, '_blank')}
                  >
                    📧 Contact HR
                  </button>
                  <button 
                    className="action-btn linkedin-btn"
                    onClick={() => window.open(db[currentIndex].linkedInUrl, '_blank')}
                  >
                    💼 LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </TinderCard>
          
          {/* Swipe indicators */}
          <div className="swipe-indicators">
            <div className="swipe-indicator left">
              <div className="indicator-icon">❌</div>
              <span>Pass</span>
            </div>
            <div className="swipe-indicator right">
              <div className="indicator-icon">💚</div>
              <span>Apply</span>
            </div>
          </div>
        </div>
      )}
      
      {/* No more cards message */}
      {db.length === 0 && (
        <div className="no-cards-container">
          <div className="no-cards-animation">
            <div className="empty-stack-icon">📋</div>
            <h3>No More Opportunities</h3>
            <p>You've reviewed all available positions! Check back later for new opportunities.</p>
            <button className="refresh-btn" onClick={() => window.location.reload()}>
              🔄 Refresh
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleCard;
