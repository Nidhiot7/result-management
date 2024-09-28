import Student from '../models/student.js';

// Create a new student
export const createStudent = async (req, res) => {
    try {
        const { studentId, name, attendanceMarks, projectReviewMarks, assessmentMarks, linkedinPostMarks } = req.body;

        const newStudent = new Student({
            studentId,
            name,
            attendanceMarks,
            projectReviewMarks,
            assessmentMarks,
            linkedinPostMarks
        });

        await newStudent.save();
        res.status(201).json({ message: "Student created successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create student", success: false });
    }
};

// Get all students
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json({ students });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch students", success: false });
    }
};

// Get a single student by studentId
export const getStudentById = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findOne({ studentId });
        
        if (!student) {
            return res.status(404).json({ message: "Student not found", success: false });
        }

        res.status(200).json({ student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch student", success: false });
    }
};

// Update a student's information
export const updateStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const updateData = req.body;

        const student = await Student.findOneAndUpdate({ studentId }, updateData, { new: true });

        if (!student) {
            return res.status(404).json({ message: "Student not found", success: false });
        }

        res.status(200).json({ message: "Student updated successfully", student });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update student", success: false });
    }
};

// Delete a student
export const deleteStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findOneAndDelete({ studentId });

        if (!student) {
            return res.status(404).json({ message: "Student not found", success: false });
        }

        res.status(200).json({ message: "Student deleted successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete student", success: false });
    }
};

// Fetch a particular student's marks
export const getStudentMarks = async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findOne({ studentId });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        // res.status(200).json(student);
        res.status(200).json({
            studentId: student.studentId,
            name: student.name,
            attendanceMarks: student.attendanceMarks,
            projectReviewMarks: student.projectReviewMarks,
            assessmentMarks: student.assessmentMarks,
            linkedinPostMarks: student.linkedinPostMarks,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Failed to fetch student marks' });
    }
};