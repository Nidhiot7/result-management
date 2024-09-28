import React, { createContext, useContext, useState } from 'react';

const StudentContext = createContext();

export const useStudents = () => {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error('useStudents must be used within a StudentProvider');
    }
    return context;
};

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState([]); // Initialize as an empty array

    return (
        <StudentContext.Provider value={{ students, setStudents }}>
            {children}
        </StudentContext.Provider>
    );
};