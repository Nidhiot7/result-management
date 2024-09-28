import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    attendanceMarks: {
        type: Number,
        required: true,
    },
    projectReviewMarks: {
        type: Number,
        required: true,
    },
    assessmentMarks: {
        type: Number,
        required: true,
    },
    linkedinPostMarks: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true, // This will add createdAt and updatedAt timestamps to the schema
});

const Student = mongoose.model('Student', studentSchema);

export default Student