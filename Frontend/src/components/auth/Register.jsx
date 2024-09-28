import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { setLoading } from '@/redux/authSlice'
import { toast } from 'sonner'
import axios from 'axios'

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  // const changeFileHandler = (e) => {
  //   setInput({ ...input, file: e.target.files?.[0] });
  // }

  const submitHandler = async (e) => {
    e.preventDefault();
    // const formData = new FormData();   
    // formData.append("name", input.name);
    // formData.append("email", input.email);
    // formData.append("password", input.password);
    // formData.append("role", input.role);

    try {
      dispatch(setLoading(true));
      const res = await axios.post("http://localhost:8000/api/v1/user/register", input, {
        // headers: { 'Content-Type': "multipart/form-data" },
        headers: {
          "Content-Type": "application/json"
      },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log(res);
      console.log({
        name: input.name,
        email: input.email,
        password: input.password,
        role: input.role,
    });
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [])
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mn-5'>Sign Up</h1>
          <div>
            <Label>Name</Label>
            <Input type="text" value={input.name} name="name" onChange={changeEventHandler} placeholder="Add Name" />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="abc@gmail.com" />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="password" />
          </div>
          <div className='lg:flex items-center justify-between'>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="student" checked={input.role === 'student'}
                  onChange={changeEventHandler} className="cursor-pointer" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="admin" checked={input.role === 'admin'}
                  onChange={changeEventHandler} className="cursor-pointer" />
                <Label htmlFor="r2">Admin</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Signup</Button>
          }
          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
        </form>
      </div>
    </div>
  )
}

export default Register