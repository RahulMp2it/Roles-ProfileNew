// import React, { useState } from "react";
import { IoPencil } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

function EmployeesCard({
  id,
  image,
  depart,
  position,
  title,
  fname,
  isDropdownOpen,
  toggleDropdown,
}) {
  return (
    <div className="bg-[#F4F9FD] rounded-[22px] overflow-hidden flex flex-col items-center justify-center pt-6 pb-5 relative">
      {/* Checkbox - Top Left Corner */}
      <div className="absolute top-2 left-2">
        <input
          type="checkbox"
          className="w-7 h-7 shadow-custom-blue border-inherit rounded-md"
        />
      </div>

      {/* Dropdown Icon */}
      <div className="absolute top-2 right-3 z-10">
        <button
          onClick={() => toggleDropdown(id)} // Toggle dropdown based on this card's ID
          className="focus:outline-none text-gray-600"
        >
          <img
            src="dropicone.png" // Use any image passed as a prop for the dropdown icon
            alt="dropdown"
            className="w-7 h-7"
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-[1px] w-36 rounded-[18px] shadow-lg bg-[#3F8CFF] ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu">
              <Link
                to="/edit" // Link to the edit page
                className="flex items-center px-4 py-3 text-[14px] h-5 text-white"
                role="menuitem"
              >
                <IoPencil />
                <span className="ml-2">Edit</span>
              </Link>
              <Link
                to="/view" // Link to the view page
                className="flex items-center px-4 py-3 text-[14px] h-5 text-white"
                role="menuitem"
              >
                <IoEyeOutline />
                <span className="ml-2">View</span>
              </Link>
              <Link
                to="/add" // Link to the add page
                className="flex items-center px-4 py-3 text-[14px] h-5 text-white"
                role="menuitem"
              >
                <GoPlus />
                <span className="ml-2">Add</span>
              </Link>
              <Link
                to="/delete" // Link to the delete page
                className="flex items-center px-4 py-3 text-[14px] h-7 text-white"
                role="menuitem"
              >
                <MdDelete />
                <span className="ml-2">Delete</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Profile Image */}
      <div className="relative w-[75px] h-[75px] bg-progress-img bg-center bg-[length:100%_100%] justify-center ">
        {/* Rounded Image */}
        <img
          className="absolute top-[6px] left-[6px] h-[63px] w-[63px] object-cover rounded-full"
          src={image}
          alt={title}
        />
      </div>

      {/* Full name */}
      <p className="mb-1 text-[16px] leading-4 py-2 flex justify-center text-center font-nunito text-[#0A1629] dark:text-white h-[18px]">
        {fname}
      </p>

      {/* Position */}
      <p className="mb-1 text-[16px] leading-4 py-2 flex justify-center text-center font-nunito text-[#3F8CFF] dark:text-white h-[18px]">
        {position}
      </p>

      {/* Department */}
      <p className="mb-1 text-[16px] leading-4 py-2 flex justify-center text-center font-nunito text-[#0A1629D6] dark:text-white h-[18px]">
        {depart}
      </p>

      {/* Title */}
      <h2 className="mb-1 text-[15px] leading-4 py-2 flex justify-center text-center font-nunito text-[#0A1629] dark:text-white h-[18px]">
        {title}
      </h2>
    </div>
  );
}

export default EmployeesCard;
