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

   

  return (
    <div className="max-w-screen min-h-screen flex p-3 bg-slate-200 gap-2">
        <Sidebar></Sidebar>
       <div className="overflow-x-auto flex-1 p-6 bg-gray-50 min-h-screen h-full rounded-lg shadow-md flex w-full flex-col gap-4">
       <h1 className="text-2xl font-bold mb-4">Task Scheduler</h1>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: '50px' }}
            selectable
            formats={{
              dayFormat: (date, culture, localizer) =>
                localizer.format(date, 'dddd', culture), // Show only the day of the week (e.g., "Monday")
              timeGutterFormat: () => '', // Hide the time gutter completely
            }}
            showMultiDayTimes={false}
            popup 
        />

       </div>
    </div>
  );
};

export default Schedule;
