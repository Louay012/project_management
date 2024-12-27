import React, { useState,useContext,useEffect } from "react";
//import { UserContext } from './UserContext';

import Sidebar from "./sidebar";
import { FaTasks } from "react-icons/fa";
import { TbFlagMinus } from "react-icons/tb";
import { TbFlagExclamation } from "react-icons/tb";
import { TbFlagBolt } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { TbTargetArrow } from "react-icons/tb";
import { CgSandClock } from "react-icons/cg";
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment);
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>

const Schedule= () => {

  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);


  const fetch_details=async () => {
    try{
      
        
      const response= await fetch('http://localhost/project_management/src/API/tasks.php' ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                user_id:1,

              }),
        })

        const data = await response.json();
      
            if (data.success) {
              setTasks(data.tasks)
              console.log(tasks)
              setEvents(tasks.map((t)=>({
                title: t.task_title + '  ( '+t.project_title + ' ) ' || "Unnamed Task", 
                start: new Date(t.created_at.split("T")[0]), 
                end: new Date(t.deadline ), 
              })))
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
    },[tasks])  ; 

    const CustomTimeHeader = () => {
      return null; // Return nothing to effectively hide the time column
    };

  return (
    <div className="w-full h-[100vh] flex p-3 bg-slate-200 gap-2">
        <Sidebar></Sidebar>
       <div className="overflow-auto flex-1 h-full w-full p-6 ml-56 bg-gray-50   rounded-lg shadow-md flex flex-col   gap-4">
       <h1 className="text-3xl font-bold text-center">Task Scheduler</h1>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: '50px' }}
            selectable
            views={['month', 'agenda','week']}
            formats={{
              dateFormat: 'dd MMM',  // This will display only the day and month
              dayFormat: 'ddd, MMM '  // Display only the day and month on days
            }}
            showMultiDayTimes={false}
            popup 
            components={{
              timeSlot: null, // Use custom time component
            }}
        />

       </div>
    </div>
  );
};

export default Schedule;
