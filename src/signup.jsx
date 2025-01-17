import React, { useState,useEffect,useContext } from 'react';
import img from './Images/Seminar-amico.png'
import { IoIosLogIn } from "react-icons/io";
import { Link , useNavigate} from 'react-router-dom';
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { UserContext } from './UserContext';
import toast from 'react-hot-toast';

const Signup = () => {
  /*const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  const [validPassword , setvalidPassword] =useState(false);*/
 

  const navigate = useNavigate(); 
  const { userDetails } = useContext(UserContext);
  useEffect(() => {
      if (userDetails) {
        navigate("/Schedule");
      }
    }, [userDetails,navigate]);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const changevisible = () => {
    setPasswordVisible((prev) => !prev);
  };
  const [error, setError] = useState(null);
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      //if(validPassword){
      const response = await fetch('http://localhost/project_management/src/API/signup.php',{
          method:'POST',
          headers:{
                  'Content-Type': 'application/json',
              },
          body:JSON.stringify({
              username: username,
              email:email,
              password: password,
          })
      })
      
      const data = await response.json();
      if(data.success){
          toast.success(data.message, {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,});
          navigate('/login');
      }

      else{
          setError(data.message);
      }
  /*}
  else{
      setError("password must verify conditions")
  }*/
  }
  catch(error){
      setError('Error during signup:', error);
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
/*useEffect(() => {
  setvalidPassword(regex.test(password));   
}, [password])*/

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-50  to-slate-200">

      <div className="bg-white p-8 rounded-lg shadow-lg w-5/6 max-w-full space-y-6 h-5/6 flex items-center justify-around">
        <img src={img} alt='' className='w-1/2'></img>
        <div className='flex flex-col justify-around h-full w-96'>
                <div >
                    <h2 className="text-3xl font-bold text-center  text-gray-800 ">Get Started Now </h2>
                    <h2 className="text-base font-thin text-center text-gray-800">Welcome to TaskFlow-Let's create your account.</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col justify-around gap-4 ">
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
                  <i><IoIosLogIn className='h-8 w-6'></IoIosLogIn></i>
                    Sign up
                </button>
                </form>

                <p className="text-center text-sm text-gray-600">Already have an account? <Link to={"/login"} className="text-gray-500 hover:underline hover:text-gray-700">Login</Link></p>
                </div>
      </div>
    </div>
  );
};

export default Signup;
