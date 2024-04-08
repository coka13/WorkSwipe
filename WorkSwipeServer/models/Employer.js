import mongoose from "mongoose";

const employerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  companyName: {type:String , required: true},
  dateCreated: { type: Date, default: Date.now() }
});

export const Employer = mongoose.model("Employer", employerSchema);
