import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';

const StudentDashboard = () => {
    const { user } = useSelector(store => store.auth);
    const [marks, setMarks] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'student') {
            navigate('/login');  // Redirect if not a student
        }

        const fetchStudentMarks = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/students/${user.studentId}/marks`);
                setMarks(res.data);
            } catch (error) {
                console.log(error);
                toast.error('Failed to fetch marks');
            }
        };

        fetchStudentMarks();
    }, [user, navigate]);

    if (!marks) {
        return 
    }

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
                <div className="bg-white p-6 rounded shadow-md">
                    <h2 className="text-xl font-semibold">Welcome, {marks.name}!</h2>
                    <div className="mt-4">
                        <p><strong>Student ID:</strong> {marks.studentId}</p>
                        <p><strong>Attendance Marks:</strong> {marks.attendanceMarks}</p>
                        <p><strong>Project Review Marks:</strong> {marks.projectReviewMarks}</p>
                        <p><strong>Assessment Marks:</strong> {marks.assessmentMarks}</p>
                        <p><strong>LinkedIn Post Marks:</strong> {marks.linkedinPostMarks}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;