import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiSearch } from "react-icons/fi";

function Navbar() {
  return (
    <nav className="navbar fixed top-0 grid grid-cols-12 gap-x-5 me-3 ms-[215px] w-[85%] ">
      {/* Search Bar */}
      <div className="search-bar justify-center col-span-9 relative ">
        {/* <FiSearch /> */}
        <input
          type="text"
          className="w-full rounded-[8px] pl-9 pr-3 py-2 border-0 "
          placeholder="Search"
        />
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black-900">
          <FiSearch />
        </span>
      </div>

      {/* Notification  */}
      <div className="user-controls col-span-1 py-[9px] bg-white px-2 rounded-[8px] ">
        <button className="notification-btn w-full flex justify-center">
          <IoMdNotificationsOutline className="w-5 h-5" />{" "}
        </button>
      </div>

      <div className="col-span-2 ">
        <div className="relative w-full inline-block text-left group ">
          {/* Dropdown button with arrow  */}
          <button class="bg-white text-black text-[14px] font-nunito px-4 py-[9px] rounded-md focus:outline-none flex items-center w-full">
            {/* image */}
            <div class="avatar">
              <div class="w-6 mr-2 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            Rahul Singh
            {/* Down arrow icon */}
            <svg
              class="ml-4 w-8 pl-[15px] h-4 fill-current text-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M6.293 7.293a1 1 0 011.414 0L10 8.586l2.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
            </svg>
          </button>

          {/* Dropdown menu  */}
          <div class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto">
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Option 1
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Option 2
            </a>
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Option 3
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
