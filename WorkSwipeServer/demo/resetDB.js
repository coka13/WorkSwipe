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

    } catch (e) {
        console.log(e)
    }
}

resetDB()