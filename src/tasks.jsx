import React, { useState,useContext,useEffect } from "react";
//import { UserContext } from './UserContext';
import TaskRow from "./taskCard"; 
import toast from 'react-hot-toast';
import Sidebar from "./sidebar";
import { FaTasks } from "react-icons/fa";
import { MdOutlineNotStarted } from "react-icons/md";
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>

const Task= () => {
  const [tasks, setTasks] = useState([]);
  //const { userDetails } = useContext(UserContext);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); 
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const[username,setUsername]=useState('');

  const [error, setError] = useState(null);

  const fetch_Tasks=async () => {
    try{
      
        
      const response= await fetch('http://localhost/project_management/src/API/tasks.php' ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                user_id:1
              }),
        })

        const data = await response.json();
      
            if (data.success) {

                setTasks(data.tasks);
             
            }
             else {
            setError(data.message || "Failed to fetch Tasks.");

            }
          
        } catch (err) {
            setError("An error occurred while fetching Tasks." );
            
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
      fetch_Tasks()
    },[])  ; 
  
  const [selectedTaskId, setSelectedTaskId] = useState(null); // Track selected task
  console.log(selectedTaskId)
  const handleTaskSelect = (taskId) => {
    setSelectedTaskId(selectedTaskId === taskId ? null : taskId);
  };

  return (
    <div className="w-full min-h-screen  flex p-3 bg-slate-200 gap-2">
        <Sidebar></Sidebar>
        <div className="flex-1 p-6 bg-gray-50 min-h-screen h-full rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2"> <FaTasks></FaTasks> Task Management</h1>

          {/* Task Column Titles */}
          <div
            className="flex bg-slate-400 p-3 rounded-lg shadow-md mb-4"
            style={{ display: "grid", gridTemplateColumns: "2fr 2fr 3fr 1fr 1fr " }}
          >
            <div className="flex flex-col justify-center items-start"  >
              <span className="font-bold text-gray-100">Project </span>
            </div>

            <div className="flex flex-col justify-center items-start"  >
              <span className="font-bold text-gray-100">Task Name</span>
            </div>

            <div className="flex flex-col justify-center items-start"  >
              <span className="font-bold text-gray-100">Description</span>
            </div>

            <div className="flex flex-col justify-center items-start"  >
              <span className="font-bold text-gray-50">Status</span>
            </div>

            <div className="flex flex-col justify-center items-start"  >
              <span className="font-bold text-gray-100">Due Date</span>
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-5 " >
            {tasks && tasks.map((task) => (
              <TaskRow  
                key={task.id}
                task={task}
                isSelected={selectedTaskId === task.id} // Check if task is selected
                onSelect={handleTaskSelect} // Handle task click
                setIsMenuVisible={setIsMenuVisible}
                setSelectedTask={setSelectedTask}
                setMenuPosition={setMenuPosition}
              />
            ))}
           {isMenuVisible && (
                   <div
                     className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-md list-none"
                     style={{ top: menuPosition.y, left: menuPosition.x }}
                   >
                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-2">
                       <span className="text-green-500"><MdOutlineNotStarted></MdOutlineNotStarted></span> Start task
                     </li>
                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                       Edit Task
                     </li>
                     <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                       Delete Task
                     </li>
                   </div>
                 )}   
          </div>
        </div>
    </div>
  );
};

export default Task;
