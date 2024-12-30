import React from 'react';

const TeamCard = ({ initial, name, project,nb_user }) => {
  return (
    

    <div className="relative p-6 w-80 h-80 rounded-xl shadow-md bg-gradient-to-br from-gray-50 to-slate-100 flex flex-col items-center justify-around text-center overflow-hidden">
  {/* Background Wavy Lines */}
  <div
    className="absolute top-0 left-0 w-full h-16 bg-slate-800"
    
  >
    
  </div>

  {/* Card Content */}
  <div className='w-full flex items-center justify-center'>
    <div className="relative z-10 w-16 h-16 p-4 flex items-center justify-center bg-sky-600 text-white rounded-lg border-4 border-white text-3xl font-extrabold shadow-md">
      {initial}
    </div>
  </div>
  
  <h3 className=" z-10  text-2xl font-semibold text-gray-700 tracking-tight">
    {name}
  </h3>
  
  <div className='w-full flex flex-col items-center justify-center '>
    <p className="  text-sm text-gray-700 opacity-90">Project : {project}</p>
    <p className=' text-sm text-gray-700 opacity-80'>
      <span className="font-semibold">{nb_user} People</span>
    </p>
  </div>
</div>



  

  );
};
export default TeamCard;