import mongoose from "mongoose";

const jobOpportunitySchema = new mongoose.Schema({
  image: { type: String },
  position: { type: String, required: true },
  experience: { type: Number, required: true },
  technologies:  [{type:mongoose.Schema.Types.ObjectId , ref:"Technologies" , required:true}] ,
  location: { type: String , required: true },
  emailHR: {type:String , required:true},
  website:{type:String },
  employer:{type:mongoose.Schema.Types.ObjectId , ref:"Employer" , required:true},
  name:{type:String,required:true},
  niceToHave:[{type:mongoose.Schema.Types.ObjectId , ref:"Technologies" }],
  isActive:{type:Boolean, default:true},
  linkedInUrl:{type:String},
  dateCreated: { type: Date, default: Date.now() },
});

export const JobOpportunity= mongoose.model("JobOpportunity", jobOpportunitySchema);
