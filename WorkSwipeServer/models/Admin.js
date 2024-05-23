import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true , unique:true},
  name: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String },
  email: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now() }
});

export const Admin = mongoose.model("Admin", adminSchema);
