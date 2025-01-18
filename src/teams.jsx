import React, { useState,useContext,useEffect } from "react";
import { UserContext } from './UserContext';
import TaskRow from "./taskCard"; 
import TeamCard from "./Team_card";
import toast from 'react-hot-toast';
import Sidebar from "./sidebar";
import {UserGroupIcon} from "@heroicons/react/outline"
import { Link } from "react-router-dom";
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>

const Teams= () => {
  const [teams, setTeams] = useState([]);
  const { userDetails } = useContext(UserContext);
  
  
  const [error, setError] = useState(null);

  const fetch_Teams=async () => {
    try{
      
        if(userDetails){
      const response= await fetch('http://localhost/project_management/src/API/get_teams.php' ,{
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
               setTeams(data.data)

               console.log(data.data)
            }
             else {
            setError(data.message || "Failed to fetch Teams.");
            }
          }
        } catch (err) {
            setError("An error occurred while fetching Teams." );
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
    
  useEffect(() => {
      fetch_Teams()
    },[userDetails])  ; 
  
  
  

  return (
    <div className="w-full h-[100vh]  flex p-3 bg-slate-200 gap-2 ">
        <Sidebar></Sidebar>
        <div className="flex-1 p-6 bg-gray-50 h-full rounded-lg shadow-md ml-56 overflow-auto">
          <h1 className="text-3xl font-semibold mb-6 flex items-center gap-2"> <UserGroupIcon className="h-9 w-9"/> Team Management</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
            {teams.map((team) => (
              <Link className="no-underline"
              to={`/team/${team.team_id}`}
              ><TeamCard key={team.team_id} name={team.team_name} initial={team.team_name[0] } project={team.project_title}
               nb_user={team.nb_user}/></Link>
            ))}
          </div>
    
      {/* Members Table 
      <table className="w-full border-collapse table-responsive border border-gray-200 shadow-sm mt-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 border border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {team.members.map((member) => (
            <tr key={member.user_id}>
              <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900">
                {member.username}
              </td>
              <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900">
                {member.email}
              </td>
              <td className="px-6 py-4 border border-gray-300 text-sm text-gray-900">
                {member.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>*/}
    </div>


   
        

          
        </div>
  
  );
};

export default Teams;
