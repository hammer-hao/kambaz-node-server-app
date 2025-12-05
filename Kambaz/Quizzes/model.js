import mongoose from "mongoose";
import QuizSchema from "./schema.js";
const model = mongoose.model("QuizzesModel", QuizSchema);
export default model;