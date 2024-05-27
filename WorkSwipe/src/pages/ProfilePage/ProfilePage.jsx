import DisplayCard from "../../components/DisplayCard/DisplayCard";
import { useDispatch, useSelector } from "react-redux";
import ScienceIcon from "@mui/icons-material/Science";
import { getUserRole } from "../../utils/getUserRole";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { baseUrl, jobSeekerRoute, technologyRoute } from "../../utils/routes";
import "./ProfilePage.css";
import { setJobSeekerTechnologies } from "../../store/slices/jobSeekerSlice";

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const userTechnologies = useSelector((state) => state.users.technologies);//extract the techData of the user
  const dispatch = useDispatch();

  const role = useSelector((state) => state.auth.role);//using auth to get the role from db
  let dispatchFunc;
  if (role === "Admin" || role === "Employer") {
    dispatchFunc = () => {};
  } else {
    dispatchFunc = setJobSeekerTechnologies;//creating func to save users tech to store
  }

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
  });

  const updateUserTechnologiesMutation = useMutation({
    mutationFn: async () => {
      await fetch(`${baseUrl}${jobSeekerRoute}updateJobSeeker/${person._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ technologies: userTechnologies }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get-technologies-by-ids");
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const personProfile = {
    Username: person.username,
    Name: person.name,
    Email: person.email,
    Experience: person.experience,
    LinkedIn: person.linkedIn,
    Residence: person.residence,
    Technologies: data,
  };

  const img = person.url;

  const handleEdit = (field, value) => {
    if (field === "technologies") {
      updateUserTechnologiesMutation.mutate();
    }
    dispatch(updateUserField({ field, value }));//updating data to users slice
  };

  const handleDeleteTech = (tech) => {
    dispatch(deleteTech(tech));//deleting from store
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
          checkedList={data}
          formIcon={<ScienceIcon />}
          title={"Choose your technologies"}
          description={
            "Choose the technologies you are competent in and press Submit"
          }
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
