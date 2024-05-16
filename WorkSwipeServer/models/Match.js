import mongoose from "mongoose";


const matchSchema = new mongoose.Schema({
 
 jobSeeker:{type:mongoose.Schema.Types.ObjectId , ref:"JobSeeker" , required:true},
 dateCreated: { type: Date, default: Date.now() },
 jobOpportunity:{type:mongoose.Schema.Types.ObjectId , ref:"JobOpportunity" , required:true},
 isDeprecated:{type:Boolean, default:false}
 
});

export const Match = mongoose.model("Match", matchSchema);
