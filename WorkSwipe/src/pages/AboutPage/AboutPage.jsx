import imgDaniel from "../../assets/imgDaniel.png";
import imgAsaf from "../../assets/imgAsaf.png";
import CustomLinkNavigate from "../../components/CustomLinkNavigate/CustomLinkNavigate";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <>
      <div className="title">
        <h4>About Us</h4>
      </div>
      <div className="aboutPage">
        <p className="aboutUs">
          WorkSwipe is a project made by Daniel Uralsky & Asaf Karaso, with the
          help and mentoring of Almog Ram. Our goal was creating the perfect
          interface for job seekers and HR offices all over the computing
          market. Our application is easy to access, fun, and efficient for
          you—doesn't matter if you are a junior or a senior looking for a new
          challenge.
        </p>
        <div className="imgBox">
          <img className="Img" src={imgDaniel} alt="Daniel's image" />
          <img className="Img" src={imgAsaf} alt="Asaf's image" />
        </div>
        <p>Hope you will find this app both beneficial and enjoyable!</p>
        <CustomLinkNavigate
          text={"Have some tips or questions?"}
          to={"/contact"}
          label={"Contact Us"}
        />
      </div>
    </>
  );
};

export default AboutPage;
