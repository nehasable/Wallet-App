import React, { useEffect, useState } from 'react';
import userImage from "../pages/icon.png"
import { Link } from 'react-router-dom';
import axios from "axios"
function Dashboard() {
    const [users,setUsers]=useState([])
    useEffect(()=>{
//display all the users 
axios.get("http://localhost:3000/api/v1/user/bulk")    //didnt use async function      
.then(response=>{
    setUsers(response.data.user)
})

    },[])
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
                  <input type="text" placeholder='Search users..' className=' ml-4 w-[1350px] border rounded-md border-gray-300 h-10 '></input>
                    </div> 
        <div className='p-6 flex flex-col gap-8'>
<div className='flex items-center justify-between'>
   
               {/* <span className='ml-4 '>User 1</span>
<Link to="/sendmoney"><button className='bg-blue-500 text-white mr-20 border rounded-lg  h-10 w-40'>Send Money</button></Link>
</div>
<div className='flex items-center justify-between'><span className='ml-4'>User 2</span>
<Link to="/sendmoney"><button className='bg-blue-500 text-white mr-20 border rounded-lg  h-10 w-40'>Send Money</button></Link></div>
<div className='flex items-center justify-between'><span className='ml-4'>User 3</span>
<Link to="/sendmoney"><button className='bg-blue-500 text-white mr-20 border rounded-lg  h-10 w-40'>Send Money</button></Link></div> */}
</div>
        </div>
        
        {users && users.map(user => <User user={user} />)}

        
        </div>
    );
}

export default Dashboard;
