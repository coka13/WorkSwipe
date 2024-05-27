import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MatchCard from "../../components/MatchCard/MatchCard";
import { setDeleteMatch } from "../../store/slices/matchesSlice";
import "./MatchesPage.css"

const MatchesPage = () => {
  const dispatch=useDispatch()
  const matches = useSelector((state) => state.matches.matches);//extract matches from the matchesSlice
  const handleDelete = (index) => {
    dispatch( setDeleteMatch(index)); //delete from slice
  };
  return (
    <>
     <div className="title">
    <h4>Matches</h4>
    </div>
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
    </>
  );
};

export default MatchesPage;
