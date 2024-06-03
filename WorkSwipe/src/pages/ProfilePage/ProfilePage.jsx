import DisplayCard from "../../components/DisplayCard/DisplayCard";
import { useDispatch, useSelector } from "react-redux";
import ScienceIcon from "@mui/icons-material/Science";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { baseUrl, jobSeekerRoute, technologyRoute } from "../../utils/routes";
import { setJobSeekerTechnologies } from "../../store/slices/jobSeekerSlice";
import "./ProfilePage.css";

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const role = useSelector((state)=>state.auth.role)
  const userTechnologies = useSelector((state) => state.jobSeeker.technologies);

  


  let dispatchFunc;
  if (role === "Admin" || role === "Employer") {
    dispatchFunc = () => {};
  } else {
    dispatchFunc = setJobSeekerTechnologies;
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
      console.log(person)
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
          checkedList={data}
          formIcon={<ScienceIcon />}
          title={"Choose your technologies"}
          description={
            "Choose the technologies you are competent in and press Submit"
          }
          type={"check"}
          dispatchFunc={dispatchFunc}
          form={person}
          role={role}
        />
      </div>
    </>
  );
};

export default ProfilePage;
