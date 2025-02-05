import axios from 'axios';
import React, { useState } from 'react'
import { MdDelete } from 'react-icons/md';
import { TbDotsCircleHorizontal } from 'react-icons/tb';
import { Link } from 'react-router-dom'

const TrainingPdfCard = ({ name, pdfPath, id, onDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent the click event from reaching the Link
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // //delete Api
  // const handleDelete = async () => {
  //   if (!id) {
  //     console.error("Document ID is missing!");
  //     alert("Error: Document ID is missing.");
  //     return;
  //   }
  //   try {
  //     const response = await axios.delete(`http://localhost:8080/api/training/${id}`);
  //     if (response.status === 200) {
  //       // alert('Document deleted successfully.');
  //       onDeleteSuccess(id); // Notify the parent component to update the list
  //     }
  //   } catch (error) {
  //     console.error('Error deleting document:', error);
  //   } finally {
  //     setIsDeleting(false);
  //     closeDropdown();
  //   }
  // };

  return (
    <div className='w-[160px] h-[160px] bg-[#D8D8D83D] rounded-xl relative'>

      <Link to={`/pdfview?pdfPath=${encodeURIComponent(pdfPath)}`}>
        <div className='h-[70px] w-[70px] ml-11 mt-8 '>
          <img src="pdf.png" alt="Loading...." />
        </div>
        <div className="ml-5 mt-5 ">{name}</div>
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
                    {/* <li>
                      <button
                        className="flex items-center px-1 py-3 text-[14px] h-5 text-white"
                      //onClick={openEditModal} // Call the function to open modal
      
                      >
                        <IoPencil />
                        <span className="ml-1">Edit</span>
                      </button>
                    </li> */}
      
                    <li>
                      <button
                        className="flex items-center px-1 py-3 text-[14px] h-5 text-white"
                        onClick={() => onDelete(id)}
                        disabled={isDeleting}
                      >
      
                        <MdDelete />
                        <span className="ml-1">{isDeleting ? 'Deleting...' : 'Delete'}</span>
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </div>


    </div>
  )
}

export default TrainingPdfCard
