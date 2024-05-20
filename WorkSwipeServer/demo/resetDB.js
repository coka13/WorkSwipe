import fs from 'fs';
import mongoose from 'mongoose';
import { connectionString } from "../config/config.js";
import { Admin } from '../models/Admin.js';
import { Match } from '../models/Match.js';
import { Technologies } from '../models/Technologies.js';
import { JobSeeker } from '../models/JobSeeker.js';
import { Employer } from '../models/Employer.js';
import { JobOpportunity } from '../models/JobOpportunity.js';
import { hashPassword } from '../utils/passwordHashing.js';


const resetDB = async () => {
    try {
        await mongoose.connect(connectionString)

        await Admin.deleteMany({})
        await Match.deleteMany({})
        await Technologies.deleteMany({})
        await JobSeeker.deleteMany({})
        await Employer.deleteMany({})
        await JobOpportunity.deleteMany({})

        const adminsFromJSON = JSON.parse(fs.readFileSync('admin.json', 'utf8'))
        adminsFromJSON.forEach(admin => { admin['password'] = hashPassword(admin['password']) })
        const adminsInDB = await Admin.insertMany(adminsFromJSON)
        console.log(adminsInDB)

        const employersFromJSON = JSON.parse(fs.readFileSync('employer.json', 'utf8'))
        employersFromJSON.forEach(employer => { employer['password'] = hashPassword(employer['password']) })
        const employersInDB = await Employer.insertMany(employersFromJSON)
        console.log(employersInDB)

        const technologiesFromJSON = JSON.parse(fs.readFileSync('technology.json', 'utf8'))
        const technologiesInDB = await Technologies.insertMany(technologiesFromJSON)
        console.log(technologiesInDB)

        const jobSeekersFromJSON = JSON.parse(fs.readFileSync('jobSeeker.json', 'utf8'))
        jobSeekersFromJSON.forEach(jobSeeker => {
            jobSeeker.technologies.forEach((tech, index) => {
                const foundTech = technologiesInDB.find(techDB => techDB.name === tech)
                jobSeeker['technologies'][index] = foundTech._id
                jobSeeker['password'] = hashPassword(jobSeeker['password'])
            })
        })
        const jobSeekersInDB = await JobSeeker.insertMany(jobSeekersFromJSON)
        console.log(jobSeekersInDB)

        const jobOpportunitiesFromJSON = JSON.parse(fs.readFileSync('jobOpportunity.json', 'utf8'))
        jobOpportunitiesFromJSON.forEach(jobOpp => {
            jobOpp.technologies.forEach((tech,index) => {
                const foundTech = technologiesInDB.find(techDB => techDB.name === tech)
                jobOpp['technologies'][index] = foundTech._id
            })
            jobOpp['employer'] = employersInDB[jobOpp.employer]._id
        })
        const jobOpportunitiesInDB = await JobOpportunity.insertMany(jobOpportunitiesFromJSON)
        console.log(jobOpportunitiesInDB);

        const matchesFromJSON= JSON.parse(fs.readFileSync('matches.json', 'utf8'))
        matchesFromJSON.forEach(match=>{
            match['jobSeeker']=jobSeekersInDB[match.jobSeeker]._id
            match['jobOpportunity']=jobOpportunitiesInDB[match.jobOpportunity]._id
        })
        const matchesInDB= await Match.insertMany(matchesFromJSON);
        console.log(matchesInDB)


    } catch (e) {
        console.log(e)
    }
}

resetDB()