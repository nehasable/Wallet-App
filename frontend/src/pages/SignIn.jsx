import axios from 'axios';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
function SignIn() {
    const [username,setUserName]=useState("")
    const [password,setPassword]=useState("")
    return (
        <div className='bg-zinc-400 h-screen flex justify-center items-center'>
        <div className='bg-white h-[400px] w-[350px] flex justify-center border rounded-lg shadow-lg'>
            <div className='flex flex-col justify-center'>
            <h2 className='ml-24 text-4xl font-bold '>Sign In</h2>
            <label className='ml-2 mb-6 text-gray-500'>Enter your details to access your account</label>
                <label className='mb-2'>Username</label><input onChange={e=>setUserName(e.target.value)}  type='text' className='mb-2 border border-gray-300'></input>
                <label className='mb-2'>Password</label><input onChange={e=>setPassword(e.target.value)} type='text' className='mb-2 border border-gray-300'></input>
                <Link to="/dashboard"><button onClick={async()=>{
                    const response=axios.post("http://localhost:3000/api/v1/user/signin",{
                                username,
                                password
                    })
                    localStorage.setItem("token", response.data.token) //stores token in web
                }}
                className='bg-black text-white mt-3 mb-3 border rounded-lg border-gray-300 w-full'
                >Sign In</button></Link>
                <label className='ml-6'>Don't have an account? <Link to="/signup"><button className='underline'>Sign up</button></Link></label>
            </div>
           
        </div>
    </div>
    );
}

export default SignIn;
