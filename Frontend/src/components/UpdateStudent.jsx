import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateStudent = ({ studentId, fetchStudents }) => {
    const [studentData, setStudentData] = useState({});

    useEffect(() => {
        const fetchStudent = async () => {
            const response = await axios.get(`http://localhost:8000/api/v1/students/${studentId}`);
            setStudentData(response.data.student);
        };

        fetchStudent();
    }, [studentId]);

    const handleChange = (e) => {
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/v1/students/${studentId}`, studentData);
        fetchStudents(); // Refresh the student list
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={studentData.name} onChange={handleChange} required />
            <input name="attendanceMarks" value={studentData.attendanceMarks} onChange={handleChange} />
            <input name="projectReviewMarks" value={studentData.projectReviewMarks} onChange={handleChange} />
            <input name="assessmentMarks" value={studentData.assessmentMarks} onChange={handleChange} />
            <input name="linkedinPostMarks" value={studentData.linkedinPostMarks} onChange={handleChange} />
            <button type="submit">Update Student</button>
        </form>
    );
};

export default UpdateStudent;