import React from "react";
import "./Homepage.css";
import SimpleCard from "../../components/TinderCard/TinderCard";
import { useDispatch, useSelector } from "react-redux";
import { setAddMatch } from "../../store/slices/matchesSlice";
import { CardMedia } from "@mui/material";


const Homepage = () => {
  
  const userRole = useSelector((state) => state.users.role);
  const swipeProps = useSelector((state) => state.opportunities.offers);
  const currentOfferTechnologies = useSelector(
    (state) => state.opportunities.currentOffer?.technologies
  );
  const currentOffer = useSelector((state) => state.opportunities.currentOffer);
  const dispatch = useDispatch();
  const handleRightSwipe = (direction) => {
    if (direction === "right" && currentOfferTechnologies) {
      dispatch(setAddMatch(currentOffer));
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="homePage">
      <div className="swipeArea">
        {userRole === "JobSeeker" && (
          <SimpleCard db={swipeProps} handleRightSwipe={handleRightSwipe} />
        )}
   {userRole === "Admin" && (
  <img src="../../assets/admin.jpg"  style={{width:"100px",height:"100px"}}/>
)}
   
      </div>
  
    </div>
  );
};

export default Homepage;
