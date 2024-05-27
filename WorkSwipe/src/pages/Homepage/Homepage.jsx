import SimpleCard from "../../components/TinderCard/TinderCard";
import { useDispatch, useSelector } from "react-redux";
import { setAddMatch } from "../../store/slices/matchesSlice";
import "./Homepage.css";
import { getUserRole } from "../../utils/getUserRole";



const Homepage = () => {
  
  const userRole = getUserRole( useSelector((state) => state.users));//brings the role from store
  const swipeProps = useSelector((state) => state.opportunities.offers);//brings the relevant offers from store
  const currentOfferTechnologies = useSelector(
    (state) => state.opportunities.currentOffer?.technologies
  );
  const currentOffer = useSelector((state) => state.opportunities.currentOffer);//displays 1 offer
  const dispatch = useDispatch();
  const handleRightSwipe = (direction) => {
    if (direction === "right" && currentOfferTechnologies) {
      dispatch(setAddMatch(currentOffer));//creating a match if swiped truly
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
    <div className="admin">
  <img src="src/assets/admin.png"  style={{width:"500px",height:"500px"}}/>
  <h3>Admin mode</h3>
  </div>
)}
   
      </div>
  
    </div>
  );
};

export default Homepage;
