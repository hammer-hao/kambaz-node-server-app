import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const QuestionSchema = new mongoose.Schema(
    {
        _id: { type: String, default: uuidv4 },
        quizId: {
            type: String,
            ref: "Quiz",
            required: true,
        },

        type: {
            type: String,
            enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_BLANK"],
            required: true,
        },

        title: String,
        points: { type: Number, default: 1 },

        text: String,

        choices: [String],
        correctChoiceIndexes: {
            type: [Number],
            default: [],
        },

        correctBool: Boolean,

        blanks: [String],
    },
    { collection: "questions" },
);

export default QuestionSchema;