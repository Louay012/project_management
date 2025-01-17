import React, { useState,useContext,useEffect ,useRef} from "react";

import Sidebar from "./sidebar";
import toast from 'react-hot-toast';
import { UserContext } from './UserContext';
import { IoIosLogIn } from "react-icons/io";
import { Link , useNavigate} from 'react-router-dom';
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>

const Profile= () => {
  const { userDetails } = useContext(UserContext);
   const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const changevisible = () => {
        setPasswordVisible((prev) => !prev);
      };
  const editProfile=async () => {

    try{
      
      if(userDetails){
      const response= await fetch('http://localhost/project_management/src/API/menu.php' ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                
              }),
        })
        
        const data = await response.json();
        if (data.success){
              
            }
             else {
            setError( "Failed to fetch  data.");

            }
      }
    }
        catch (err) {
            setError(err||"An error occurred while fetching ." );
            
        } 
        
    }
    
   
    
    const showerror=()=>{
      toast.error(error, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,});
    }
   useEffect(() => {
               if (error) {
                 showerror();
                 setError(null); 
               }
           }, [error]);
    
  return (
    <div className="w-full h-[100vh] flex p-3 bg-slate-200 gap-2">
        <Sidebar></Sidebar>
        <div className="overflow-auto flex-1 p-6 ml-56 bg-gray-50  h-full rounded-lg shadow-md flex w-full justify-center items-center m gap-4">
            <div className='flex flex-col   w-11/12 md:w-1/2'>
                    <div >
                        <h2 className="text-3xl font-bold text-center  text-gray-800 ">Manage Your Account </h2>
                        <h2 className="text-base font-thin text-center text-gray-800">Update your personal details and preferences below.</h2>
                    </div>
                    <form onSubmit={editProfile} className="flex flex-col justify-around gap-4 ">
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="username" className="block text-gray-700">Username :</label>
                        <input 
                        type="text" 
                        placeholder='Enter your username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400" 
                        required 
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="username" className="block text-gray-700">Email :</label>
                        <input 
                        type="email" 
                        placeholder="Enter your email" 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400" 
                        required 
                        />
                    </div>
                    
                        <div className='flex flex-col gap-2'>
                                            <label htmlFor="password" className="block text-gray-700">Password :</label>
                                            
                                            <div className="relative w-full">
                                                    <input 
                                                    type={passwordVisible ? "text" : "password"}
                                                    placeholder='Enter your password'
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400" 
                                                    required 
                                                    />
                                                        <button
                                                        type="button"
                                                        onClick={changevisible}
                                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                                        >
                                                        {passwordVisible ? (
                                                            <MdVisibility className='w-5 h-5'/>
                                                        ) : (
                                                            <MdVisibilityOff className='w-5 h-5'/>
                                                        )}
                                                        </button>
                                            </div>
                            
                    </div>

                    <button 
                        type="submit" 
                        className="w-full py-3 bg-zinc-800 text-white font-semibold flex items-center justify-center gap-2
                        rounded-md hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                    <i><FaRegEdit className='h-8 w-6'></FaRegEdit></i>
                        Edit Profile
                    </button>
                    </form>

                    
                    </div>
    </div>
    </div>
  );
};

export default Profile;
