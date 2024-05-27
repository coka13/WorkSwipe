import React from "react";
import FormComponent from "../../components/FormComponent/FormComponent";
import { useSelector, useDispatch } from "react-redux";
import ScienceIcon from "@mui/icons-material/Science";
import { setDeleteEmployerOffer } from "../../store/slices/employerOffersSlice";
import MatchCard from "../../components/MatchCard/MatchCard";
import "./EmployerPage.css"

const EmployerPage = () => {
  const dispatch = useDispatch();
  const employerAds = useSelector((state) => state.employerOffers.employerOffers);//brings from store offers the employer created
  const handleDelete = (index) => {
    dispatch(setDeleteEmployerOffer(index));//deletes from employer to store
  };
  const systemTechs = useSelector((state) => state.technologies.technologies);//setting the requierment techs for the application-store to front

  const handleSubmit = (event) => {
    // You can put your logic here to handle the form submission
    event.preventDefault();
  };

  return (
    <div>
      <div className="title">
        <h4>Your recruit ads</h4>
      </div>
      <div className="employerPage">
<div className="published-ads">

      {employerAds.map((ad, index) => (
          <MatchCard
            key={index}
            match={ad}
            index={index}
            handleDelete={handleDelete}
          />
        ))}
</div>
      <div className="adBox">
        <FormComponent
          props={[
            {
              name: "email",
              type: "email",
              label: "Email",
              required: true,
              form: {},
            },
            {
              name: "name",
              type: "name",
              label: "Name",
              required: true,
              form: {},
            },
            {
              name: "url",
              type: "url",
              label: "Image link",
              required: false,
              form: {},
            },
            {
              name: "linkedIn",
              type: "linkedIn",
              label: "LinkedIn link",
              required: false,
              form: {},
            },
            {
              name: "location",
              type: "location",
              label: "location",
              required: false,
              form: {},
            },
            {
              name: "experience",
              type: "select",
              label: "Experience in years",
              options: Array.from({ length: 21 }, (_, i) => i),
              required: true,
              form: {},
            },
            {
              title: "Choose technologies you need",
              description:
                "Select the technologies you need you'r applicant to be compentent in and press Submit",
              type: "check",
              label: "Technologies",
              options: systemTechs,
              required: true,
              checkedList: [],
              Icon: <ScienceIcon />,
            },
          ]}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
      </div>
  );
};

export default EmployerPage;