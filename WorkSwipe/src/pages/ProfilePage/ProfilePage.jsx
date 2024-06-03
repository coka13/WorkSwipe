import DisplayCard from "../../components/DisplayCard/DisplayCard";
import { useSelector } from "react-redux";
import ScienceIcon from "@mui/icons-material/Science";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { baseUrl, jobSeekerRoute, technologyRoute } from "../../utils/routes";
import { setJobSeekerTechnologies } from "../../store/slices/jobSeekerSlice";
import "./ProfilePage.css";

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const role = useSelector((state) => state.auth.role);
  const id = useSelector((state) => state.auth._id);
  const userTechnologies = useSelector((state) => state.jobSeeker.technologies);

  const jobSeeker = useSelector((state) => state.jobSeeker);
  const admin = useSelector((state) => state.admin);
  const employer = useSelector((state) => state.employer);

  let dispatchFunc;
  if (role === "Admin" || role === "Employer") {
    dispatchFunc = () => {};
  } else {
    dispatchFunc = setJobSeekerTechnologies;
  }
  const { data, error, isLoading } = useQuery({
    queryKey: ["get-technologies-by-ids"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}${technologyRoute}/technologiesByIDs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idsList: userTechnologies }),
      });
      return response.json();
    },
    enabled: role === "Job Seeker", // only fetch data if role is "Job Seeker"
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

  let personProfile;
  let img;
  console.log("userTechs",userTechnologies)

  if (role === "Job Seeker") {
    personProfile = {
      Username: jobSeeker.username,
      Name: jobSeeker.name,
      Email: jobSeeker.email,
      Experience: jobSeeker.experience,
      LinkedIn: jobSeeker.linkedInUrl,
      GitHub: jobSeeker.gitHubUrl,
      Residence: jobSeeker.location,
      Technologies: data,
    };
    img = jobSeeker.url;
  } else if (role === "Admin") {
    personProfile = {
      Username: admin.username,
      Name: admin.name,
      Email: admin.email,
    };
    img = admin.url;
  } else if (role === "Employer") {
    personProfile = {
      Username: employer.username,
      Name: employer.name,
      Email: employer.email,
      LinkedIn: employer.linkedIn,
      CompanyName: employer.CompanyName,
    };
    img = employer.url;
  }

  const handleEdit = (field, value) => {
    if (field === "technologies") {
      updateUserTechnologiesMutation.mutate();
    }
  };

  const handleDeleteTech = (tech) => {
    dispatch(setJobSeekerTechnologies({ technologies: userTechnologies.filter((tech) => tech !== tech) }));
  };

  return (
    <>
      <div className="title">
        <h4>Profile</h4>
      </div>
      {(role === "Job Seeker") && (
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
            role={role}
          />
        </div>
      )}
      {(role === "Admin") && (
        <div className="card">
          <DisplayCard
            db={personProfile}
            img={img}
            handleEdit={handleEdit}
            dispatchFunc={dispatchFunc}
            role={role}
          />
        </div>
      )}
      {(role === "Employer") && (
        <div className="card">
          <DisplayCard
            db={personProfile}
            img={img}
            handleEdit={handleEdit}
            dispatchFunc={dispatchFunc}
            role={role}
          />
        </div>
      )}
    </>
  );
};

export default ProfilePage;