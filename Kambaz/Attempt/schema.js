// Kambaz/Attempts/schema.js
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const AttemptAnswerSchema = new mongoose.Schema(
    {
        questionId: { type: String, ref: "QuestionsModel", required: true },
        type: {
            type: String,
            enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK"],
            required: true,
        },

        choiceIndexes: [Number],
        
        value: Boolean,

        text: String,

        correct: { type: Boolean, default: false },
        earnedPoints: { type: Number, default: 0 },
    },
    { _id: false }
);

const AttemptSchema = new mongoose.Schema(
    {
        _id: { type: String, default: uuidv4 },
        quizId: { type: String, ref: "QuizzesModel", required: true },
        studentId: { type: String, ref: "UsersModel", required: true },

        submittedAt: { type: Date, default: Date.now },
        score: { type: Number, default: 0 },
        totalPoints: { type: Number, default: 0 },

        answers: [AttemptAnswerSchema],
    },
    { collection: "attempts" }
);

export default AttemptSchema;