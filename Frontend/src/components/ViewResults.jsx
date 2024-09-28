import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import axios from 'axios';

const ViewResults = () => {
    const [results, setResults] = useState(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/students/results", { withCredentials: true });
                setResults(res.data);
            } catch (error) {
                console.log(error);
                // console.error("Error fetching results:", error);
            }
        };
        fetchResults();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-20">
                <h1 className="text-4xl font-bold mb-5 text-center">Your Results</h1>
                {results ? (
                    <div className="shadow-md rounded-lg p-4">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 bg-gray-200 text-left">Marks Type</th>
                                    <th className="py-2 px-4 bg-gray-200 text-left">Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4">Attendance Marks</td>
                                    <td className="py-2 px-4">{results.attendanceMarks}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4">Project Review Marks</td>
                                    <td className="py-2 px-4">{results.projectReviewMarks}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4">Project Submission Marks</td>
                                    <td className="py-2 px-4">{results.projectSubmissionMarks}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4">LinkedIn Post Marks</td>
                                    <td className="py-2 px-4">{results.linkedinPostMarks}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center">No results available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default ViewResults;