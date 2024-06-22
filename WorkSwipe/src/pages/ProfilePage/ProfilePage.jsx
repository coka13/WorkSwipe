import React, { useEffect, useState } from "react";
import DisplayCard from "../../components/DisplayCard/DisplayCard";
import { useDispatch, useSelector } from "react-redux";
import ScienceIcon from "@mui/icons-material/Science";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { baseUrl, jobSeekerRoute, technologyRoute } from "../../utils/routes";
import {
  setJobSeekerTechnologies,
  updateJobSeekerField,
} from "../../store/slices/jobSeekerSlice";
import "./ProfilePage.css";
import { updateEmployerField } from "../../store/slices/employerSlice";
import { updateAdminField } from "../../store/slices/adminSlice";


const ProfilePage = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const role = useSelector((state) => state.auth.role);
  const id = useSelector((state) => state.auth._id);
  const userTechnologies = useSelector((state) => state.jobSeeker.technologies);
  const systemTechnologies = useSelector(
    (state) => state.technologies.technologies
  );
  const jobSeeker = useSelector((state) => state.jobSeeker);
  const admin = useSelector((state) => state.admin);
  const employer = useSelector((state) => state.employer);
  const jobSeekerDispatchFunc = updateJobSeekerField;
  const jobSeekerSelectDispatchFunc = setJobSeekerTechnologies;
  const employerDispatchFunc = updateEmployerField;
  const adminDispatchFunc = updateAdminField;
  const [updatedTechs, setUpdatedTechs] = useState(false);

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

  const updateUserTechnologiesMutation = useMutation({
    mutationFn: async (newTechnologies) => {
      console.log("Updating technologies with:", newTechnologies); // Debugging log
      const response = await fetch(
        `${baseUrl}${jobSeekerRoute}/updateJobSeeker/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ technologies: newTechnologies }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update technologies");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get-technologies-by-ids");
    },
    onError: (error) => {
      console.error("Error updating technologies:", error); // Error logging
    },
    enabled: updatedTechs,
  });


  const updateJobSeekerPasswordMutation = useMutation({
    mutationFn: async (newPassword) => {
      console.log("Updating password with:", newPassword); // Debugging log
      const response = await fetch(
        `${baseUrl}${jobSeekerRoute}/updateJobSeekerPassword/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update password");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries("update-password-by-id");
    },
    onError: (error) => {
      console.error("Error updating password:", error); // Error logging
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

useEffect(() => {
  if (updatedTechs) { // If the technologies have been updated  
    updateUserTechnologiesMutation.mutate(userTechnologies); // Trigger the mutation
    setUpdatedTechs(false); // Reset the flag
  }
}, [updatedTechs, userTechnologies, updateUserTechnologiesMutation]);



  let personProfile;
  let img;
  let allowedUpdates;
  if (role === "Job Seeker") {
    allowedUpdates = {
      Username: false,
      Name: false,
      Email: false,
      Experience: true,
      linkedInUrl: true,
      gitHubUrl: true,
      Location: true,
      Technologies: true,
    };
    personProfile = {
      Username: jobSeeker.username,
      Name: jobSeeker.name,
      Email: jobSeeker.email,
      Experience: jobSeeker.experience,
      Location: jobSeeker.location,
      Technologies: data?.idsList || [], // Ensure data is present
      linkedInUrl: jobSeeker.linkedInUrl,
      gitHubUrl: jobSeeker.gitHubUrl,
    };
    img = jobSeeker.url;
  } else if (role === "Admin") {
    allowedUpdates = {
      Username: false,
      Name: false,
      Email: false,
    };
    personProfile = {
      Username: admin.username,
      Name: admin.name,
      Email: admin.email,
    };
    img = admin.url;
  } else if (role === "Employer") {
    allowedUpdates = {
      Username: false,
      Name: false,
      Email: false,
      CompanyName: true,
      linkedInUrl: true,
    };
    personProfile = {
      Username: employer.username,
      Name: employer.name,
      Email: employer.email,
      CompanyName: employer.companyName,
      linkedInUrl: employer.linkedInUrl,
    };
    img = employer.url;
  }

  const handleEdit = (field, value) => {
    if (field === "Choose your technologies") {
      console.log("handleEdit called with:", value); // Debugging log
      setUpdatedTechs(true);
    }
  };

  const handleDeleteTech = (tech) => {
    console.log("handleDeleteTech called with:", tech); // Debugging log
    const updatedTechnologies = userTechnologies.filter((_id) => _id !== tech);
    dispatch(setJobSeekerTechnologies(updatedTechnologies));
    handleEdit("Choose your technologies", updatedTechnologies); // Make sure this triggers the mutation
  };

  const handlePasswordEdit = (field, value) => {
    if (field === "password") {
      console.log("handlePasswordEdit called with:", value); // Debugging log
      updateJobSeekerPasswordMutation.mutate(value);
    }
  };

  return (
    <>
      <div className="title">
        <h4>Profile</h4>
      </div>
      {role === "Job Seeker" && (
        <div className="card">
          <DisplayCard
            allowedUpdates={allowedUpdates}
            db={personProfile}
            img={img}
            handleEdit={handleEdit}
            handleDeleteList={handleDeleteTech}
            checkedList={userTechnologies} // Use the derived list
            formIcon={<ScienceIcon />}
            title={"Choose your technologies"}
            description={
              "Choose the technologies you are competent in and press Submit"
            }
            type={"check"}
            dispatchFunc={jobSeekerDispatchFunc}
            selectDispatchFunc={jobSeekerSelectDispatchFunc}
            role={role}
            list={systemTechnologies}
            security={true}
          />
        </div>
      )}
      {role === "Admin" && (
        <div className="card">
          <DisplayCard
            db={personProfile}
            img={img}
            handleEdit={handleEdit}
            dispatchFunc={adminDispatchFunc}
            role={role}
            security={false}
            allowedUpdates={allowedUpdates}
          />
        </div>
      )}
      {role === "Employer" && (
        <div className="card">
          <DisplayCard
            allowedUpdates={allowedUpdates}
            db={personProfile}
            img={img}
            handleEdit={handleEdit}
            dispatchFunc={employerDispatchFunc}
            role={role}
            security={true}
          />
        </div>
      )}
    </>
  );
};

export default ProfilePage;
