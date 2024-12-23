import React from "react";
import { Link } from "react-router-dom";
//test ;dsqdqqs
//import img from './Images/Team work-amico.png'
const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 relative overflow-hidden flex flex-col justify-between py-4">
      

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <header className="container mx-auto py-6 px-6 flex justify-between items-center border-b-gray-400 border-opacity-10 border-b-2  w-full">
          <h1 className="text-2xl font-bold text-gray-800">TaskFlow</h1>
          <nav className="flex items-center gap-4 ">
            <Link to="/" className="text-gray-600 no-underline hover:text-blue-600">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 no-underline hover:text-blue-600">
              About
            </Link>
            <Link to="/features" className="text-gray-600 no-underline hover:text-blue-600">
              Features
            </Link>
           
            <Link to="/contact" className="text-gray-600 no-underline hover:text-blue-600">
              Contact
            </Link>
          </nav>
          <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
            Get Started
          </button>
        </header>

        {/* Hero Section */}
        <div className="text-center py-32">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Streamline Your Goals with Our KPI <br /> & Project Management
              Platform
            </h2>
            <p className="text-gray-600 mb-8">
              Our innovative platform offers a robust solution to help you stay
              organized, focused, and on track to achieve your strategic
              objectives.
            </p>
 
            <div className="flex justify-center space-x-4">
              <button className="bg-gray-800 text-white px-6 py-3 rounded shadow hover:bg-gray-900">
                Login
              </button>
              <button className="bg-white border border-gray-300 text-gray-800 px-6 py-3 rounded shadow hover:bg-gray-100">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className=" text-center ">2024 TaskFlow rights reserved.</footer>
    </div>
  );
};

export default Home;
