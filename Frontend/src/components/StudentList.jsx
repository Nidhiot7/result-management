import React, { useEffect } from "react";
import axios from "axios";
import { useStudents } from "./StudentContext";

const StudentList = () => {
    const { students, setStudents } = useStudents(); // Ensure this hook is working correctly

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/v1/students");
                setStudents(response.data);
            } catch (error) {
                console.error("Failed to fetch students:", error);
            }
        };

        fetchStudents();
    }, [setStudents]);

    if (!students || students.length === 0) {
        return 
    }

    return (
        <div>
            <h1>Student List</h1>
            <ul>
                {students.map((student) => (
                    <li key={student.id}>{student.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudentList;