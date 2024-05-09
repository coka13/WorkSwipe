import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MatchCard from "../../components/MatchCard/MatchCard";
import { setDeleteMatch } from "../../store/slices/matchesSlice";
import "./MatchesPage.css"

const MatchesPage = () => {
  const dispatch=useDispatch()
  const matches = useSelector((state) => state.matches.matches);
  const handleDelete = (index) => {
    dispatch( setDeleteMatch(index)); 
  };
  return (
    <div className="matches">
      {matches.map((match, index) => (
  <MatchCard
    key={index} 
    match={match}
    index={index}
    handleDelete={handleDelete}
  />
))}

    </div>
  );
};

export default MatchesPage;
