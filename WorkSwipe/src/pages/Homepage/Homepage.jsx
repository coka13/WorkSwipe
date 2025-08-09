import SimpleCard from "../../components/TinderCard/TinderCard";
import { useDispatch, useSelector } from "react-redux";
import { setAddMatch } from "../../store/slices/matchesSlice";
import { useQuery } from "@tanstack/react-query";
import "./Homepage.css";
import { useEffect } from "react";
import { setOpportunities } from "../../store/slices/jobOffersSlice";
import { baseUrl, jobOpportunityRoute, technologyRoute } from "../../utils/routes";



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
      <div className="homeContainer">
        {userRole === "Job Seeker" && (
          <div className="jobSeekerSection">
            <div className="homeHeader">
              <h2 className="homeTitle">Discover Opportunities</h2>
              <p className="homeSubtitle">Swipe to find your perfect match</p>
            </div>
            <div className="swipeArea">
              <SimpleCard db={swipeProps} handleRightSwipe={handleRightSwipe} />
            </div>
          </div>
        )}
        
        {userRole === "Admin" && (
          <div className="adminSection">
            <div className="adminCard">
              <div className="adminHeader">
                <h2 className="adminTitle">Admin Dashboard</h2>
                <p className="adminSubtitle">Manage WorkSwipe platform</p>
              </div>
              <div className="adminContent">
                <img src="src/assets/admin.png" alt="Admin" className="adminImage"/>
                <div className="adminStats">
                  <div className="statCard">
                    <h3>Platform Overview</h3>
                    <p>Monitor and manage the WorkSwipe ecosystem</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {userRole === "Employer" && (
          <div className="employerSection">
            <div className="employerCard">
              <div className="employerHeader">
                <h2 className="employerTitle">Welcome, Employer</h2>
                <p className="employerSubtitle">Find the perfect candidates for your team</p>
              </div>
              <div className="employerActions">
                <div className="actionCard">
                  <h3>Post New Job</h3>
                  <p>Create job opportunities to attract talent</p>
                </div>
                <div className="actionCard">
                  <h3>View Applications</h3>
                  <p>Review candidates and manage applications</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
