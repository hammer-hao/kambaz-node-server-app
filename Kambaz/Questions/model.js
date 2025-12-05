import mongoose from "mongoose";
import QuestionSchema from "./schema.js";
const model = mongoose.model("QuestionsModel", QuestionSchema);
export default model;