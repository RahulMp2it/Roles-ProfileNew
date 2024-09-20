import React, { useState } from "react";
import EmployeesCard from "../../../utils/EmployeesCard";

const employees = [
  {
    id: 1,
    name: "Team Leader",
    fname: "Rahul singh",
    image: "image4.png",
    depart: "R&D Department",
    position: "UI/UX Designer",
  },
  {
    id: 2,
    name: "Team Leader",
    fname: "Rahul singh",
    image: "image4.png",
    depart: "R&D Department",
    position: "Mern Stack Developer",
  },
  {
    id: 3,
    name: "Team Leader",
    fname: "Rahul singh",
    image: "image4.png",
    depart: "R&D Department",
    position: "UI/UX Designer",
  },
  {
    id: 4,
    name: "Team Leader",
    fname: "Rahul singh",
    image: "image4.png",
    depart: "R&D Department",
    position: "Mern Stack Developer",
  },
  {
    id: 5,
    name: "Team Leader",
    fname: "Rahul singh",
    image: "image4.png",
    depart: "R&D Department",
    position: "UI/UX Designer",
  },
  {
    id: 6,
    name: "Team Leader",
    fname: "Rahul singh",
    image: "image4.png",
    depart: "R&D Department",
    position: "Mern Stack Developer",
  },
  {
    id: 7,
    name: "Team Leader",
    fname: "Rahul singh",
    image: "image4.png",
    depart: "R&D Department",
    position: "UI/UX Designer",
  },
  {
    id: 8,
    name: "Team Leader",
    fname: "Rahul singh",
    image: "image4.png",
    depart: "R&D Department",
    position: "Mern Stack Developer",
  },
  {
    id: 9,
    name: "Team Leader",
    fname: "Rahul singh",
    image: "image4.png",
    depart: "R&D Department",
    position: "UI/UX Designer",
  },
  {
    id: 10,
    name: "Team Leader",
    fname: "Rahul singh",
    image: "image4.png",
    depart: "R&D Department",
    position: "Mern Stack Developer",
  },
];

function Employees() {
  const [openDropdownId, setIsDropdownOpen] = useState(null);

  const toggleDropdown = (id) => {
    // If the clicked dropdown is already open, close it. Otherwise, open the clicked one.
    setIsDropdownOpen(openDropdownId === id ? null : id);
  };

  return (
    <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
      {employees.map((employee) => (
        <EmployeesCard
          key={employee.id}
          id={employee.id} //pass unique ID
          image={employee.image}
          fname={employee.fname}
          title={employee.name}
          depart={employee.depart}
          position={employee.position}
          isDropdownOpen={openDropdownId === employee.id} // Check if this dropdown is open
          toggleDropdown={toggleDropdown} // Pass the function to toggle the dropdown
        />
      ))}
    </div>
  );
}

export default Employees;
