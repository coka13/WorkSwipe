import React from "react";
import "./Homepage.css";
import SimpleCard from "../../components/TinderCard/TinderCard";
import { useDispatch, useSelector } from "react-redux";
import { setAddMatch } from "../../store/slices/matchesSlice";

const Homepage = () => {
  const swipeProps = useSelector((state) => state.opportunities.offers);
  const userTechnologies = useSelector((state) => state.users.technologies);
  const currentOfferTechnologies = useSelector(
    (state) => state.opportunities.currentOffer?.technologies
  );
  const currentOffer = useSelector((state) => state.opportunities.currentOffer);
  const dispatch = useDispatch();
  const handleRightSwipe = (direction) => {
    if (
      direction === "right" &&
      currentOfferTechnologies 
    ) {
      dispatch( setAddMatch(currentOffer));
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
