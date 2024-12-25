
import React,{ useEffect, useState ,useContext,useRef } from "react";
import { FaUpload, FaRegComment } from "react-icons/fa";
import toast from 'react-hot-toast';
// handle_submit 
const TaskRow = ({ task, isSelected, onSelect }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);


   //const { userDetails } = useContext(UserContext);
    const { userDetails }=useState({username:'sale7',user_id:2})
  const messageRef = useRef(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  let statusClass = "";

  if (task.status === "Completed") {
    statusClass = "text-green-500";
  } else if (task.status === "In Progress") {
    statusClass = "text-yellow-500";
  } else if (task.status === "To Do") {
    statusClass = "text-red-500";
  }

  const handleSubmit=async (event) => {
    event.preventDefault();
    
    try{
          const response=await fetch('http://localhost/TABBE3NI/API/manage_task.php',{
            method:'POST',
            headers:{
              'Content-Type': 'application/json',
          },
            body:JSON.stringify({
              user_id: userDetails.user_id,
              task_id: task.task_id,       
            })
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
          <span className="font-medium text-gray-700">{task.dead_line}</span>
        </div>
      </div>

   
      {isSelected && (
        <div className="bg-white p-3 -mt-0 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Task: {task.task_title}</h2>
          <p><strong>Project:</strong> {task.project_title}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Due Date:</strong> {task.dead_line}</p>

          <div  className=" mt-2 mb-3 flex justify-around items-center">
         
            <div className="w-1/5"> 
              <label className="block text-sm">Upload File :</label>
              <input 
           
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 cursor-pointer border rounded"
              />
            </div >

         
            <div className="w-2/5">
              <label className="block text-sm">Message to Manager :</label>
              <textarea
              ref={messageRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded"

                rows="2"
                placeholder="Enter your message"
              ></textarea>
            </div>
          </div>

     
          <div className="flex justify-end gap-3 ">
            <button
              onClick={hideForm} 
              className="px-4 py-2 bg-gray-300 rounded text-black"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit} 
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Confirm Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskRow;
