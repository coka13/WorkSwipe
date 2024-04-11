import React from "react";

import "./Homepage.css";
import SimpleCard from "../../components/TinderCard/TinderCard";
import { swipeProps } from "../../dummyData/constants";


const Homepage = () => {

  return (
    <div className="homePage">
      <div className="swipeArea">
        <SimpleCard db={swipeProps} />
      </div>
    </div>
  );
};

export default Homepage;
