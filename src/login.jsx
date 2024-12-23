import React, { useState } from 'react';
import img from './Images/Good team-bro.png'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ username, password });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-50  to-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-lg w-5/6 max-w-full space-y-6 h-5/6 flex items-center justify-around">
        
        <div className='flex flex-col justify-around h-5/6 w-96'>
                <div>
                <h2 className="text-3xl font-bold text-center text-gray-800">Log in to your account</h2>
                <h2 className="text-base font-thin text-center text-gray-800">Welcome Back! please enter your details</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col justify-around gap-4 ">
                <div className='flex flex-col gap-2'>
                    <label htmlFor="username" className="block text-gray-700">Username :</label>
                    <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    required 
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="password" className="block text-gray-700">Password :</label>
                    <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    required 
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full py-3 bg-zinc-800 text-white font-semibold rounded-md hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                    Login
                </button>
                </form>

                <p className="text-center text-sm text-gray-600">Don't have an account? <a href="#" className="text-gray-500 hover:underline hover:text-gray-700">Sign up</a></p>
                </div>
                <img src={img} alt='' className='w-1/2'></img>
      </div>
    </div>
  );
};

export default Login;
