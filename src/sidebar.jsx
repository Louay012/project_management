import React from "react";
import { Link } from "react-router-dom";
import { 
  HomeIcon, 
  InboxIcon, 
  UserGroupIcon, 
  StarIcon, 
  FolderIcon ,
  UserCircleIcon
} from "@heroicons/react/outline";

const Sidebar = () => {
  return (
    <div className="h-screen w-56 bg-slate-200  flex flex-col rounded">
      {/* Logo */}
      <div className="px-6 py-4 border-b">
        <h1 className="text-lg font-bold text-gray-800">TaskFlow</h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <ul className="mt-4 space-y-2 px-4">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 p-2 text-gray-700 hover:bg-slate-300 rounded-md no-underline"
            >
              <HomeIcon className="w-6 h-6" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/inbox"
              className="flex items-center gap-3 p-2 text-gray-700 hover:bg-slate-300 no-underline rounded-md"
            >
              <InboxIcon className="w-6 h-6" />
              <span>Inbox</span>
            </Link>
          </li>
          <li>
            <Link
              to="/teams"
              className="flex items-center gap-3 p-2 text-gray-700 hover:bg-slate-300 no-underline rounded-md"
            >
              <UserGroupIcon className="w-6 h-6" />
              <span>Teams</span>
            </Link>
          </li>
          <li>
            <Link
              to="/assigned-to-me"
              className="flex items-center gap-3 p-2 text-gray-700 hover:bg-slate-300 no-underline rounded-md"
            >
              <StarIcon className="w-6 h-6" />
              <span>Assigned to me</span>
            </Link>
          </li>
          
        </ul>

        {/* Project Section */}
        <div className="mt-6 px-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase">Projects</h2>
          <ul className="mt-2 ">
            <li>
              <Link
                to="/projects/crm-dashboard"
                className="flex items-center gap-3 p-2 text-gray-700 hover:bg-slate-300 no-underline rounded-md"
              >
                <FolderIcon className="w-6 h-6" />
                <span>CRM Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/projects/saas-dashboard"
                className="flex items-center gap-3 p-2 text-gray-700 hover:bg-slate-300 no-underline rounded-md"
              >
                <FolderIcon className="w-6 h-6" />
                <span>SaaS Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/projects/pertamina"
                className="flex items-center gap-3 p-2 text-gray-700 hover:bg-slate-300 no-underline  rounded-md"
              >
                <FolderIcon className="w-6 h-6" />
                <span>Pertamina Project</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t">
        <div className="flex items-center space-x-3">
          <UserCircleIcon className=""></UserCircleIcon>
          <div>
            <p className="text-sm font-medium text-gray-800">user</p>
            <p className="text-xs text-gray-500">user@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
