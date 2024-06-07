import express from "express"
import mongoose from "mongoose"
import cors from "cors"
//import { dirname } from "path";
//import { fileURLToPath } from "url";


import adminRoutes from './routes/Admin.js'
import jobSeekerRoutes from './routes/JobSeeker.js'
import employerRoutes from './routes/Employer.js'
import matchRoutes from './routes/Match.js'
import technologyRoutes from './routes/Technology.js'
import jobOpportunityRoutes from './routes/JobOpportunity.js'
import { connectionString } from "./config/config.js";

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);



const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true // Enable credentials
}));
//app.use(express.static("Client/dist")) 

app.use('/api/admin', adminRoutes)
app.use('/api/employer', employerRoutes)
app.use('/api/jobSeeker', jobSeekerRoutes)
app.use('/api/jobOpportunity', jobOpportunityRoutes)
app.use('/api/match', matchRoutes)
app.use('/api/technology', technologyRoutes)


// app.get("*", (req, res) => {
//     console.log(__dirname);
//     res.sendFile(__dirname + "/Client/dist/index.html");//still not used
//   });

app.listen(3000, async () => {
  try {
    await mongoose.connect(connectionString)
    console.log(`Example app listening on port 3000`);
  } catch (e) {
    console.log(e);
  }
});
