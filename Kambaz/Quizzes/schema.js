import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
const QuizSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    course: { type: String, required: true }, // course ID
    title: String,
    description: String,
    published: { type: Boolean, default: false },

    quizType: {
        type: String,
        enum: ["GRADED_QUIZ", "PRACTICE_QUIZ", "GRADED_SURVEY", "UNGRADED_SURVEY"],
        default: "GRADED_QUIZ",
    },

    assignmentGroup: {
        type: String,
        enum: ["Quizzes", "Exams", "Assignments", "Project"],
        default: "Quizzes",
    },

    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 }, // minutes
    multipleAttempts: { type: Boolean, default: false },
    maxAttempts: { type: Number, default: 1 },
    showCorrectAnswers: { type: Boolean, default: false },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },

    availableFrom: Date,
    untilDate: Date,
    dueDate: Date,

    totalPoints: { type: Number, default: 0 },
    questionCount: { type: Number, default: 0 },
}, { collection: "quizzes" } );
export default QuizSchema;