
import React,{ useEffect, useState ,useContext,useRef } from "react";
import { FaUpload } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { TbTargetArrow } from "react-icons/tb";

import toast from 'react-hot-toast';
// handle_submit 
const TaskRow = ({ task, isSelected, onSelect }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);


   //const { userDetails } = useContext(UserContext);
   
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
  } else if (task.status === "Pending") {
    statusClass = "text-red-500";
  }

  const handleSubmit=async (event) => {
    event.preventDefault();
    
    
      const formData = new FormData();
      formData.append('user_id', 1); 
      formData.append('task_id', task.id); 
      formData.append('message', message);
      formData.append('file', file);
    console.log(message)
      try {
          // Send the POST request
          const response = await fetch('http://localhost/project_management/src/API/manage_task.php', {
              method: 'POST',
              body: formData, 
          });
      
      const data=await response.json();
     
      if (data.success) {
        
          hideForm();
          //fetch_Categories();
            toast.success(data.message, {
            position: 'top-center',
            autoClose: 3000, 
            hideProgressBar: true,
            closeOnClick: true,});
            
        } else {
        setError(data.message || "Failed to submit task.");

              }
        } catch (err) {
            setError("An error occurred while submitting task.");
          console.log(err)
        }
        
        }
    

  const hideForm = () =>{
    onSelect(null)
    setFile(null)
    setMessage(null)
    messageRef.current.value = ""
    
  }
  return (
    <div>
      {/* Task Row */}
      <div
        className={`flex p-3 mt-2 mb-2   rounded-lg shadow-sm cursor-pointer h-auto     ${
          isSelected? "bg-gray-300": "bg-gray-100 hover:bg-gray-200"
        }`}
        onClick={() => onSelect(task.id)} // When clicked, toggle selection
        style={{ display: "grid", gridTemplateColumns: "2fr 2fr 3fr 1fr 1fr"}}
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
          <span className={`font-medium ${statusClass}`}>
            {task.status}
          </span>
        </div>

        <div className="flex flex-col justify-center items-start ">
          <span className="font-medium text-gray-700 flex items-center gap-2"><SlCalender></SlCalender>{task.deadline}</span>
        </div>
      </div>

   
      {isSelected && (
        <div className="bg-white p-3  rounded-lg shadow-md flex justify-around">
          <div className="">
            <h2 className="text-2xl font-semibold text-gray-700">Task: {task.task_title}</h2>
            <p><strong>Project:</strong> {task.project_title}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p className="flex items-center gap-2"><strong>DeadLine : </strong> <TbTargetArrow></TbTargetArrow> {task.deadline}</p>
            <p className="flex items-center justify-around gap-2"><strong>Upload your work here :</strong><div className=""> 
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
