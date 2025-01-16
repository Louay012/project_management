import React, { useState,useContext,useEffect ,useRef} from "react";
//import { UserContext } from './UserContext';
import { Bar  } from 'react-chartjs-2';
import { Pie  } from 'react-chartjs-2';
import Sidebar from "./sidebar";
import toast from 'react-hot-toast';
import { UserContext } from './UserContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { FaRegUser } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { MdOutlineCreate } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { CgDanger } from "react-icons/cg";
import { FaAddressCard } from "react-icons/fa";
  // Register Chart.js components
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>

const Menu= () => {
  const { userDetails } = useContext(UserContext);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);
   const [invitations, setInvitations] = useState([]);
    const [TaskStats, setTaskStats] = useState(null);
    const [TaskCount, setTaskCount] = useState(null);
  const fetch_details=async () => {
    //setSubTasks([])
    try{
      
      if(userDetails){
      const response= await fetch('http://localhost/project_management/src/API/menu.php' ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email: userDetails.email,
                user_id: userDetails.user_id,

              }),
        })
        
        const data = await response.json();
      
              const submissionCounts = data.task_submitted.map((t) => t.nb_submissions); 
              const dates=data.task_submitted.map((t)=>t.submission_date)
              setInvitations(data.invitations)
              setTaskCount({
                labels: dates,
                datasets: [
                  {
                    label: 'number of tasks submitted ',
                    data: submissionCounts,
                    backgroundColor: ['rgba(2, 50, 150, 0.2)'],
                    borderColor: ['rgba(2, 50, 150, 0.6)'],
                    borderWidth: 1,
                  },
                ],
              });
              const dataStats=[data.stats[0].completed,data.stats[0].in_progress,data.stats[0].pending];
              setTaskStats({
                labels: ['Completed', 'In Progress', 'Pending'],
                datasets: [
                  {
                    label: 'number of tasks ',
                    data: dataStats,
                    backgroundColor: ['rgba(76, 175, 80, 0.2)', 'rgba(155, 175, 76, 0.1)', 'rgba(62, 90, 167, 0.2)'], // Green, Yellow, Red
                    borderColor: ['rgba(76, 175, 80, 0.6)', 'rgba(155, 175, 76, 0.6)', 'rgba(62, 90, 167, 0.6)'],
                    borderWidth: 1,
                  },
                ],
              });
              setLoading(false)
            }
             else {
            setError( "Failed to fetch Project Details.");

            }
      }
        catch (err) {
            setError(err||"An error occurred while fetching ." );
            
        } 
        
    }
    
    useEffect(() => {
        fetch_details()
    },[userDetails])  ; 
    
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
        <div className="overflow-auto flex-1 p-6 ml-56 bg-gray-50  h-full rounded-lg shadow-md flex w-full flex-col  gap-4">
       {loading ? 
       (<div><h1>loading</h1></div> )
       : (
        <div className="flex flex-col gap-8 h-full">
            <div className="flex justify-around">
                <div className="h-80 w-11/12 md:w-1/2 bg-slate-100 rounded-3xl shadow-md p-4">
                    <Bar data={TaskCount} options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                position: 'top',
                                                },
                                            },
                    }} ></Bar>
                </div>
                <div className="bg-slate-100 p-3  rounded-lg shadow-md flex justify-center w-11/12 md:w-2/5 items-center h-80">
                                <Pie  data={TaskStats} options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                position: 'top',
                                                },
                                            },
                                            }} />
                </div>
            </div>
        <div className="flex flex-col p-4 gap-4">
            <h3 className="flex items-center gap-2 text-slate-700 text-center font-mono"> <FaAddressCard/> Invitation :</h3>
            <table className="min-w-full bg-white table-auto rounded-lg overflow-hidden shadow-sm table-bordered">
                    <thead className="text-sm font-semibold text-gray-100 bg-gradient-to-r bg-slate-500 text-left">
                    <tr>
                        
                        
                        <th className="px-6 py-3 "><span className="flex items-center gap-2"><MdAlternateEmail/>Email</span></th>
                        <th className="px-6 py-3 "><span className="flex items-center gap-2"><FaRegUser/>Description</span></th>
                        <th className="px-6 py-3 "><span className="flex items-center gap-2"><FaUsersGear/>Role</span></th>
                        <th className="px-6 py-3 "><span className="flex items-center gap-2"><TiGroup/>Team</span></th>
                        <th className="px-6 py-3 "><span className="flex items-center gap-2"><MdOutlineCreate/> Sent </span></th>
                        <th className="px-6 py-3 "><span className="flex items-center gap-2"><CgDanger/> Expires </span></th>
                        <th className="px-6 py-3 "></th>
                        <th className="px-6 py-3 "></th>
                        </tr>
                    </thead>
                    <tbody>
                        {invitations.map((i) => (
                        <tr
                            key={i.id}
                            className="hover:bg-gray-100 transition-colors duration-200"
                        >
                            
                            <td className="px-6 py-4 text-sm text-gray-800">{i.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{i.description}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{i.role}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{i.team}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{i.sent}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{i.expires}</td>
                            <td className="px-6 py-4 text-sm text-gray-800 w-6  ">
                            <button  type="submit" value="" ><MdCheckCircle className="h-6 w-6 rounded-3xl text-emerald-500 hover:outline outline-emerald-200"/></button>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 w-6  ">
                                <button  type="submit" value="" ><MdCancel className="h-6 w-6 rounded-3xl text-red-500 hover:outline outline-red-200 border-0 "/></button>
                                </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
             </div>
    )}
    </div>
    </div>
  );
};

export default Menu;
