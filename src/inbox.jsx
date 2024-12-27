import React, { useState } from "react";

const Inbox = () => {
  const [isOpen, setIsOpen] = useState(false); // Toggle inbox visibility

  const notifications = [
    "You have a new task assigned.",
    "Your task was reviewed.",
    "The deadline is approaching!",
  ];

  const toggleInbox = () => {
    setIsOpen(!isOpen); // Toggle the notification panel
  };

  return (
    <div className="flex">
   

      {/* Notification Panel */}
      <div
        className={`fixed top-5 left-52 w-80 bg-white border border-gray-300 shadow-lg rounded-lg p-5 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h3 className="text-lg font-bold text-gray-700">Notifications</h3>
        <hr className="my-2" />
        {notifications.length > 0 ? (
          <ul className="space-y-2">
            {notifications.map((note, index) => (
              <li key={index} className="text-gray-600 text-sm">
                {note}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No new notifications.</p>
        )}
        <button
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          onClick={toggleInbox}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Inbox;