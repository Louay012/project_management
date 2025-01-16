import React, {useContext,useState,useEffect } from 'react';
import img from './Images/Good team-bro.png'
import { Link ,useNavigate} from 'react-router-dom';
import { IoIosLogIn } from "react-icons/io";
import { UserContext } from './UserContext';
import toast from 'react-hot-toast';
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { userDetails, setUserDetails } = useContext(UserContext);
  const navigate = useNavigate(); 
  const [passwordVisible, setPasswordVisible] = useState(false);

  const changevisible = () => {
    setPasswordVisible((prev) => !prev);
  };
  useEffect(() => {
      if (userDetails) {
        navigate("/Schedule");
      }
    }, [userDetails,navigate]);
  const handleSubmit= async (e) =>{
  e.preventDefault();
  try{
      const response = await fetch('http://localhost/project_management/src/API/login.php',{
          method:'POST',
          headers:{
                  'Content-Type': 'application/json',
              },
          body:JSON.stringify({
              email: email,
              password: password,
          })
      })
 
      const data = await response.json();
      if(data.success){
          console.log(data.data);
          const userData=data.data;
          setUserDetails(userData);
          localStorage.setItem('userDetails', JSON.stringify(userData));
          
          navigate('/Schedule');
      }
      else{
          setError(data.message);
      }
  }
  catch(error){
      setError('Error during login:', error);
  }
}
const showerror=()=>{
  toast.error(error, {
    position: 'top-center',
    autoClose: 1000, 
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
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-50  to-slate-200">

      <div className="bg-white p-8 rounded-lg shadow-lg w-5/6 max-w-full space-y-6 h-5/6 flex items-center justify-around">
        
        <div className='flex flex-col justify-around h-5/6 w-96'>
                <div>
                <h2 className="text-3xl font-bold text-center text-gray-800">Log in to your account</h2>
                <h2 className="text-base font-thin text-center text-gray-800">Welcome Back! please enter your details</h2>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col justify-around gap-4 ">
                <div className='flex flex-col gap-2'>
                    <label htmlFor="email" className="block text-gray-700">Email :</label>
                    <input 
                    type="email" 
                    placeholder='Enter your email'
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

                 <button type="submit" 
                    className="w-full py-3 bg-zinc-800 text-white font-semibold flex items-center justify-center gap-2
                                    rounded-md hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-slate-400">
                    <i><IoIosLogIn className='h-8 w-6'></IoIosLogIn></i>
                      Login
                  </button>
                </form>

                <p className="text-center text-sm text-gray-600">Don't have an account? <Link to={"/signup"} className="text-gray-500 hover:underline hover:text-gray-700">Sign up</Link></p>
                </div>
                <img src={img} alt='' className='w-1/2'></img>
      </div>
    </div>
  );
};

export default Login;
