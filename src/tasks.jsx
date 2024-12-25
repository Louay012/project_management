import React, { useState,useContext,useEffect } from "react";
//import { UserContext } from './UserContext';
import TaskRow from "./taskCard"; // Import TaskRow
// fetch tasks
import Sidebar from "./sidebar";
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>

const Task= () => {
  const [tasks, setTasks] = useState([
    { id: 1, project_title: "Website Redesign", task_title: "Design Landing Page", description: "Create a new design for the homepage", status: "To Do", dead_line: "2024-12-30" },
    { id: 2, project_title: "API Development", task_title: "Implement User Authentication", description: "Create user login and registration endpoints", status: "In Progress", dead_line: "2024-12-25" },
    { id: 3, project_title: "App Update", task_title: "Fix Bugs", description: "Resolve issues found in the recent app update", status: "Completed", dead_line: "2024-12-20" },
  ]);
  //const { userDetails } = useContext(UserContext);
  const { userDetails }=useState({username:'sale7',user_id:2})
  const[username,setUsername]=useState('');
  const [error, setError] = useState(null);

  const fetch_Tasks=async () => {
    try{
      if(userDetails){
        setUsername(userDetails.username);
        
      const response= await fetch('http://localhost/Projet_management/API/tasks.php' ,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
        user_id:userDetails.user_id ,
       }),
})

        const data = await response.json();
      
            if (data.success) {
                setTasks(data.data);
             
            }
             else {
            setError(data.message || "Failed to fetch Tasks.");

            }
          }
        } catch (err) {
            setError("An error occurred while fetching Tasks." );
            
        } 
        
    }
    useEffect(() => {
      fetch_Tasks()
    },[userDetails ])  ; 

  const [selectedTaskId, setSelectedTaskId] = useState(null); // Track selected task
  console.log(selectedTaskId)
  const handleTaskSelect = (taskId) => {
    setSelectedTaskId(selectedTaskId === taskId ? null : taskId);
  };

  return (
    <div className="w-full min-h-screen flex p-2 bg-slate-200 gap-2">
        <Sidebar></Sidebar>
        <div className="flex-1 p-6 bg-gray-50 min-h-screen rounded shadow-md">
          <h1 className="text-3xl font-semibold mb-6">Task Management</h1>

          {/* Task Column Titles */}
          <div
            className="flex bg-slate-600 p-3 rounded-lg shadow-md mb-4"
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
          <div className="space-y-5">
            {tasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                isSelected={selectedTaskId === task.id} // Check if task is selected
                onSelect={handleTaskSelect} // Handle task click
              />
            ))}
          </div>
        </div>
    </div>
  );
};

export default Task;
