import Student from '../models/student.js';
import XLSX from 'xlsx';

export const uploadMarks = async (req, res) => {
    try {
        // Read and parse the uploaded Excel file
        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const markType = req.query.markType; // Get mark type from query params
        const studentId = req.body.studentId; // Get studentId from form data

        // Assuming marks are to be uploaded for the selected studentId
        const student = await Student.findOne({ studentId });
        if (!student) {
            return res.status(404).json({ message: "Student not found", success: false });
        }

        let updateData = {};

        for (const row of jsonData) {
            if (markType === 'attendance') {
                updateData.attendanceMarks = row.attendanceMarks;
            } else if (markType === 'projectReview') {
                updateData.projectReviewMarks = row.projectReviewMarks;
            } else if (markType === 'projectSubmission') {
                updateData.projectSubmissionMarks = row.projectSubmissionMarks;
            } else if (markType === 'linkedinPost') {
                updateData.linkedinPostMarks = row.linkedinPostMarks;
            }
        }

        await Student.findOneAndUpdate(
            { studentId },
            updateData,
            { new: true, upsert: true }
        );

        res.status(200).json({ message: `${markType} marks uploaded successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Failed to upload ${markType} marks` });
    }
};