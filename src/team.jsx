import React, { useState,useContext,useEffect ,useRef} from "react";
//import { UserContext } from './UserContext';
import { Bar  } from 'react-chartjs-2';
import { useParams } from "react-router-dom";
import Sidebar from "./sidebar";
import { UserContext } from './UserContext';
import { MdOutlineCreate } from "react-icons/md";
import toast from 'react-hot-toast';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

import { FaRegUser } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineFileSearch } from "react-icons/ai";
import { useLocation } from 'react-router-dom';
import { RiTimerFlashFill } from "react-icons/ri";
ChartJS.register(ArcElement, Tooltip, Legend, Title);
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>

const Team= () => {


   const [team, setTeam] = useState(null);
   const { team_id } = useParams();
   console.log(team)
   const { userDetails } = useContext(UserContext);
     const [error, setError] = useState(null);
         const [TaskCount, setTaskCount] = useState(null);
          const [loading, setLoading] = useState(true);
          const [avg_sub, setavg_sub] = useState(null);
   const fetch_Team=async () => {
    try{
      
        
      const response= await fetch('http://localhost/project_management/src/API/team_details.php' ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              team_id:team_id
              }),
        })

        const data = await response.json();
      
            if (data.success) {
              

               const users=data.task_count.map((t)=>t.username)
               const total_tasks=data.task_count.map((t)=>t.total_tasks)
               setavg_sub(data.avg_sub[0].avg_days)
               
               setTeam(data.team[0])
               console.log(team)
               setTaskCount({
                labels: users,
                datasets: [
                  {
                    label: 'number of tasks submitted ',
                    data: total_tasks,
                    backgroundColor: ['rgba(2, 50, 150, 0.2)'],
                    borderColor: ['rgba(2, 50, 150, 0.6)'],
                    borderWidth: 1,
                  },
                ],
              });
              setLoading(false)
            }
             else {
            setError(data.message || "Failed to fetch Teams.");
            }
        } catch (err) {
            setError("An error occurred while fetching Teams." );
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
    
  useEffect(() => {
      fetch_Team()
    },[userDetails])  ; 
  
  
  return (
    <div className="w-full h-[100vh] flex p-3 bg-slate-200 gap-2">
        <Sidebar></Sidebar>
        <div className="overflow-auto flex-1 p-6 ml-56 bg-gray-50  h-full rounded-lg shadow-md flex w-full flex-col justify-around gap-4">
        {loading ? 
               (<div className="h-80 w-11/12 md:w-1/2 bg-slate-100 rounded-3xl shadow-md p-4"><h1>loading</h1></div> )
               : ( <div className="flex flex-col h-full justify-around ">
                <div className="flex justify-around items-center gap-8">
               <div className="h-56 w-11/12 md:w-1/2 bg-slate-100 rounded-3xl shadow-md p-4">
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
                        <div className="h-56 w-11/12 md:w-1/3 bg-slate-100 rounded-3xl flex flex-col justify-center items-center shadow-md p-4">
                        <span className="flex items-center gap-3"><RiTimerFlashFill className="w-11 h-11"/> <span className="flex flex-col items-center"><h4>Average submission time :</h4>{avg_sub} days</span></span>
                       
                        </div>
                    </div>
                      
        <table className="min-w-full bg-white table-auto rounded-lg overflow-hidden shadow-sm table-bordered">
        <thead className="text-sm font-semibold text-gray-100 bg-gradient-to-r bg-gray-800 text-left">
          <tr>
          <th className="px-6 py-3 "></th>
            <th className="px-6 py-3 "><span className="flex items-center gap-2"><FaRegUser/>Username</span></th>
            <th className="px-6 py-3 "><span className="flex items-center gap-2"><MdAlternateEmail/>Email</span></th>
            <th className="px-6 py-3 "><span className="flex items-center gap-2"><FaUsersGear/>Role</span></th>
            <th className="px-6 py-3 "><span className="flex items-center gap-2"><MdOutlineCreate/> Added on</span></th>
          </tr>
        </thead>
        <tbody>
          {team.members.map((member) => (
            <tr
              key={member.id}
              className="hover:bg-gray-100 transition-colors duration-200"
            >
              <td className="px-6 py-4 text-sm text-gray-800 w-6  ">
              <input class="form-check-input" type="checkbox" value="" ></input>
                 </td>
              <td className="px-6 py-4 text-sm text-gray-800">{member.username}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{member.email}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{member.role}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{member.added.split(' ')[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      )}





        </div>
    </div>
  );
};

export default Team;
