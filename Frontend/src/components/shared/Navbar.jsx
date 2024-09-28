import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';
import axios from 'axios';

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/user/logout", { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            // toast.error(error.response.data.message);
        }
    }
    return (
        <div>
            {
                user ? (
                    <div className='container mx-auto flex justify-between items-center bg-blue-600 text-white py-4'>
                        <h1 className='text-2xl font-bold'>Result Management System</h1>

                        <ul className="flex font-medium space-x-6">
                            <li><Link to="/" className="">Home</Link></li>
                            {
                                user && user.role === "student" ? (
                                    <>

                                        <li><Link to="/students/dashboard" className="">Student Dashboard</Link></li>
                                        <li><Link to="/students/results" className="">View Results</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/admin/dashboard" className="">Admin Dashboard</Link></li>
                                        {/* <li><Link to="/manage-students" className="">Manage Students</Link></li>
                                        <li><Link to="/uploadMarks" className="">Upload Marks</Link></li> */}
                                    </>
                                )}
                        </ul>

                        <div className='cursor-pointer'>
                            <Button onClick={logoutHandler} variant="link" className="bg-red-400 hover:bg-red-700 px-4 py-2 rounded">Logout</Button>
                        </div>

                    </div>
                ) : (
                    <div className='grid justify-center mt-40'>
                        <Card className="w-[350px] shadow-red-800">
                            <CardHeader>
                                <CardTitle>Welcome to <br />Result Management System</CardTitle>
                                <CardDescription>Please choose an option to proceed</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid w-full justify-center">
                                    <div>
                                        <Link to="/login"><Button className="border-2 bg-[#FFCA3A] text-[#E6F9AF] scroll-smooth">Login</Button></Link>
                                        <Link to="/register"><Button className="bg-[#F83002] hover:bg-[#034748] m-1 scroll-smooth">Signup</Button></Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )
            }
        </div>

    )
}
export default Navbar