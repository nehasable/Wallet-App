import React from 'react';
import { Link } from 'react-router-dom';
import userImage from "../pages/icon.png"
function SendMoney() {
    return (
        <div className='bg-zinc-400 h-screen flex justify-center items-center'>
        <div className='bg-white h-[300px] w-[350px] flex justify-center border rounded-lg shadow-lg'>
            <div className='flex flex-col justify-center'>
            <h2 className='ml-2 mb-6 text-4xl font-bold '>Send  money</h2>
            <div className='flex flex-row items-center'>
            <div className="w-8 h-8 rounded-full overflow-hidden mb-2">
                        <img src={userImage} alt="User" className="object-cover w-full h-full" />
                    </div><label className='ml-2 text-lg '>Account Name</label></div>
                <label className='mb-2 text-gray-500'>Amount (in Rs)</label><input type='text' className='mb-2 border border-gray-300'></input>
                <Link to="/dashboard"><button className='bg-blue-500 text-white mt-3 mb-3 border rounded-lg border-gray-300 h-10 w-full' >Transfer</button></Link>
                
            </div>
           
        </div>
    </div>
    );
}

export default SendMoney;
