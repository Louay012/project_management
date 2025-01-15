
import React,{ useEffect, useState ,useContext,useRef } from "react";
import { FaUpload } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { TbTargetArrow } from "react-icons/tb";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext';
// handle_submit 
const TaskRow = ({ task, isSelected, onSelect, setSelectedTask,setIsMenuVisible,setMenuPosition }) => {
  const navigate = useNavigate();
  const { userDetails } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const[canSelect,setcanSelect]=useState(false);
  
  const messageRef = useRef(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  let statusClass = "";

  if (task.status === "Completed") {
    
    statusClass = "text-green-500";
  } else if (task.status === "In-Progress") {
    statusClass = "text-yellow-500";
    
  } else if(task.status === "Awaiting Approval") {
    statusClass = "text-purple-500";
  }else if(task.status === "Refused") {
    statusClass = "text-red-500";
  }else{
    statusClass = "text-blue-500";
  }
  useEffect(() => {
    if (file) {
      setFileName(file.name)
    }
  }, [file]);
  useEffect(() => {
    if (task.status === "In-Progress" ||task.status === "Refused" ) {
     setcanSelect(true)
    }
  }, [task]);
  const handleSubmit=async (event) => {
    event.preventDefault();
    
    
      const formData = new FormData();
      formData.append('user_id', userDetails.user_id); 
      formData.append('task_id', task.id); 
      formData.append('message', message? message:'');
      formData.append('file', file);
      if(!message && !file){
        setError("At least message or file to submit task")
        return;
    }
    const result = await Swal.fire({
      title: 'Confirm Submission Details',
html: 
  `<div style="text-align: left;">
      <p><strong>File:</strong> ${fileName ? fileName : 'No File Selected'}</p>
      ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
    </div>
  `,
icon: 'info',
showCancelButton: true,
confirmButtonColor: '#3085d6', 
cancelButtonColor: '#d33',
confirmButtonText: 'Yes, Submit!',
cancelButtonText: 'Cancel',
});
  
    if (result.isConfirmed){
      try {
          // Send the POST request
          const response = await fetch('http://localhost/project_management/src/API/manage_task.php', {
              method: 'POST',
              body: formData, 
              
          });
      
      const data=await response.json();
     
      if (data.success) {
        
          Swal.fire('Submitted!',`${data.message}` , 'success');
          navigate(0);
          hideForm();
            
        } else {
        setError(data.message || "Failed to submit task.");

              }
        } catch (err) {
            setError("An error occurred while submitting task.");
     
        }
        
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
      
  const hideForm = () =>{
    onSelect(null)
    setFile(null)
    setMessage(null)
    messageRef.current.value = ""
    setFileName(null)
  }
  
  

  const handleContextMenu = (event, task) => {
    
    event.preventDefault();
    console.log(task)
    setSelectedTask(task); // Set the selected task
    setMenuPosition({ x: event.pageX, y: event.pageY  });
    setIsMenuVisible(true);
  };

  // Hide the menu
  const handleClick = () => {
    
  };  
  return (
    <div>
      {/* Task Row */}
      <div {...(task.status === 'Pending' && { onContextMenu: (event) => handleContextMenu(event, task) })}
        className={`flex p-3 mt-2 mb-2 rounded-lg shadow-sm h-auto 
          ${canSelect && isSelected ? "bg-gray-300" : "bg-gray-100 hover:bg-gray-200"} 
          ${task.status==="Refused" ? "bg-red-100 hover:bg-red-200" :""}
          ${task.status==="Completed" ? "bg-green-100 hover:bg-green-200" :""}
          ${canSelect ? "cursor-pointer" : ""}`}
        onClick={() => onSelect(task.id)} // When clicked, toggle selection
        style={{ display: "grid", gridTemplateColumns: "2fr 2fr 2fr 1fr 2fr 2fr"}}
      >
        <div className="flex flex-col justify-center items-start" >
          <span className="font-medium text-gray-700">{task.project_title}</span>
        </div>

        <div className="flex flex-col justify-center items-start ">
          <span className="font-medium text-gray-700">{task.task_title}</span>
        </div>
        
        <div className="flex flex-col justify-center items-start">
          <span className="text-gray-600">{task.description}</span>
        </div>

        <div className="flex flex-col justify-center items-start">
        <span className={`px-3 py-1  font-medium  ${
                task.priority === "high"
                        ? "text-red-500 "
                        : task.priority === "medium"
                        ? "text-yellow-500 "
                        
                        : "text-blue-500 "
              }`}> {task.priority}</span>
        </div>
        
        

        <div className="flex flex-col justify-center items-start ">
          <span className="font-medium text-gray-700 flex items-center gap-2"><SlCalender></SlCalender>{task.deadline}</span>
        </div>
     
      <div className="flex flex-col justify-center items-start">
          <span className={`font-medium ${statusClass}`}>
            {task.status}
          </span>
        </div>          
        </div>
      {isSelected && canSelect && (
        <div className="bg-white p-3  rounded-lg shadow-md flex justify-around">
          <div className="">
            <h2 className="text-2xl font-semibold text-gray-700">Task: {task.task_title}</h2>
            <p><strong>Project:</strong> {task.project_title}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p className="flex items-center gap-2"><strong>DeadLine : </strong> <TbTargetArrow></TbTargetArrow> {task.deadline}</p>
            {task.status === "Refused" && <p className="text-red-600"><strong>Manager Review-Message: </strong>{task.review}</p>}
            <p className="flex items-center justify-around gap-2"><strong>Upload your work here :</strong>
              <div className=""> 
                          <label className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600
                          transition flex items-center justify-center gap-2"  
                          htmlFor="file-upload"><FaUpload></FaUpload>Upload File</label>
                          <input 
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            className=" hidden"
                          />
                         
                        </div ></p>
                        {fileName && (
            <p className="mt-2 text-gray-700"><strong>Selected File:</strong> {fileName}</p>)} 
          </div>
          <div className="flex flex-col items-center ">
                <div  className="  flex flex-col justify-around h-full">
                <div className="relative w-full h-full flex flex-col gap-2">
                <label
                    className=" text-gray-500 text-sm  "
                  >
                   <strong>Message to your manager :</strong> 
                  </label>
                <textarea ref={messageRef}
                  onChange={(e)=>{setMessage(e.target.value)}}
                  placeholder="Start typing here..."
                  className="w-full h-32 p-4 bg-gray-100 text-gray-600  rounded-md border border-gray-300 focus:outline-none focus:border-slate-500 focus:ring focus:ring-slate-500 transition hover:shadow-md "
                ></textarea>

             
                  
                </div>
            

     
                  <div className="flex justify-end gap-3 ">
                    <button
                      onClick={hideForm} 
                      className="px-4 py-2 bg-gray-300 rounded text-black hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit} 
                      className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700"
                    >
                      Confirm Task
                    </button>
                  </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default TaskRow;
