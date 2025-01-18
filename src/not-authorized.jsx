import React from 'react';
import { Link } from 'react-router-dom';
import img from './Images/403 Error Forbidden-bro.png'
const ErrorPage = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-white via-slate-50 to-slate-100 flex items-center justify-center">
      <div className="bg-gray-50 p-12 rounded-lg shadow-2xl w-1/2 text-center h-5/6">
        <h1 className="text-5xl font-bold text-slate-800 mb-6">Access Denied</h1>

        {/* Image */}
        <div className="mb-8">
          <img 
            src={img}
            alt="Unauthorized Access" 
            className="rounded-lg shadow-sm h-96 w-full" 
          />
        </div>

       
        
      </div>
    </div>
  );
};

export default ErrorPage;
