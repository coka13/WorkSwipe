import DisplayCard from "../../components/DisplayCard/DisplayCard";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTech,
  setTechnologies,
  updateUserField,
} from "../../store/slices/userSlice";
import ScienceIcon from '@mui/icons-material/Science';

import "./ProfilePage.css";
import { getUserRole } from "../../utils/getUserRole";

const ProfilePage = () => {
  const person = useSelector((state) => state.users);
  const userTechnologies = useSelector((state) => state.users.technologies);
  const dispatch = useDispatch();
  const dispatchFunc= setTechnologies

 

  const personProfile = {
    Username: person.username,
    Name: person.name,
    Email: person.email,
    Experience: person.experience,
    LinkedIn: person.linkedIn,
    Residence: person.residence,
    Technologies: person.technologies,
  };

  const img = person.url;

  const handleListCheck = (techs) => {
    dispatch(setTechnologies(techs));
  };

  const handleEdit = (field, value) => {
    dispatch(updateUserField({ field, value }));
  };

  const handleDeleteTech = (tech) => {
    dispatch(deleteTech(tech));
  };

  return (
    <>
    <div className="title">
    <h4>Profile</h4>
    </div>
   
    <div className="card">
      <DisplayCard
        db={personProfile}
        img={img}
        handleEdit={handleEdit}
        handleDeleteList={handleDeleteTech}
        handleListCheck={handleListCheck}
        checkedList={userTechnologies}
        formIcon={<ScienceIcon/>}
        title={"Choose your technologies"}
        description={"Choose the technologies you are competent in and press Submit"}
        type={"check"}
        dispatchFunc={dispatchFunc}
        form={person}
        role={getUserRole(person)}
      />
    </div>
    </>
  );
};

export default ProfilePage;
