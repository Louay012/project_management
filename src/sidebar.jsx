import React, { useState ,useEffect,useRef} from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { 
  HomeIcon, 
  InboxIcon, 
  UserGroupIcon, 
  StarIcon, 
  FolderIcon ,
  UserCircleIcon
} from "@heroicons/react/outline";
import { IoIosNotifications } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
const Sidebar = () => {
  
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
        const response= await fetch('http://localhost/project_management/src/API/get_projects.php' ,{
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
                console.log(data.data)
                setProjects(data.data);
               
              }
               else {
              setError(data.message || "Failed to fetch Projects.");
  
              }
            
          } catch (err) {
              setError("An error occurred while fetching Projects." );
              
          } 
          
      }
      useEffect(() => {
        fetch_Projects()
      },[])  ;

      const fetchNotifications = async () => {
        try {
          const response = await fetch(
            "http://localhost/project_management/src/API/get_notifications.php",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: 2,
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
        } catch (err) {
          setError("An error occurred while fetching Notifications.");
        }
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
    <div className="h-[100vh] w-56 bg-slate-200  flex flex-col rounded fixed left-0 top-0 bottom-0 ">
      {/* Logo */}
      <div className="px-6 py-4 border-b">
        <h1 className="text-lg font-bold text-gray-800">TaskFlow</h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <ul className="mt-4 space-y-2 px-4">
          <li>
            <Link
              to="/schedule"
              
              className="flex items-center gap-3 p-2 text-gray-700 cursor-pointer hover:bg-slate-300 rounded-md no-underline"
            >
              <HomeIcon className="w-6 h-6" />
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
                <FolderIcon className="w-6 h-6" />
                <span>{p.project_title}</span>
              </Link>
            </li>)}
            
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t">
        <div className="flex items-center space-x-3">
          <UserCircleIcon className=""></UserCircleIcon>
          <div>
            <p className="text-sm font-medium text-gray-800">user</p>
            <p className="text-xs text-gray-500">user@gmail.com</p>
          </div>
        </div>
      </div>
      
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
