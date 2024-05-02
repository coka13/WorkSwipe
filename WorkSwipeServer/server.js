import express from "express"
import mongoose from "mongoose"
//import { dirname } from "path";
//import { fileURLToPath } from "url";

import cors from "cors"
import { createJobOpportunityController, deleteJobOpportunityByEmployerIDController, deleteJobOpportunityController, getAllJobOpportunitiesController, getSingleJobOpportunityController, updateJobOpportunityController } from "./controllers/JobOpportunity"
import { createJobSeekerController, deleteJobSeekerController, getAllJobSeekersController, getSingleJobSeekerController, jobSeekerLoginController, jobSeekerLoginController, updateJobSeekerController } from "./controllers/JobSeeker"
import { adminLoginController, createAdminController, deleteAdminController, getAllAdminsController, getSingleAdminController, updateAdminController } from "./controllers/Admin"
import { createEmployerController, deleteEmployerController, employerLoginController, getAllEmployersController, getSingleEmployerController, updateEmployerController } from "./controllers/Employer"
import { createMatchController, deleteMatchController, getAllMatchesByEmployerIdController, getAllMatchesByJobOpportunityIdController, getAllMatchesByJobSeekerIdController, getSingleMatchController, updateMatchController } from "./controllers/Match"
import { createTechnologyController, deleteTechnologyController, getAllTechnologiesController, getSingleTechnologyController } from "./controllers/Technologies"
//import { DB_CLUSTER, DB_NAME, DB_PASS, DB_USERNAME, port } from "./config/config.js";

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);



const app = express()
app.use(express.json())

app.use(cors())
//app.use(express.static("Client/dist")) 


app.get('/api/adminLogin',adminLoginController)
app.get('/api/singleAdmin/:id',getSingleAdminController)
app.get('/api/allAdmins',getAllAdminsController)
app.post('/api/createAdmin', createAdminController)
app.put('/api/adminUpdate/:id', updateAdminController)
app.delete('/api/deleteAdmin/:id', deleteAdminController)

app.get('/api/employerLogin' , employerLoginController)
app.get('/api/singleEmployer/:id' , getSingleEmployerController)
app.get('/api/allEmployers', getAllEmployersController)
app.post('/api/createEmployer' , createEmployerController)
app.put('/api/updateEmployer/:id', updateEmployerController)
app.delete('/api/deleteEmployer/:id' , deleteEmployerController)

app.get('/api/jobSeekerLogin' , jobSeekerLoginController)
app.get('/api/singleJobSeeker/:id', getSingleJobSeekerController)
app.get('/api/allJobSeekers' , getAllJobSeekersController)
app.post('/api/createJobSeeker' ,createJobSeekerController)
app.put('/api/updateJobSeeker/:id' , updateJobSeekerController)
app.delete('/api/deleteJobSeeker/:id', deleteJobSeekerController)


app.get('/api/singleJobOpportunity/:id', getSingleJobOpportunityController)
app.get('/api/allJobOpportunities' , getAllJobOpportunitiesController)
app.post('/api/createJobOpportunity' ,createJobOpportunityController)
app.put('/api/updateJobOpportunity/:id' , updateJobOpportunityController)
app.delete('/api/deleteJobOpportunity/:id', deleteJobOpportunityController)
app.delete('/api/deleteJobOpportunityByEmployer/:employerId', deleteJobOpportunityByEmployerIDController)


app.get('/api/updateMatch/:id', updateMatchController)
app.get('/api/allMatchesByEmployer/:employerId' , getAllMatchesByEmployerIdController)
app.get('/api/allMatchesByJobSeeker/:jobSeekerId' , getAllMatchesByJobSeekerIdController)
app.get('/api/allMatchesByJobOpportunity/:jobOpportunityId' , getAllMatchesByJobOpportunityIdController)
app.post('/api/createMatch/employer/:employerId/jobSeeker/:jobSeekerId/jobOpportunity/:jobOpportunityId' ,createMatchController)
app.delete('/api/deleteMatch/:id', deleteMatchController)

app.get('/api/singleTechnology/:id', getSingleTechnologyController)
app.get('/api/allTechnologies' , getAllTechnologiesController)
app.post('/api/createTechnology' ,createTechnologyController)
app.delete('/api/deleteTechnology/:id', deleteTechnologyController)





// app.get("*", (req, res) => {
//     console.log(__dirname);
//     res.sendFile(__dirname + "/Client/dist/index.html");//still not used
//   });

app.listen(3000, async () => {
    try {
      //await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASS}@${DB_CLUSTER}/${DB_NAME}`);
      console.log(`Example app listening on port 3000`);
    } catch (e) {
      console.log(e);
    }
  });
