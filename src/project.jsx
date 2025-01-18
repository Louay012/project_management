import React, { useState,useContext,useEffect ,useRef} from "react";
import { Pie  } from 'react-chartjs-2';
import { useParams, useNavigate  } from "react-router-dom";
import Sidebar from "./sidebar";
import toast from 'react-hot-toast';
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { LuMessageCircleMore } from "react-icons/lu";
import { CgAttachment } from "react-icons/cg";
import { FaFileArrowDown } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineCreate } from "react-icons/md";
import { TbFlagMinus } from "react-icons/tb";
import { TbFlagExclamation } from "react-icons/tb";
import { TbFlagBolt } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { TbTargetArrow } from "react-icons/tb";
import { CgSandClock } from "react-icons/cg";
import { IoAddCircleSharp } from "react-icons/io5";
import { TbFileDescription } from "react-icons/tb";
import { MdOutlineSubtitles } from "react-icons/md";
import { MdLowPriority } from "react-icons/md";
import { RiProgress3Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineFileSearch } from "react-icons/ai";
import { UserContext } from './UserContext';
import { MdDeleteOutline } from "react-icons/md";
import Swal from 'sweetalert2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>

const Project= () => {
  const navigate =useNavigate()
  const { userDetails } = useContext(UserContext);
  const[user_id,setuser_id]=useState(null);
  const formRef = useRef(null);
  const panelRef = useRef(null);
  const [TaskStats, setTaskStats] = useState(null);
  const [ProjectDetails, setProjectDetails] = useState([]);
  const { project_id } = useParams(); 
  const[tasks,setTasks]=useState([]);
  const[members,setMembers]=useState([]);
  const[SubTasks,setSubTasks]=useState([]);
  const[ProjectManagers,setProjectManagers]=useState([]);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  

  


  const handleClickOutside = (event) => {
    if (
      panelRef.current &&
      !panelRef.current.contains(event.target) 
      
    ) {
      handleCloseReviewForm();
    }
  };
  document.addEventListener("mouseup", handleClickOutside);
  const handleReviewTask=(ts)=>{
    setSelectedTask(ts);

  }
  const handleCloseReviewForm = () => {
    setSelectedTask(null);
    setMessage("")
  };

  const[message,setMessage]=useState("");
  const handleApprove=async(status)  =>{
    if (!message){
      setError("the message must not be empty")
      return;
    }
  
    try{
      
      const response=await fetch('http://localhost/project_management/src/API/Approve_task.php',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          task_id:selectedTask.task_id,
          review:message,
          status:status
        })
      })
      
      const data=await response.json();
  
      
      if (data.success) {
        fetch_details()
        toast.success(data.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });      
      } else {
        toast.error(data.message || "Failed to send Review.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      }
      
    } catch (err) {
      setError("An error occurred while sending Review.");
    }
   
    handleCloseReviewForm()
  }

  

 
  const [showAddMember, setShowAddMember] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [taskMember, settaskMember] = useState(1);
  const [taskPriority, setTaskPriority] = useState("Low");
  const [memberEmail, setMemberEmail] = useState("");
  const [role, setRole] = useState("");
  const [MemberDescription, setMemberDescription] = useState("");
  
  
  const hideAddTaskForm=()=>{
    setTaskTitle('')
    setTaskDescription('');
    setTaskDeadline('');
    setTaskPriority('low');
    settaskMember(1)
    setShowAddTask(false);
    formRef.current.reset();
  }
    const showAddTaskForm=()=>{
      setShowAddTask(true);

  }
  const hideAddMemberForm=()=>{
    setShowAddMember(false);
    setRole("");
    setMemberDescription("");
    setMemberEmail("");
    formRef.current.reset();
  }
    const showAddMemberForm=()=>{
      setShowAddMember(true);

  }
  const handleTitleChange = (e) => setTaskTitle(e.target.value);
  const handleDescriptionChange = (e) => setTaskDescription(e.target.value);
  const handleDeadlineChange = (e) => setTaskDeadline(e.target.value);
  const handlePriorityChange = (e) => setTaskPriority(e.target.value);
  const handletaskMemberChange = (e) => settaskMember(e.target.value);
  
  const handleMemberEmailChange = (e) => setMemberEmail(e.target.value);
  const handleroleChange = (e) => setRole(e.target.value);
  const handleMemberDescriptionChange = (e) => setMemberDescription(e.target.value);

  const handlecompleteProject=async()=>{
    const allTasksCompleted = tasks.every(task => task.status === "Completed");
    if (allTasksCompleted){
      const result = await Swal.fire({
        title: 'Confirm Project Completion',
html: 'Do you want to finish this project?',
icon: 'info',
showCancelButton: true,
confirmButtonColor: '#3085d6', 
cancelButtonColor: '#d33',
confirmButtonText: 'Yes!',
cancelButtonText: 'Cancel',
});
    
      if (result.isConfirmed) {
try{
  console.log(taskMember)
  const response=await fetch('http://localhost/project_management/src/API/complete_project.php',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({
 
      project_id:project_id
    })
  })
  
  const data=await response.json();

  
  if (data.success) {
    Swal.fire('Completed!', 'The Project has been completed successfully.', 'success');
    fetch_details()
       
  } else {
    setError(data.message || "Failed to complete Project") 

  }
  
} catch (err) {
  setError("An error occurred while completing project.");
}
  }  
}else{
      setError("All tasks must be completed")
    }
}
  const handleAddTask=async (event) => {
    event.preventDefault();
    const today = new Date().toISOString().split('T')[0]; 
          if (taskDeadline <= today) {
              setError("Date must be after today.");
              return;
          }
          const result = await Swal.fire({
            title: 'Confirm Task Details',
    html: `
      <div style="text-align: left;">
        <p><strong>Title:</strong> ${taskTitle}</p>
        <p><strong>Description:</strong> ${taskDescription}</p>
        <p><strong>Priority:</strong> ${taskPriority}</p>
        <p><strong>Task member:</strong> ${taskMember}</p>
        <p><strong>Deadline:</strong> ${taskDeadline}</p>
    `,
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6', 
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Add It!',
    cancelButtonText: 'Cancel',
  });
        
          if (result.isConfirmed) {
    try{
      console.log(taskMember)
      const response=await fetch('http://localhost/project_management/src/API/add_task.php',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          title:taskTitle,
          description:taskDescription,
          priority:taskPriority,
          user:taskMember,
          deadline:taskDeadline,
          project_id:project_id
        })
      })
      
      const data=await response.json();
  
      
      if (data.success) {
        Swal.fire('Added!', 'The Task has been added successfully.', 'success');
        fetch_details()
       
        hideAddTaskForm()       
      } else {
        setError(data.message || "Failed to add Task.") 
          
      }
      
    } catch (err) {
      setError("An error occurred while adding a Task.");
    }
   
    
  }
}
  const handleAddMember=async (event) => {
    event.preventDefault();
    const result = await Swal.fire({
      title: 'Confirm Invitation Details',
html: `
<div style="text-align: left;">
  <p><strong>Member Email:</strong> ${memberEmail}</p>
  <p><strong>Role:</strong> ${role}</p>
  <p><strong>Role Description:</strong> ${MemberDescription}</p>
`,
icon: 'info',
showCancelButton: true,
confirmButtonColor: '#3085d6', 
cancelButtonColor: '#d33',
confirmButtonText: 'Yes!',
cancelButtonText: 'Cancel',
});
  
    if (result.isConfirmed) {
    try{
      
      const response=await fetch('http://localhost/project_management/src/API/send_invitation.php',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          email:memberEmail,
          role: role,
          sender_id: userDetails.user_id,
          description: MemberDescription,
          team_id:ProjectDetails[0].team_id
        })
      })
      
      const data=await response.json();
  
      
      if (data.success) {
        Swal.fire('', 'The invitation has been sent successfully.', 'success');
        fetch_details()
        
        hideAddMemberForm()      
      } else {
        setError(data.message || "Failed to send invitation.")
        
      }
    
    } catch (err) {
      console.log(err)
      setError("An error occurred while adding a Member.");
    }
      
  }
  }
  const handleDelete=async (m) => {


    try{
      
      const response=await fetch('http://localhost/project_management/src/API/delete_member.php',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            member_id:m.id
          
        })
      })
      
      const data=await response.json();
  
      
      if (data.success) {
        fetch_details()
        toast.success(data.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });      
      } else {
        setError(data.message || "Failed to delete member.")
        
      }
      
    } catch (err) {
      setError("An error occurred while deleting member.");
    }
      
   
  }
  const fetch_details=async () => {
    //setSubTasks([])
    try{
      
      if(userDetails){
      const response= await fetch('http://localhost/project_management/src/API/get_project_details.php' ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                project_id: project_id,
       
              }),
        })
        console.log(project_id)
        const data = await response.json();
      
            if (data.success) {
              console.log(data.details)
              setProjectDetails(data.details);
              setTasks(data.tasks)
              setMembers(data.members)
              setSubTasks(data.Sub_tasks)
              setProjectManagers(data.managers)
              console.log(SubTasks)
              const dataStats=[data.stats[0].completed,data.stats[0].in_progress,data.stats[0].pending,
              data.stats[0].awaiting_approval,data.stats[0].refused];
              setTaskStats({
                labels: ['Completed', 'In Progress', 'Pending','Awaiting Approval','Refused'],
                datasets: [
                  {
                    label: 'number of tasks ',
                    data: dataStats,
                    backgroundColor: ['rgba(76, 175, 80, 0.2)', 'rgba(155, 175, 76, 0.1)',
                       'rgba(62, 90, 167, 0.2)','rgba(219, 71, 244, 0.2)','rgba(244, 71, 122, 0.2)'], // Green, Yellow, Red
                    borderColor: ['rgba(76, 175, 80, 0.6)', 'rgba(155, 175, 76, 0.6)',
                       'rgba(62, 90, 167, 0.6)','rgba(219, 71, 244, 0.6)','rgba(244, 71, 122, 0.6)'],
                    borderWidth: 1,
                  },
                ],
              });
              
            }
             else {
            setError(data.message || "Failed to fetch Project Details.");
        
            }
      }
        } catch (err) {
          
          
            setError("An error occurred while fetching Project Details." );
            
        } 
        
    }
    
    useEffect(() => {
        fetch_details()
    },[project_id,userDetails])  ; 
    
    useEffect(() => {
      console.log(userDetails)
      if(userDetails){
        setuser_id(userDetails.user_id)
      }
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
    

    useEffect(() => {
      console.log(user_id)
      console.log(members)
      if(user_id && members.length>0){
        if (!members.some(member => member.id === user_id)) {
          navigate("/not-authorized");
      }    
    }
  }, [user_id,members]);
          
 
          
          
  return (
    <div className="w-full h-[100vh] flex p-3 bg-slate-200 gap-2">
        <Sidebar></Sidebar>
        <div className="overflow-auto flex-1 p-6 ml-56 bg-gray-50  h-full rounded-lg shadow-md flex w-full flex-col justify-around gap-4">
        {showAddTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Add New Task
            </h2>
            <form ref={formRef} onSubmit={handleAddTask} className="flex flex-col justify-between gap-2">
              <div>
                <label
                  htmlFor="taskTitle"
                  className="block text-lg font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  id="taskTitle"
                  type="text"
                  value={taskTitle}
                  onChange={handleTitleChange}
                  className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600"
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="taskDescription"
                  className="block text-lg font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="taskDescription"
                  value={taskDescription}
                  onChange={handleDescriptionChange}
                  className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600"
                  placeholder="Enter task description"
                  rows="1"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="taskDueDate"
                  className="block text-lg font-medium text-gray-700"
                >
                  Deadline
                </label>
                <input
                  id="taskDueDate"
                  type="date"
                  value={taskDeadline}
                  onChange={handleDeadlineChange}
                  className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="taskPriority"
                  className="block text-lg font-medium text-gray-700"
                >
                  Member
                </label>
                <select
                
                  id="taskPriority"
                  value={taskMember}
                  onChange={handletaskMemberChange}
                  className="block w-full appearance-none bg-gray-50 border-2 border-gray-300 text-gray-700 
                  py-3 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-500"
                  required
                  
                >
                  
                  {members.map((m)=><option key={m.id} value={m.id}>{m.id + " : " + m.username}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="taskPriority"
                  className="block text-lg font-medium text-gray-700"
                >
                  Priority
                </label>
                <select
                  id="taskPriority"
                  value={taskPriority}
                  onChange={handlePriorityChange}
                  className="block w-full appearance-none bg-gray-50 border-2 border-gray-300 text-gray-700 
                  py-3 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-500"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="flex justify-between mt-6">
              <button
                  type="button"
                  onClick={hideAddTaskForm}
                  className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-slate-500 to-slate-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:from-slate-600 hover:to-slate-500"
                >
                  Add Task
                </button>
                
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddMember && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Add New Member
            </h2>
            <form ref={formRef} onSubmit={handleAddMember} className="flex flex-col justify-between gap-2">
              <div>
                <label
                  htmlFor="member_email"
                  className="block text-lg font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="member_email"
                  type="email"
                  value={memberEmail}
                  onChange={handleMemberEmailChange}
                  className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600"
                  placeholder="example@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-lg font-medium text-gray-700"
                >
                  Role
                </label>
                <input
                  id="role"
                  type="text"
                  value={role}
                  onChange={handleroleChange}
                  className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600"
                  placeholder="Enter Member Role"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="memberDescription"
                  className="block text-lg font-medium text-gray-700"
                >
                  Role_Description
                </label>
                <textarea
                  id="memberDescription"
                  value={MemberDescription}
                  onChange={handleMemberDescriptionChange}
                  className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600"
                  placeholder="Enter Role Description"
                  rows="1"
                  required
                />
              </div>
              
              <div className="flex justify-between mt-6">
                
                <button
                  type="button"
                  onClick={hideAddMemberForm}
                  className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-slate-500 to-slate-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:from-slate-600 hover:to-slate-500"
                >
                  invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
        {ProjectDetails[0] && <div className="flex items-center justify-around gap-3 flex-col md:flex-row">
                <div className="bg-gray-50 p-3 border-1 rounded-lg shadow-md flex justify-around w-11/12 md:w-2/5 items-center h-60">
                        <div className="">
                          
                          <p className="text-4xl"><strong>Project:</strong> {ProjectDetails[0].project_title}</p>
                          <p><strong>Description:</strong> {ProjectDetails[0].description}</p>
                          <p><strong>Created at:</strong> {ProjectDetails[0].created_at}</p>
                          <div className="flex justify-center">
                          { ProjectManagers.some((manager) => manager.user_id === user_id) && 
        <button className="btn btn-dark " onClick={handlecompleteProject}><span className="flex items-center gap-2"><IoAddCircleSharp/>Complete Project</span></button>}
                          </div>
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
         <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold text-slate-800 px-4">Project Tasks :</span>   
        { ProjectManagers.some((manager) => manager.user_id === user_id) && 
        <button className="btn btn-dark " onClick={showAddTaskForm}><span className="flex items-center gap-2"><IoAddCircleSharp/>Add Task</span></button>}
       </div>
        {tasks.length>0 ? (
        <table className="w-full border-collapse border border-gray-200 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
           <div className="flex items-center justify-start gap-2"> <MdOutlineSubtitles/> Title </div>
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase  tracking-wider">
            <div className="flex items-center justify-start gap-2"><TbFileDescription/> Description</div>
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            <div className="flex items-center justify-start gap-2"><MdLowPriority/>  Priority</div>
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            <div className="flex items-center justify-start gap-2"><TbTargetArrow/> Deadline</div>
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            <div className="flex items-center justify-start gap-2"><RiProgress3Line/> Status</div>
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
                    : t.status === "Awaiting Approval"
                          ? "bg-purple-500"
                    : "bg-blue-500"
                  }`}
                >
                 {t.status}
                </span>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>):(

        <div className="flex items-center justify-center">
          <strong><span> There are no tasks yet. </span></strong>
      
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold text-slate-800 px-4">Team Members :</span>   
        { ProjectManagers.some((manager) => manager.user_id === user_id) && 
        <button className="btn btn-dark " onClick={showAddMemberForm}><span className="flex items-center gap-2"><IoAddCircleSharp/>Add member</span></button>}
       </div>
      <table className="w-full border-collapse table-responsive border border-gray-200 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            <div className="flex items-center justify-start gap-2"><FaRegUser/> username</div>
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            <div className="flex items-center justify-start gap-2"><MdAlternateEmail/> email</div>
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            <div className="flex items-center justify-start gap-2"><FaUsersGear/> role</div>
            </th>
            { ProjectManagers.some((manager) => manager.user_id === user_id) && 
            <th className="">
            </th>
            }
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
              { ProjectManagers.some((manager) => manager.user_id === user_id) && 
            <td className="py-1 ">
              <div className="flex justify-center items-center">
              <button  type="submit"  onClick={() => {
                                                  
                        handleDelete(m); 
                        }} ><MdDeleteOutline className="h-6 w-6 rounded-3xl text-gray-500  hover:text-red-500"/>
              </button>
              </div>
            </td>
            }
            </tr>
          ))}
        </tbody>
      </table>



      {ProjectManagers.some((manager) => manager.user_id === user_id) &&
      <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold text-slate-800 px-4">Submitted Tasks :</span>   
        
       </div>
       {SubTasks.length >0 ? ( 
        <table className="w-full border-collapse border border-gray-200 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
           <div className="flex items-center justify-start gap-2"> <MdOutlineSubtitles/> Title </div>
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase  tracking-wider">
            <div className="flex items-center justify-start gap-2"><TbFileDescription/> Description</div>
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            <div className="flex items-center justify-start gap-2"><MdLowPriority/>  Priority</div>
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            <div className="flex items-center justify-start gap-2"><TbTargetArrow/> Deadline</div>
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            <div className="flex items-center justify-start gap-2"><RiProgress3Line/> Status</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {SubTasks.map((st) => (
            <tr
              key={st.submission_id}
              
            >
              <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900">
                {st.task_title}
              </td>
              <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900">
                {st.description}
              </td>
              <td  className="px-6 py-4 border border-gray-300 text-sm text-center">
              <span className={`px-3 py-1 rounded-md inline-flex items-center gap-2  text-center font-medium border-1 ${
                    st.priority === "high"
                            ? "text-red-500 border-red-500"
                            : st.priority === "medium"
                            ? "text-yellow-500 border-yellow-500"
                            
                            : "text-blue-500 border-blue-500"
                  }`}>

                {st.priority === "high" && <TbFlagExclamation />}
                {st.priority === "medium" && <TbFlagMinus />}
                {st.priority === "low" && <TbFlagBolt />}
                {st.priority}
                </span>
              </td>
              
              <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900 ">
                <div className="flex items-center gap-2 justify-center "><SlCalender></SlCalender> {st.deadline}</div>
                
              </td>
              <td className="px-6 py-4 border border-gray-300 text-sm text-center">
                <span
                  className={'px-3 py-1 rounded-full text-white text-xs font-medium  '}
                >
                 <button className="btn btn-outline-dark" onClick={()=>handleReviewTask(st)}>
                   <span className="flex items-center gap-2 justify-center"> <AiOutlineFileSearch/> Review </span>
                   </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table> ):(
      
      <div className="flex items-center justify-center">
      <strong><span> There are no tasks to review. </span></strong>
      
     </div>
         
        
      )}
      </div>}
      {SubTasks.length > 0  && (
   
   <div ref={panelRef}
      className={`fixed top-0 right-0 rounded-lg h-screen w-1/3 bg-white border-l border-gray-300 shadow-2xl p-10 z-50 transform transition-transform duration-700 ease-in-out ${
      selectedTask ? "translate-x-0" : "translate-x-full"
    }`}

  > { selectedTask && <div className="flex flex-col justify-around h-full">
          <button
          onClick={handleCloseReviewForm}
          className="absolute top-4 right-8 text-3xl text-gray-500 hover:text-gray-900"
        >
          &times;
        </button>
          <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold "> Review Task:</h2>
            <div className="flex items-center gap-2">
              <label className=" text-sm font-medium flex items-center gap-2"><MdOutlineSubtitles/> Title : </label>
              <span className="text-gray-500"> {selectedTask.task_title}</span>
            </div>
            <div className="flex items-center gap-4">
              <label className=" text-sm font-medium flex items-center gap-2"><TbFileDescription/> Description:</label>
              <textarea
                value={selectedTask.description}
                readOnly
                className="w-full p-2 border rounded"
                rows={1}
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm font-medium"> <RiProgress3Line/>Status :</label>
              <span className="text-purple-500"> {selectedTask.status}</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm font-medium"><MdLowPriority/> Priority :</label>
              <span className={`px-3 py-1  font-medium  ${
                selectedTask.priority === "high"
                        ? "text-red-500 "
                        : selectedTask.priority === "medium"
                        ? "text-yellow-500 "
                        
                        : "text-blue-500 "
              }`}> {selectedTask.priority}</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm font-medium"><TbTargetArrow/> Deadline :</label>
              <span className="text-red-500"> {selectedTask.deadline}</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2  text-sm font-medium"><MdOutlineCreate/> Created at :</label>
              <span className="text-green-500"> {selectedTask.created_at}</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm font-medium"><FaRegUser/>Username  :</label>
              <span className="text-gray-500"> {selectedTask.username}</span>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm font-medium"><MdAlternateEmail/>Email : </label>
              <span className="text-gray-500"> {selectedTask.email}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2  text-sm font-medium"><LuMessageCircleMore/> Message : </span>
              <span className="text-gray-500"> {selectedTask.message}</span>
            </div>
            {selectedTask?.file_path && 
            <div className="flex items-center gap-8 w-full">
              <span className="flex items-center gap-2 text-sm font-medium"><CgAttachment /> Attachement : </span>
              <a
                  href={`http://localhost/project_management/src/API/download.php?file=${encodeURIComponent(selectedTask.file_path)}`}
                  target="_blank"
                  className="text-blue-500 mt-2"
                >
                  <FaFileArrowDown className="h-10 w-10"/>
                </a>
              
            </div>}
            
          </div>
          <div className="flex flex-col gap-4 " >
            <div className="flex flex-col justify-start gap-2">
          <label className=" text-gray-500 text-base " >
                   <strong >Response :</strong> 
          </label>
          
         
                
                <textarea
                   
                  onChange={(e)=>setMessage(e.target.value)}
                  placeholder="Write your Comments here..."
                  className=" w-11/12 h-12 p-2 bg-gray-100 text-gray-600  rounded-md border border-gray-300 focus:outline-none focus:border-slate-500 focus:ring focus:ring-slate-500 transition hover:shadow-md "
                ></textarea>
                
              </div>
          <div className="flex items-center justify-around">
              <button
                type="button"
                onClick={() =>handleApprove("Refused")}
                className="btn btn-danger"
              >
              <span className="flex items-center gap-2"> <MdCancel/> Refuse</span>
              </button>
              <button
                type="button"
                onClick={() =>handleApprove("Completed")}
                className="btn btn-success "
              > <span className="flex items-center gap-2"><FaCheckCircle /> Approve</span>
               
              </button>
            </div>
            </div>
    </div>
   
    }
  </div>
  
)}


    </div>
    </div>
  );
};

export default Project;
