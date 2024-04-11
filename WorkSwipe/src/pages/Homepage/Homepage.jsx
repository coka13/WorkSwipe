import React from "react";

import "./Homepage.css";
import SimpleCard from "../../components/TinderCard/TinderCard";
import { useSelector } from "react-redux";



const Homepage = () => {
const swipeProps= useSelector((state)=>state.opportunities.offers)
console.log(swipeProps)
  return (
    <div className="homePage">
      <div className="swipeArea">
        <SimpleCard db={swipeProps} />
      </div>
    </div>
  );
};

export default Homepage;
