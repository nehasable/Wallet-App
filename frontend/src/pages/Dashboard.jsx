import React, { useEffect, useState } from 'react';
import userImage from "../pages/icon.png"
import { Link } from 'react-router-dom';
import axios from "axios"

 function Dashboard() {
    const [usersvar,setUsersVar]=useState([])
    useEffect(()=>{
//display all the users 
axios.get("http://localhost:3000/api/v1/user/bulk")
    .then(response => {
        setUsersVar(response.data.user);
        // console.log(response.data.uservar)
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });
    // console.log(usersvar)
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
        
        { usersvar && usersvar.map(user => {console.log(user)
        return <User user={user} />

    }
        )

        }
        </div>
    );
}

function User({ user }) {
    
    return (
        <div>
            <p>{user.username}</p>
          
           
        </div>
    );
}

export default Dashboard