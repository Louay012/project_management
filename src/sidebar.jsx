import React, { useState ,useEffect,useRef,useContext} from "react";
import { Link , useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { 
  HomeIcon, 
  InboxIcon, 
  UserGroupIcon, 
  StarIcon, 
  FolderIcon ,
  UserCircleIcon
} from "@heroicons/react/outline";
import { TbLogout2 } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { UserContext } from './UserContext';

import { GrSchedulePlay } from "react-icons/gr";
import { TbLayoutDashboard } from "react-icons/tb";
import { IoIosAddCircleOutline } from "react-icons/io";

const Sidebar = () => {
  const navigate = useNavigate(); 
  const[showCreateProject,setShowCreateProject]=useState(false)
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectDeadline, setProjectDeadline] = useState('');
  const [Teamname, setTeamname] = useState('');
  const {userDetails, setUserDetails } = useContext(UserContext);
  const [user_id, setuser_id] = useState('');
  
  useEffect(() => {
        if(userDetails){
          setuser_id(userDetails.user_id)
        }
    },[userDetails])  ; 
 
  const hideAddProjectForm=()=>{
    setProjectTitle('')
    setProjectDescription('');
    setProjectDeadline('');
    setTeamname("");
    setShowCreateProject(false);
 
  }
  const showAddProjectForm=()=>{
    setShowCreateProject(true);
}
  const handleTitleChange = (e) => setProjectTitle(e.target.value);
  const handleDescriptionChange = (e) => setProjectDescription(e.target.value);
  const handleDeadlineChange = (e) => setProjectDeadline(e.target.value);
  const handleTeamnameChange = (e) => setTeamname(e.target.value);
  const handleAddProject=async (event) => {
    event.preventDefault();
    try{
      const response=await fetch('http://localhost/project_management/src/API/add_project.php',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          title: projectTitle,
          description:projectDescription,
          deadline:projectDeadline,
          teamname: Teamname,
          manager: user_id
        })
      })
      
      const data=await response.json();
  
      
      if (data.success) {
        const project_id = data.project_id
        fetch_Projects()
        navigate(`/project/${project_id}`)
      } else {
        toast.error(data.message || "Failed to create Project.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });
      }
      
    } catch (err) {
      console.log(err)
      setError("An error occurred while creating a Project.");
    }
   
    hideAddProjectForm() 
  }

  const[username, setUsername]=useState('')
  const[email, setEmail]=useState('')

  useEffect(() => {
    if(userDetails){
    setUsername(userDetails.username)
    setEmail(userDetails.email)
    }
  },[userDetails])  ;



  const [projects,setProjects]=useState([]);
  const [error, setError] = useState(null);
 

  const panelRef = useRef(null);
  const [tasks,setTasks]=useState([]);
  const [selfProjects,setSelfProjects]=useState([]);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const inboxButtonRef = useRef(null);
  
  const handleClickOutside = (event) => {
    if (
      panelRef.current &&
      !panelRef.current.contains(event.target) &&
      !inboxButtonRef.current.contains(event.target)
    ) {
      setIsInboxOpen(false);
    }
  };
  const toggleInbox = () => {
    setIsInboxOpen(!isInboxOpen);
    if (!isInboxOpen) {
      fetchNotifications(); // Fetch notifications when the panel opens
    }
  };
  document.addEventListener("mouseup", handleClickOutside);
   
  
  const fetch_Projects=async () => {
    try{ 
      if(userDetails){ 
        const response= await fetch('http://localhost/project_management/src/API/get_projects.php' ,{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                  user_id:userDetails.user_id
                }),
          })
  
          const data = await response.json();
        
              if (data.success) {
                console.log(data.data)
                setProjects(data.data);
               
              }
               else {
              setError(data.message || "Failed to fetch Projects.");
  
              }
            }  
          } catch (err) {
              setError("An error occurred while fetching Projects." );
              
          } 
          
      }
      useEffect(() => {
        fetch_Projects()
      },[userDetails])  ;

      const fetchNotifications = async () => {
        try {
          if(userDetails){
          const response = await fetch(
            "http://localhost/project_management/src/API/get_notifications.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: userDetails.user_id,
              }),
            }
          );
    
          const data = await response.json();
    
          if (data.success) {
            setSelfProjects(data.data1);
            setTasks(data.data2)
          } else {
            setError(data.message || "Failed to fetch Notifications.");
          }
        }
        } catch (err) {
          setError("An error occurred while fetching Notifications.");
        }
      };

      const handleLogout = () => {
    
        setUserDetails(null);
    
        localStorage.removeItem('userDetails'); 
    
        navigate('/'); 
      };

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
    
    
    <div className="h-[100vh] w-48   flex flex-col rounded fixed left-0 top-0 bottom-0 ">
      {showCreateProject &&(
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Create New Project
          </h2>
          <form  onSubmit={handleAddProject} className="flex flex-col justify-between gap-2">
            <div>
              <label
                htmlFor="projectTitle"
                className="block text-lg font-medium text-gray-700"
              >
                Title
              </label>
              <input
                id="projectTitle"
                type="text"
                value={projectTitle}
                onChange={handleTitleChange}
                className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600"
                placeholder="Enter project title"
                required
              />
            </div>

            <div>
              <label
                htmlFor="projectDescription"
                className="block text-lg font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="projectDescription"
                value={projectDescription}
                onChange={handleDescriptionChange}
                className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600"
                placeholder="Enter project description"
                rows="1"
                required
              />
            </div>

            <div>
              <label
                htmlFor="projectDueDate"
                className="block text-lg font-medium text-gray-700"
              >
                Deadline
              </label>
              <input
                id="projectDueDate"
                type="date"
                value={projectDeadline}
                onChange={handleDeadlineChange}
                className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600"
                required
              />
            </div>
            <div>
              <label
                htmlFor="Teamname"
                className="block text-lg font-medium text-gray-700"
              >
                Team Name
              </label>
              <input
                id="Teamname"
                type="text"
                value={Teamname}
                onChange={handleTeamnameChange}
                className="mt-2 p-3 w-full border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-600"
                placeholder="Enter the Team name"
                required
              />
            </div>
            
            <div className="flex justify-between mt-6">
            <button
                type="button"
                onClick={hideAddProjectForm}
                className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-slate-500 to-slate-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:from-slate-600 hover:to-slate-500"
              >
                Create
              </button>
              
            </div>
          </form>
        </div>
      </div>)}
      {/* Logo */}
      <div className="px-6 py-4 border-b">
        <h1 className="text-lg font-bold text-gray-800">TaskFlow</h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <ul className="mt-4 space-y-2  flex flex-col">
        <li>
            <Link
              to="/menu"
              
              className="flex items-center gap-3 p-2 text-gray-700 cursor-pointer hover:bg-slate-300 rounded-md no-underline"
            >
              <TbLayoutDashboard className="w-6 h-6" />
              <span>Menu</span>
            </Link>
          </li>
          <li>
            <Link
              to="/schedule"
              
              className="flex items-center gap-3 p-2 text-gray-700 cursor-pointer hover:bg-slate-300 rounded-md no-underline"
            >
              <GrSchedulePlay className="w-6 h-6" />
              <span>Schedule</span>
            </Link>
          </li>
          <li>
            <div
              ref={inboxButtonRef}
              onClick={toggleInbox}
              className="flex items-center gap-3 p-2 text-gray-700 cursor-pointer hover:bg-slate-300 no-underline rounded-md"
            >
              <InboxIcon className="w-6 h-6" />
              <span>Inbox</span>
            </div>
          </li>
          <li>
            <Link
              to="/teams"
              className="flex items-center gap-3 p-2 text-gray-700 hover:bg-slate-300 no-underline rounded-md"
            >
              <UserGroupIcon className="w-6 h-6" />
              <span>Teams</span>
            </Link>
          </li>
          <li>
            <Link
              to="/tasks"
              className="flex items-center gap-3 p-2 text-gray-700 hover:bg-slate-300 no-underline rounded-md"
            >
              <FaTasks className="w-6 h-6" />
              <span>Tasks</span>
            </Link>
          </li>
          
        </ul>

        {/* Project Section */}
        <div className="mt-6 px-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Projects</h2>
          <ul className="mt-2 ">
            {projects.map((p)=><li key={p.id }>
              <Link
                to={`/project/${p.id}`}
                className="flex items-center gap-3 p-2 text-gray-700 hover:bg-slate-300 no-underline rounded-md"
              >
                <FolderIcon className="w-5 h-5" />
                <span>{p.project_title}</span>
              </Link>
            </li>)}
            <li >
              <div className="flex items-center gap-3 p-2 text-gray-700 hover:bg-slate-300 no-underline rounded-md cursor-pointer" onClick={showAddProjectForm}>
                
              <IoIosAddCircleOutline className="w-6 h-6"/>
              <span>Create Project</span>
            </div>
            </li>
          </ul>
        </div>
      </div>

      <button className=" flex items-center justify-center gap-2 w-full text-black mb-6 hover:text-purple-400" 
        onClick={handleLogout}>
          <i><TbLogout2 className='text-inherit'/></i> 
          <span className="hidden md:block text-inherit">Logout</span>
          </button>

      {/* Footer */}
     {/*<div className="px-6 py-4 border-t">
        <div className="flex items-center space-x-3">
          <UserCircleIcon className=""></UserCircleIcon>
          <div>
            <p className="text-sm font-medium text-gray-800">{username}</p>
            <p className="text-xs text-gray-500">{email}</p>
          </div>
        </div>
      </div>*/}
      
      <div ref={panelRef}
  className={`fixed top-0 left-0 rounded-lg h-screen w-60 bg-white border-l border-gray-300 shadow-2xl px-2 py-5 z-50 transform transition-transform duration-700 ease-in-out ${
    isInboxOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2"><IoIosNotifications></IoIosNotifications> Notifications</h2>
  <hr className="my-3" />
  <div className="overflow-y-auto h-full">
    {selfProjects.length > 0 || tasks.length > 0 ? (
      <ul className="">
        {selfProjects.length > 0 &&
          selfProjects.map((project) => (
            <li
              onClick={toggleInbox}
              key={project.id}
              className="hover:bg-slate-100 cursor-pointer p-2"
            >
              <Link
                to={`/project/${project.id}`}
                className="text-sm text-gray-600 no-underline"
              >
                The Project <strong>{project.project_title}</strong> has Tasks to
                review
              </Link>
            </li>
          ))}
        {tasks.length > 0 && (
          <li
            onClick={toggleInbox}
            className="hover:bg-slate-100 cursor-pointer p-2"
          >
            <Link
              to={"/tasks"}
              className="text-sm text-gray-600 no-underline"
            >
              <strong>There are Tasks to do</strong>
            </Link>
          </li>
        )}
      </ul>
    ) : (
      <p className="text-sm text-gray-500">No Notifications.</p>
    )}
  </div>
</div>

    </div>


  );
};

export default Sidebar;
