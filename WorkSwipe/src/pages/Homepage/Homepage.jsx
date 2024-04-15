import React from "react";
import "./Homepage.css";
import SimpleCard from "../../components/TinderCard/TinderCard";
import { useSelector } from "react-redux";
import { arraysAreEqual } from "../../utils/arraysEqual";

const Homepage = () => {
  const swipeProps = useSelector((state) => state.opportunities.offers);
  const userTechnologies = useSelector((state) => state.users.technologies);
  // Use a selector function to subscribe to changes in currentOfferTechnologies
  const currentOfferTechnologies = useSelector(
    (state) => state.opportunities.currentOffer?.technologies
  );
  const handleRightSwipe = (direction) => {
    if (
      direction === "right" &&
      currentOfferTechnologies &&
      arraysAreEqual(userTechnologies, currentOfferTechnologies)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="homePage">
      <div className="swipeArea">
        <SimpleCard db={swipeProps} handleRightSwipe={handleRightSwipe} />
      </div>
    </div>
  );
};

export default Homepage;
