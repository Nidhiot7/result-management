import React, { useState } from 'react';
import axios from 'axios';

const CreateStudent = ({ fetchStudents }) => {
    const [studentData, setStudentData] = useState({
        studentId: '',
        name: '',
        attendanceMarks: 0,
        projectReviewMarks: 0,
        assessmentMarks: 0,
        linkedinPostMarks: 0,
    });

    const handleChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8000/api/v1/students', studentData);
        fetchStudents(); // Refresh the student list
        setStudentData({ studentId: '', name: '', attendanceMarks: 0, projectReviewMarks: 0, assessmentMarks: 0, linkedinPostMarks: 0 });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="studentId" value={studentData.studentId} onChange={handleChange} placeholder="Student ID" required />
            <input name="name" value={studentData.name} onChange={handleChange} placeholder="Name" required />
            <input name="attendanceMarks" value={studentData.attendanceMarks} onChange={handleChange} placeholder="Attendance Marks" type="number" />
            <input name="projectReviewMarks" value={studentData.projectReviewMarks} onChange={handleChange} placeholder="Project Review Marks" type="number" />
            <input name="assessmentMarks" value={studentData.assessmentMarks} onChange={handleChange} placeholder="Assessment Marks" type="number" />
            <input name="linkedinPostMarks" value={studentData.linkedinPostMarks} onChange={handleChange} placeholder="LinkedIn Post Marks" type="number" />
            <button type="submit">Create Student</button>
        </form>
    );
};

export default CreateStudent;