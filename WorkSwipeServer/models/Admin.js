import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true , unique:ture},
  password: { type: String, required: true },
  email: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now() }
});

export const Admin = mongoose.model("Admin", adminSchema);
