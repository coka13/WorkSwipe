import imgDaniel from "../../assets/imgDaniel.png";
import imgAsaf from "../../assets/imgAsaf.png";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";
import "./About.css";

const AboutPage = () => {
  return (
    <div className="aboutPage">
      <h4>About Us</h4>

      <p className="aboutUs">
        WorkSwipe is a project made by Daniel Uralslky & Asaf Karaso, with the
        help and mentoring of Almog Ram. Our goal was creating the perfect
        interface for job seekers and HR offices all over the computering
        market. our application is easy to access, fun and afficient for you-
        doesn`t metter if you are a junior or a senor looking for a new
        challenge.
      </p>
      <div className="imgBox">
        <img className="Img" src={imgDaniel} alt="daniels image" />
        <img className="Img" src={imgAsaf} alt="asafs image" />
      </div>

      <p>Hope you will find this app both beneficial and enjoyable!</p>
      <CustomLinkNavigate
        text={"Have some tips or questions?"}
        to={"/contact"}
        label={"Contact Us"}
      />
    </div>
  );
};

export default AboutPage;
