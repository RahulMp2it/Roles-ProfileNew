import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { TbDotsCircleHorizontal } from 'react-icons/tb'
import { Link } from 'react-router-dom'

export default function TrainingDocCard({ name, docPath, id, onDelete }) {
  
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent the click event from reaching the Link
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className='w-[160px] h-[160px] bg-[#D8D8D83D] rounded-xl relative'>

      <Link to={`/docview?docPath=${encodeURIComponent(docPath)}`}>
        <div className='h-[100px] w-[100px] mt-5 ml-5 '>
          <img src="doc.png" alt="Loading...." /></div>
        <div className="ml-3 mt-1">{name}</div>
        {/* <a href="" download>Download</a> */}
      </Link>

      {/* Dropdown Icon */}
      <div className="absolute top-1 right-1 z-10"
        onClick={(e) => e.stopPropagation()} // Prevent click from propagating to Link 
      >
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="m-1" onClick={toggleDropdown}>
            <TbDotsCircleHorizontal className="text-3xl text-gray-500" />
          </div>
          {dropdownOpen && (
            <ul
              tabIndex={0}
              className="dropdown-content menu z-[1] p-2 w-36 rounded-[18px] shadow-lg bg-[#3F8CFF] ring-1 ring-black ring-opacity-5"
              onMouseLeave={closeDropdown} // Optional: close dropdown when mouse leaves
            >
              <li>
                <button
                  className="flex items-center px-1 py-3 text-[14px] h-5 text-white"
                  onClick={() => onDelete(id)}
                >

                  <MdDelete />
                  <span className="ml-1">Delete</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

    </div>
  )
}
