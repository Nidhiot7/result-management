import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../shared/Navbar';

const UploadMarks = () => {
    const [file, setFile] = useState(null);
    const [markType, setMarkType] = useState('attendance');
    const [studentId, setStudentId] = useState('');
    const [students, setStudents] = useState([]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleMarkTypeChange = (event) => {
        setMarkType(event.target.value);
    };

    const handleStudentIdChange = (event) => {
        setStudentId(event.target.value);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('studentId', studentId); // Include studentId

        try {
            // Get the token from local storage or your authentication context
            const token = localStorage.getItem('token'); // Adjust this if you're using a different storage method

            const response = await axios.post(
                `http://localhost:8000/api/v1/admin/uploadMarks?markType=${markType}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`, // Include token in the headers
                    },
                }
            );

            console.log(response.data.message); // Show success message
        } catch (error) {
            console.log(error);
            alert('Error uploading marks'); // Show error message
        }
    };

    // Fetch students for dropdown on component mount
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/admin/students'); // Adjust API endpoint as necessary
                setStudents(response.data); // Assuming response contains an array of student objects
            } catch (error) {
                console.log(error)
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Upload Marks</h2>
                <form onSubmit={handleUpload}>
                    <div className="mb-4">
                        <label htmlFor="markType" className="block text-sm font-medium text-gray-700 mb-2">Select Mark Type:</label>
                        <select
                            id="markType"
                            value={markType}
                            onChange={handleMarkTypeChange}
                            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="attendance">Attendance</option>
                            <option value="projectReview">Project Review</option>
                            <option value="projectSubmission">Project Submission</option>
                            <option value="linkedinPost">LinkedIn Post</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">Select Student ID:</label>
                        <select
                            id="studentId"
                            value={studentId}
                            onChange={handleStudentIdChange}
                            required
                            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select Student</option>
                            {students.map(student => (
                                <option key={student.id} value={student.studentId}>
                                    {student.name} ({student.studentId})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">Upload Excel File:</label>
                        <input
                            type="file"
                            id="file"
                            onChange={handleFileChange}
                            accept=".xlsx, .xls"
                            required
                            className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Upload Marks
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadMarks;