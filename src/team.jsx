import React, { useState,useContext,useEffect ,useRef} from "react";
//import { UserContext } from './UserContext';
import { Pie  } from 'react-chartjs-2';
import { useParams } from "react-router-dom";
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
import { useLocation } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend, Title);
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>

const Team= () => {
  const formRef = useRef(null);
  const panelRef = useRef(null);
    const [TaskStats, setTaskStats] = useState(null);
  const [ProjectDetails, setProjectDetails] = useState([]);
  const { team_id } = useParams(); 
   const [error, setError] = useState(null);
   const location=useLocation();
   const team=location.state?.team
   console.log(team)

  return (
    <div className="w-full h-[100vh] flex p-3 bg-slate-200 gap-2">
        <Sidebar></Sidebar>
        <div className="overflow-auto flex-1 p-6 ml-56 bg-gray-50  h-full rounded-lg shadow-md flex w-full flex-col justify-around gap-4">

        <table className="min-w-full bg-white table-auto rounded-lg overflow-hidden shadow-sm table-bordered">
        <thead className="text-sm font-semibold text-gray-100 bg-gradient-to-r bg-gray-800 text-left">
          <tr>
          <th className="px-6 py-3 "></th>
            <th className="px-6 py-3 "><span className="flex items-center gap-2"><FaRegUser/>Username</span></th>
            <th className="px-6 py-3 "><span className="flex items-center gap-2"><MdAlternateEmail/>Email</span></th>
            <th className="px-6 py-3 "><span className="flex items-center gap-2"><FaUsersGear/>Role</span></th>
            <th className="px-6 py-3 "><span className="flex items-center gap-2"><MdOutlineCreate/> Added on</span></th>
          </tr>
        </thead>
        <tbody>
          {team.members.map((member) => (
            <tr
              key={member.id}
              className="hover:bg-gray-100 transition-colors duration-200"
            >
              <td className="px-6 py-4 text-sm text-gray-800 w-6  ">
              <input class="form-check-input" type="checkbox" value="" ></input>
                 </td>
              <td className="px-6 py-4 text-sm text-gray-800">{member.username}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{member.email}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{member.role}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{member.added.split(' ')[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>






        </div>
    </div>
  );
};

export default Team;
