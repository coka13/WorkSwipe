import mongoose from "mongoose";

const technologiesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now() }
});

export const Technologies = mongoose.model("Technologies", technologiesSchema);
