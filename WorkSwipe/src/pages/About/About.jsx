import "./About.css"
import imgDaniel from "../../assets/imgDaniel.png"
const AboutPage = () => {
  return (
    <div className="aboutPage" >
      <h4>About</h4>


      <p className="aboutUs">WorkSwipe is a project made by Daniel Uralslky & Asaf Karaso,
       with the help and mentoring of Almog Ram.
        Our goal was creating the perfect interface for job seekers and HR offices
         all over the computering market. 
        our application is easy to access, fun and afficient for you-
         doesn`t metter if you are a junior or a senor looking for a new challenge.
         
      </p>
      <img src={imgDaniel} alt="daniels image"/>

      
    

    </div>
  );
};

export default AboutPage;
