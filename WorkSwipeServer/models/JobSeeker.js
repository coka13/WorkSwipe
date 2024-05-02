import mongoose from "mongoose";

const jobSeekerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    experience: { type: Number, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    technologies:  [{type:mongoose.Schema.Types.ObjectId , ref:"Technologies" , required:true}] ,
    linkedInUrl: { type: String },
    gitHubUrl: { type: String },
    dateCreated: { type: Date, default: Date.now() },
    matches: { type: [String], required: true }
});

export const JobSeeker = mongoose.model("JobSeeker", jobSeekerSchema);
