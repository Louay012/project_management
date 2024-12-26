import React, { useState,useContext,useEffect } from "react";
//import { UserContext } from './UserContext';
import { Pie  } from 'react-chartjs-2';
import { useParams } from "react-router-dom";
import Sidebar from "./sidebar";
import { FaTasks } from "react-icons/fa";
import { TbFlagMinus } from "react-icons/tb";
import { TbFlagExclamation } from "react-icons/tb";
import { TbFlagBolt } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { TbTargetArrow } from "react-icons/tb";
import { CgSandClock } from "react-icons/cg";
ChartJS.register(ArcElement, Tooltip, Legend, Title);
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>

const Project= () => {
    const [TaskStats, setTaskStats] = useState(null);
  const [ProjectDetails, setProjectDetails] = useState([]);
  const { project_id } = useParams(); 
  const[tasks,setTasks]=useState([]);
  const[members,setMembers]=useState([]);
  const [error, setError] = useState(null);
  console.log(project_id)
  const fetch_details=async () => {
    try{
      
        
      const response= await fetch('http://localhost/project_management/src/API/get_project_details.php' ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                project_id:project_id,

              }),
        })
        console.log(project_id)
        const data = await response.json();
      
            if (data.success) {
              console.log(data.tasks)
              setProjectDetails(data.details);
              setTasks(data.tasks)
              setMembers(data.members)
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
              
            }
             else {
            setError(data.message || "Failed to fetch Tasks.");

            }
          
        } catch (err) {
            setError("An error occurred while fetching Tasks." );
            
        } 
        
    }
    useEffect(() => {
        fetch_details()
    },[project_id ])  ; 

   

  return (
    <div className="max-w-screen min-h-screen flex p-3 bg-slate-200 gap-2">
        <Sidebar></Sidebar>
        <div className="overflow-x-auto flex-1 p-6 bg-gray-50 min-h-screen h-full rounded-lg shadow-md flex w-full flex-col justify-around gap-4">
        {ProjectDetails[0] && <div className="flex items-center justify-around gap-3 flex-col md:flex-row">
                <div className="bg-gray-50 p-3 border-1 rounded-lg shadow-md flex justify-around w-11/12 md:w-2/5 items-center h-60">
                        <div className="">
                          
                          <p className="text-4xl"><strong>Project:</strong> {ProjectDetails[0].project_title}</p>
                          <p><strong>Description:</strong> {ProjectDetails[0].description}</p>
                          <p><strong>Created at:</strong> {ProjectDetails[0].created_at}</p>
                          
                          
                        </div>
                </div>
                <div className="bg-gray-50 p-3 border-1 rounded-lg shadow-md flex justify-around w-11/12 md:w-2/5 items-center h-60"> 
                      <div>
                          <p ><strong>Status:</strong> <span className={`   font-medium ${
                          ProjectDetails[0].status ===  "Completed"
                          ? "text-green-500"
                          : ProjectDetails[0].status === "In-Progress"
                          ? "text-yellow-500"
                          
                          : "text-blue-500"
                        }`}>{ProjectDetails[0].status}</span> </p>
                          <p className="flex items-center gap-2"><strong>DeadLine : </strong> <span className="text-red-500 flex items-center gap-2"><TbTargetArrow></TbTargetArrow> {ProjectDetails[0].deadline}</span> </p>
                          <p className="flex items-center gap-2"><strong>Days left : </strong> <span className="text-slate-500">{ProjectDetails[0].days_until_deadline} </span> <CgSandClock className="text-slate-500"></CgSandClock></p>
                      </div>    
                </div>
                  
                    <div className="bg-gray-50 p-3 border-1 rounded-lg shadow-md flex justify-center w-11/12 md:w-2/5 items-center h-60">
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
         }
         <span className="text-2xl font-semibold text-slate-800 px-4">Project Tasks :</span> 
        <table className="w-full border-collapse border border-gray-200 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Priority
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
               Deadline
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr
              key={t.id}
              
            >
              <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900">
                {t.task_title}
              </td>
              <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900">
                {t.description}
              </td>
              <td  className="px-6 py-4 border border-gray-300 text-sm text-center">
              <span className={`px-3 py-1 rounded-md inline-flex items-center gap-2  text-center font-medium border-1 ${
                    t.priority === "high"
                            ? "text-red-500 border-red-500"
                            : t.priority === "medium"
                            ? "text-yellow-500 border-yellow-500"
                            
                            : "text-blue-500 border-blue-500"
                  }`}>

                {t.priority === "high" && <TbFlagExclamation />}
                {t.priority === "medium" && <TbFlagMinus />}
                {t.priority === "low" && <TbFlagBolt />}
                {t.priority}
                </span>
              </td>
              
              <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900 ">
                <div className="flex items-center gap-2 justify-center "><SlCalender></SlCalender> {t.deadline}</div>
               
              </td>
              <td className="px-6 py-4 border border-gray-300 text-sm text-center">
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                    t.status ===  "Completed"
                    ? "bg-green-500"
                    : t.status === "In-Progress"
                    ? "bg-yellow-500"
                    
                    : "bg-blue-500"
                  }`}
                >
                 {t.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       <span className="text-2xl font-semibold text-slate-800 px-4">Team Members :</span>   
      <table className="w-full border-collapse table-responsive border border-gray-200 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            username
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            email
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            role
            </th>
          
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr
              key={m.id}
              
            >
              <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900">
                {m.username}
              </td>
              <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900">
                {m.email}
              </td>
              <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900">
                {m.role}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Project;
