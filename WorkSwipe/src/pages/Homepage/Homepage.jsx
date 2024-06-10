import SimpleCard from "../../components/TinderCard/TinderCard";
import { useDispatch, useSelector } from "react-redux";
import { setAddMatch } from "../../store/slices/matchesSlice";
import { useQuery } from "@tanstack/react-query";
import "./Homepage.css";
import { useEffect } from "react";
import { setOpportunities } from "../../store/slices/jobOffersSlice";
import { baseUrl, jobOpportunityRoute } from "../../utils/routes";



const Homepage = () => {
  const userTechnologies = useSelector((state) => state.jobSeeker.technologies);
  const userRole = ( useSelector((state) => state.auth.role));
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

  const role = useSelector((state) => state.auth.role);

  const { data, error, isLoading } = useQuery({
    queryKey: ["get-technologies-by-ids"],
    queryFn: async () => {
      const response = await fetch(
        `${baseUrl}${technologyRoute}/technologiesByIDs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idsList: userTechnologies }),
        }
      );
      return response.json();
    },
    enabled: role === "Job Seeker", // only fetch data if role is "Job Seeker"
  });



// Fetch job offers
const { data: jobData, error: jobError, isLoading: jobLoading } = useQuery({
  queryKey: ["get-all-job-offers"],
  queryFn: async () => {
    const response = await fetch(
      `${baseUrl}${jobOpportunityRoute}/allJobOpportunities`
    );
    const jsonData = await response.json();
    console.log(jsonData)
    return jsonData;
  },
  enabled: userRole === "Job Seeker", // only fetch data if role is "Job Seeker"
});




useEffect(() => {
  if(userRole === "Job Seeker" && jobData && userTechnologies){
    const matchingOffers = jobData.filter(offer => 
      offer.technologies.every(tech => userTechnologies.includes(tech))
    );
    dispatch(setOpportunities(matchingOffers));
  }
}, [userRole, jobData, dispatch, userTechnologies]);

  return (
    <div className="homePage">
      <div className="swipeArea">
        {userRole === "Job Seeker" && ( 
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
