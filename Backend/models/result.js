import mongoose from "mongoose";
const resultSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    attendance: {
        type: Number,
        required: true
    },
    projectReview: {
        type: Number,
        required: true
    },
    projectSubmission: {
        type: Number,
        required: true
    },
    linkedinPost: {
        type: Number,
        required: true
    },
}, { timestamps: true });
export const Result = mongoose.model("Result", resultSchema)