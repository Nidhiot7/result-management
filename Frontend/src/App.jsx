import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import AdminDashboard from "./components/admin/AdminDashboard"
import StudentDashboard from "./components/StudentDashboard"
import UploadMarks from "./components/admin/UploadMarks"
import UserManagement from "./components/admin/ManageStudents"
import ManageStudents from "./components/admin/ManageStudents"
import NotFound from "./NotFound"
import CreateStudent from "./components/CreateStudent"
import StudentList from "./components/StudentList"
// import AdminPanel from "./components/AdminPanel"

function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/students/dashboard/:studentId',
      element: <StudentDashboard />
    },
    {
      path: '/students/:studentId',
      element: <CreateStudent />
    },
    {
      path: '/students',
      element: <StudentList />
    },
    {
      path: '/admin/dashboard',
      element: <AdminDashboard />
    },
    {
      path: '/admin/uploadMarks',
      element: <UploadMarks />
    },
    {
      path: '/admin/manage-students',
      element: <ManageStudents />
    },
    {
      path: '/admin/user-management',
      element: <UserManagement />
    },
    {
      path: '*',  // Catch-all route for undefined paths
      element: <NotFound />
    }
  ])
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
