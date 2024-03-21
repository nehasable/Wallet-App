import React, { useEffect, useState } from 'react';
import userImage from "../pages/icon.png"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"


 function Dashboard() {
    const [users,setUsers]=useState([])
    const [filter,setFilter]=useState('')
    
    useEffect(()=>{
//display all the users 
axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}` )
    .then(response => {
        setUsers(response.data.users);    //-------------------obtained from backend call
        // console.log(response.data.users)
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });
     console.log(filter)
},[filter])


   
    return (
        <div>
            <div className='flex flex-row items-center justify-between p-4'>
                <h1 className='ml-4 text-2xl font-bold' > Payments App</h1>
                <label className='mr-4 text-lg' >Hello, User</label>
                </div>
                <div className=' border-t-2 w-full '></div>   
                <div className='flex flex-col p-6'>
                    <span className='ml-4 mb-6 text-xl font-bold'>Your Balance Rs.1000 </span>
                  <span className='ml-4 mb-4 text-lg'> Users</span>  
                  <input onChange={(e)=>setFilter(e.target.value)} type="text" placeholder='Search users..' className=' ml-4 w-[1350px] border rounded-md border-gray-300 h-10 '></input>
                    </div> 
        
                    <div className='p-6 flex flex-col gap-8'>

   { users && users.map(user => {
        return <User user={user} />

    }
        )

        }
{/* </div> */}
        </div>

     
        </div>
    );
} 

function User({ user }) {
const navigate=useNavigate()
    
    return (
        <>
   {/* {user.username[0]} */}
        <div className="flex items-center justify-between border-b p-4">
            <p>{user.username}</p>
            <div className="bg-blue-500 text-white border rounded-lg h-8 px-4">
            <button onClick={(e) => {
                navigate("/sendmoney?id=" + user._id + "&name=" + user.username);
            }} >Send Money </button>
            
        </div>
        </div>

      


        </>
    );
}


export default Dashboard