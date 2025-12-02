import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        description: String,
        points: Number,
        due: String,
        notAvailableUntil: String,
        availableUntil: String,
        course: String,
    },
    { collection: "assignments" }
);

export default assignmentSchema;