import React from "react";
import { Link, NavLink } from "react-router-dom";
import { BsCalendar2Fill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { TbStack2Filled } from "react-icons/tb";
import { PiChatsCircleFill } from "react-icons/pi";
import { MdLogout } from "react-icons/md";
import "@fontsource/nunito-sans/500.css";

function Sidebar() {
  return (
    <div className="flex min-h-screen ">
      {/* sideBar */}
      <div className="bg-white text-white w-[175px] space-y-2 py-3 px-3 my-3 mx-6 rounded-2xl grid grid-rows-2 place-content-between ">
        <div>
          <div className="bg-[#3F8CFF] w-11 rounded-[8px] ">
            <Link to={"/"}>
              <img src="logo.png" alt="Logo" />
            </Link>
          </div>

          <div className="text-[#7D8592] text-[14px] tracking-[0.5px] font-nunito m-0 pt-2">
            <NavLink
              to={"/Employees"}
              className={({ isActive }) =>
                isActive
                  ? "flex py-3 px-2 rounded transition duration-200 items-center gap-x-4 bg-[#F4F9FD] text-[#3F8CFF]"
                  : "flex py-3 px-2 rounded transition duration-200 items-center gap-x-4 text-[#7D8592]"
              }
            >
              <FaUserFriends
                className={`{({ isActive }) => (isActive ? "text-[#3F8CFF]" : "text-[#7D8592]")}`}
                size={20}
              />
              <span>Employees</span>
            </NavLink>
            <Link to={"/profile"}>
              <div className="flex py-3 px-2 rounded transition duration-200 hover:bg-[#F4F9FD] items-center gap-x-4">
                <BsCalendar2Fill className="size-4" />
                <span>Profile</span>
              </div>
            </Link>
            <Link to={"/"}>
              <div className="flex py-3 px-2 rounded transition duration-200 hover:bg-[#F4F9FD] items-center gap-x-4">
                <RxDashboard className="size-5" />
                <span>Department</span>
              </div>
            </Link>
            <Link to={"/Designation"}>
              <div className="flex py-3 px-2 rounded transition duration-200 hover:bg-[#F4F9FD] items-center gap-x-4">
                <TbStack2Filled className="size-5" />
                <span>Designation</span>
              </div>
            </Link>
            <Link to={"/ProfileAssign"}>
              <div className="flex py-3 px-2 rounded transition duration-200 hover:bg-[#F4F9FD] items-center gap-x-4">
                <PiChatsCircleFill className="size-5" />
                <span>Profile Assign</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="text-[#7D8592] text-[14px] absolute bottom-20">
          <Link to={"/"}>
            <div className="flex py-2 px-2 rounded transition duration-200 hover:bg-[#F4F9FD] items-center gap-x-4">
              <MdLogout className="size-[20px]" />
              <span>Logout</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
