import React from "react";
import { GoPlus } from "react-icons/go";
import { IoEyeOutline, IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { TbDotsCircleHorizontal } from "react-icons/tb";

function ProfileAssignCard({ image, depart, position, title, buttonText }) {

  // Delete AssignCard From database
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/employee/${id}`) // Delete the employee
      .then((response) => {
        // alert("Employee deleted successfully");
        console.log("Employee deleted successfully:", response.data);
        update();
      })
      .catch((error) => {
        console.error("There was an error deleting the employee:", error);
      });
  };

  return (
    <div className="bg-[#F4F9FD] rounded-[22px] overflow-hidden flex flex-col items-center justify-center pt-6 pb-2 relative">

      {/* Dropdown Icon */}
      <div className="absolute top-2 right-3 z-10">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="m-1">
            <TbDotsCircleHorizontal className="text-3xl text-gray-500" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu z-[1] p-2 w-36 rounded-[18px] shadow-lg bg-[#3F8CFF] ring-1 ring-black ring-opacity-5"
          >
            <li>
              <button
                className="flex items-center px-1 py-3 text-[14px] h-5 text-white"
              //onClick={openEditModal} // Call the function to open modal
              >
                <IoPencil />
                <span className="ml-1">Edit</span>
              </button>
            </li>
            <li>
              <button className="flex items-center px-1 py-3 text-[14px] h-5 text-white">
                <IoEyeOutline />
                <span className="ml-1">View</span>
              </button>
            </li>
            <li>
              <button className="flex items-center px-1 py-3 text-[14px] h-5 text-white">
                <GoPlus />
                <span className="ml-1">Add</span>
              </button>
            </li>
            <li>
              <button
                className="flex items-center px-1 py-3 text-[14px] h-5 text-white"
                onClick={() => handleDelete(id)}
              >
                <MdDelete />
                <span className="ml-1">Delete</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative w-[75px] h-[75px] bg-progress-img bg-center bg-[length:100%_100%] justify-center ">
        {/* Rounded Image */}
        <img
          className="absolute top-[6px] left-[6px] h-[63px] w-[63px] object-cover rounded-full"
          src={image}
          alt={title}
        />
      </div>
      <p className="mb-1 text-[16px] leading-4 py-2 flex justify-center text-center font-nunito text-[#0A16299E] dark:text-white h-[18px]">
        {position}
      </p>
      <p className="mb-1 text-[13px] leading-4 py-2 flex justify-center text-center font-nunito text-[#0A1629D6] dark:text-white h-[18px]">
        {depart}
      </p>
      {/* Title and Button */}
      <h2 className="mb-1 text-[16px] leading-4 py-2 flex justify-center text-center font-nunito text-[#0A1629] dark:text-white h-[18px]">
        {title}
      </h2>
      <div className="p-3 text-center">
        <button className="inline-flex items-center border  border-[#8f97a3] px-4 py-1 text-[11px] font-nunito  text-[#7D8592] bg-[#F4F9FD] rounded-[3.5px] focus:outline-none">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ProfileAssignCard;
