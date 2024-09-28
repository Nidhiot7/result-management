import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Upload Marks Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Upload Marks</CardTitle>
            <CardDescription>Upload marks for students such as attendance, project reviews, and more.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/admin/uploadMarks">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Go to Upload Marks</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Manage Students Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Manage Students</CardTitle>
            <CardDescription>View and manage student information and marks.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/admin/manage-students">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Go to Manage Students</Button>
            </Link>
          </CardContent>
        </Card>

        {/* User Management Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage users, reset passwords, deactivate accounts, etc.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/admin/user-management">
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">Go to User Management</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;