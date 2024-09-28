import React, { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import axios from 'axios';

const ManageStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/admin/manage-students', { withCredentials: true });
                setStudents(res.data.students);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStudents();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-20">
                <h1 className="text-4xl font-bold mb-5 text-center">Manage Students</h1>
                <div className="shadow-md rounded-lg p-4">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 bg-gray-200 text-left">Name</th>
                                <th className="py-2 px-4 bg-gray-200 text-left">Email</th>
                                <th className="py-2 px-4 bg-gray-200 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4">{student.name}</td>
                                    <td className="py-2 px-4">{student.email}</td>
                                    <td className="py-2 px-4">
                                        <button className="bg-red-500 text-white px-2 py-1 rounded-md">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageStudents;