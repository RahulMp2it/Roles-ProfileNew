import React, { useState, useRef } from "react";
import EmployeesCard from "../../../utils/EmployeesCard";
import { Link, useNavigate } from "react-router-dom";
import { LuLink } from "react-icons/lu";
import { ImAttachment } from "react-icons/im";
import Layout from "../../Layout";

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
  const navigate = useNavigate();
  const addEmployee = useRef();

  const toggleDropdown = (id) => {
    // If the clicked dropdown is already open, close it. Otherwise, open the clicked one.
    setIsDropdownOpen(openDropdownId === id ? null : id);
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Layout>
      <div className=" fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2 ">
        <div className=" overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
          <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">
            "Welcome back, Rahul singh"
          </p>
          <div className="grid grid-cols-4 place-content-between gap-4">
            <div className="col-span-3 ">
              <h1 className="text-[34px] font-nunito font-semibold">
                Employee
              </h1>
            </div>

            <div className=" text-end">
              <button
                className="btn text-white font-nunito w-[200px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
                onClick={() => addEmployee.current.showModal()}
              >
                + Add Employee
              </button>
              <dialog ref={addEmployee} className="modal h-auto">
                <div className=" modal-box overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
                  <form method="dialog modal-action">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                    <div className="text-[20px] text-start px-4 py-4 font-bold">
                      Add Employee
                    </div>
                    <div className="px-4 pb-8">
                      <div className="mb-4 py-2">
                        <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium ">
                          Employee Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          // value={form.name}
                          // onChange={handleChange}
                          placeholder="Enter Name"
                          className="mt-1 flex w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm items-center focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                        />
                      </div>
                      <div className="mb-4 py-2">
                        <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
                          Employee Profile
                        </label>
                        <input
                          type="text"
                          name="code"
                          // value={form.code}
                          // onChange={handleChange}
                          placeholder="Head"
                          className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                        />
                      </div>
                      <div className="mb-4 py-2">
                        <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
                          Employee Department
                        </label>
                        <input
                          type="text"
                          name="code"
                          // value={form.code}
                          // onChange={handleChange}
                          placeholder="R & D"
                          className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                        />
                      </div>
                      <div className="mb-4 py-2">
                        <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
                          Employee Code
                        </label>
                        <input
                          type="text"
                          name="code"
                          // value={form.code}
                          // onChange={handleChange}
                          placeholder="Employee Code"
                          className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                        />
                      </div>
                      <div className="mb-6 py-2">
                        <label className="block text-start text-[12px] pb-1 font-medium text-[#7D8592]">
                          Description
                        </label>
                        <textarea
                          name="description"
                          // value={form.description}
                          // onChange={handleChange}
                          placeholder="Enter Add some Descriptionof the task"
                          className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px] min-h-[100px]"
                        />
                      </div>
                      {/* Links  */}
                      <div className="flex gap-3">
                        <Link
                          to="#"
                          // onClick={handleReset}
                          className="bg-[#6D5DD319] text-[#6D5DD3] px-4 py-2 rounded-md flex items-center"
                        >
                          <ImAttachment />
                        </Link>
                        <Link
                          to="#"
                          // onClick={handleReset}
                          className="bg-[#15C0E61A] text-[#15C0E6] px-4 py-2 rounded-md flex items-center"
                        >
                          <LuLink />
                        </Link>
                      </div>
                    </div>
                    <button className="btn text-white font-nunito w-[150px] px-2 py-3 bg-[#3F8CFF] rounded-xl">
                      Save Department
                    </button>
                  </form>
                </div>
              </dialog>
            </div>
          </div>

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
        </div>
      </div>
    </Layout>
  );
}

export default Employees;
