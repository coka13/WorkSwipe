import React from "react";
import { useSelector } from "react-redux";
import MatchCard from "../../components/MatchCard/MatchCard";
import "./MatchesPage.css"

const MatchesPage = () => {
  const matches = useSelector((state) => state.matches.matches);
  console.log("matches", matches);
  return (
    <div className="matches">
      {matches.map((match) => (
        <MatchCard match={match} />
      ))}
    </div>
  );
};

export default MatchesPage;
