import React from 'react';
import { Link } from 'react-router-dom';
function SignUp() {
    return (
        <>
        
           <div className='bg-zinc-400 h-screen flex justify-center items-center'>
    <div className='bg-white h-[500px] w-[350px] flex justify-center border rounded-lg shadow-lg'>
        <div className='flex flex-col justify-center'>
        <h2 className='ml-14 text-4xl font-bold '>Sign Up</h2>
        <label className='ml-2 mb-6 text-gray-500'>Enter your details to create account</label>
            <label className='mb-2'>First Name</label><input type='text' className='mb-2 border border-gray-300'></input>
            <label className='mb-2'>Last Name</label><input type='text' className='mb-2 border border-gray-300'></input>
            <label className='mb-2'>Username</label><input type='text' className='mb-2 border border-gray-300'></input>
            <label className='mb-2'>Password</label><input type='text' className='mb-2 border border-gray-300'></input>
            <Link to="/dashboard"><button className='bg-black text-white mt-3 mb-3 border rounded-lg border-gray-300 w-full' >Sign Up</button></Link>
            <label lassName='ml-4'>Already have an account? <Link to="/signin"><button className='underline'>Sign in</button></Link></label>
        </div>
    </div>
</div>

        </>
    );
}

export default SignUp;
