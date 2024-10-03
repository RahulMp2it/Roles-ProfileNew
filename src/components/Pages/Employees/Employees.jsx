// import React, { useState, useRef } from "react";
// import EmployeesCard from "../../../utils/EmployeesCard";
// import { Link, useNavigate } from "react-router-dom";
// import { LuLink } from "react-icons/lu";
// import { ImAttachment } from "react-icons/im";
// import Layout from "../../Layout";
// import { VscFilter } from "react-icons/vsc";
// import { FiFilter } from "react-icons/fi";

// const employees = [
//   {
//     id: 1,
//     name: "Team Leader",
//     fname: "Rahul singh",
//     image: "image4.png",
//     depart: "R&D Department",
//     position: "UI/UX Designer",
//   },
//   {
//     id: 2,
//     name: "Team Leader",
//     fname: "Rahul singh",
//     image: "image4.png",
//     depart: "R&D Department",
//     position: "Mern Stack Developer",
//   },
//   {
//     id: 3,
//     name: "Team Leader",
//     fname: "Rahul singh",
//     image: "image4.png",
//     depart: "R&D Department",
//     position: "UI/UX Designer",
//   },
//   {
//     id: 4,
//     name: "Team Leader",
//     fname: "Rahul singh",
//     image: "image4.png",
//     depart: "R&D Department",
//     position: "Mern Stack Developer",
//   },
//   {
//     id: 5,
//     name: "Team Leader",
//     fname: "Rahul singh",
//     image: "image4.png",
//     depart: "R&D Department",
//     position: "UI/UX Designer",
//   },
//   {
//     id: 6,
//     name: "Team Leader",
//     fname: "Rahul singh",
//     image: "image4.png",
//     depart: "R&D Department",
//     position: "Mern Stack Developer",
//   },
//   {
//     id: 7,
//     name: "Team Leader",
//     fname: "Rahul singh",
//     image: "image4.png",
//     depart: "R&D Department",
//     position: "UI/UX Designer",
//   },
//   {
//     id: 8,
//     name: "Team Leader",
//     fname: "Rahul singh",
//     image: "image4.png",
//     depart: "R&D Department",
//     position: "Mern Stack Developer",
//   },
//   {
//     id: 9,
//     name: "Team Leader",
//     fname: "Rahul singh",
//     image: "image4.png",
//     depart: "R&D Department",
//     position: "UI/UX Designer",
//   },
//   {
//     id: 10,
//     name: "Team Leader",
//     fname: "Rahul singh",
//     image: "image4.png",
//     depart: "R&D Department",
//     position: "Mern Stack Developer",
//   },
// ];

// function Employees() {
//   const [openDropdownId, setIsDropdownOpen] = useState(null);
//   const navigate = useNavigate();
//   const addEmployee = useRef();
//   const ProfileAssign = useRef();
//   const [toggle, setToggle] = useState(false);

//   const showSideMenu = () => {
//     setToggle(true);
//   };
//   const hideSideMenu = () => {
//     setToggle(false);
//   };

//   const toggleDropdown = (id) => {
//     // If the clicked dropdown is already open, close it. Otherwise, open the clicked one.
//     setIsDropdownOpen(openDropdownId === id ? null : id);
//   };

//   const handleBackClick = () => {
//     navigate(-1); // Go back to the previous page
//   };

//   return (
//     <>
//       <div
//         className="blue-overlay w-full h-full fixed duration-500"
//         onClick={hideSideMenu}
//         style={{
//           opacity: toggle ? 1 : 0,
//           visibility: toggle ? "visible" : "hidden",
//         }}
//       >
//         <div
//           onClick={(e) => {
//             e.stopPropagation();
//           }}
//           className="w-[500px] bg-white h-full absolute duration-[400ms]"
//           style={{
//             left: toggle ? "0%" : "-100%",
//           }}
//         ></div>
//       </div>
//       <Layout>
//         <div className=" fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2 z-10">
//           <div className=" overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
//             <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">
//               "Welcome back, Rahul singh"
//             </p>
//             <div className="grid grid-cols-2 place-content-between gap-4">
//               <div className="col-span-1 ">
//                 <h1 className="text-[34px] font-nunito font-semibold">
//                   Employee
//                 </h1>
//               </div>

//               <div className="col-span-1 ml-34 text-end flex items-center justify-end gap-4">
//                 <button
//                   className="btn text-white font-nunito w-[200px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
//                   onClick={() => addEmployee.current.showModal()}
//                 >
//                   + Add Employee
//                 </button>
//                 <dialog ref={addEmployee} className="modal h-auto">
//                   <div className=" modal-box overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
//                     <form method="dialog modal-action">
//                       <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
//                         ✕
//                       </button>
//                       <div className="text-[20px] text-start px-4 py-4 font-bold">
//                         Add Employee
//                       </div>
//                       <div className="px-4 pb-8">
//                         <div className="mb-4 py-2">
//                           <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium ">
//                             Employee Name
//                           </label>
//                           <input
//                             type="text"
//                             name="name"
//                             // value={form.name}
//                             // onChange={handleChange}
//                             placeholder="Enter Name"
//                             className="mt-1 flex w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm items-center focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
//                           />
//                         </div>
//                         <div className="mb-4 py-2">
//                           <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
//                             Employee Profile
//                           </label>
//                           <input
//                             type="text"
//                             name="code"
//                             // value={form.code}
//                             // onChange={handleChange}
//                             placeholder="Head"
//                             className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
//                           />
//                         </div>
//                         <div className="mb-4 py-2">
//                           <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
//                             Employee Department
//                           </label>
//                           <input
//                             type="text"
//                             name="code"
//                             // value={form.code}
//                             // onChange={handleChange}
//                             placeholder="R & D"
//                             className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
//                           />
//                         </div>
//                         <div className="mb-4 py-2">
//                           <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
//                             Employee Code
//                           </label>
//                           <input
//                             type="text"
//                             name="code"
//                             // value={form.code}
//                             // onChange={handleChange}
//                             placeholder="Employee Code"
//                             className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
//                           />
//                         </div>
//                         <div className="mb-6 py-2">
//                           <label className="block text-start text-[12px] pb-1 font-medium text-[#7D8592]">
//                             Description
//                           </label>
//                           <textarea
//                             name="description"
//                             // value={form.description}
//                             // onChange={handleChange}
//                             placeholder="Enter Add some Descriptionof the task"
//                             className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px] min-h-[100px]"
//                           />
//                         </div>
//                         {/* Links  */}
//                         <div className="flex gap-3">
//                           <Link
//                             to="#"
//                             // onClick={handleReset}
//                             className="bg-[#6D5DD319] text-[#6D5DD3] px-4 py-2 rounded-md flex items-center"
//                           >
//                             <ImAttachment />
//                           </Link>
//                           <Link
//                             to="#"
//                             // onClick={handleReset}
//                             className="bg-[#15C0E61A] text-[#15C0E6] px-4 py-2 rounded-md flex items-center"
//                           >
//                             <LuLink />
//                           </Link>
//                         </div>
//                       </div>
//                       <button className="btn text-white font-nunito w-[150px] px-2 py-3 bg-[#3F8CFF] rounded-xl">
//                         Save Department
//                       </button>
//                     </form>
//                   </div>
//                 </dialog>

//                 {/* Profile Assign Buttton */}
//                 <button
//                   className="btn text-white font-nunito w-[200px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
//                   onClick={() => ProfileAssign.current.showModal()}
//                 >
//                   + Profile Assign
//                 </button>
//                 <dialog ref={ProfileAssign} className="modal h-auto">
//                   <div className=" modal-box overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
//                     <form method="dialog modal-action">
//                       <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
//                         ✕
//                       </button>
//                       <div className="text-[20px] text-start px-4 py-4 font-bold">
//                         Profile Assign
//                       </div>
//                       <div className="px-4 pb-8">
//                         <div className="mb-4 py-2">
//                           <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium ">
//                             Profile Selection
//                           </label>
//                           <select className="select mt-1 flex w-full px-3 border border-gray-300 rounded-[14px] shadow-sm items-center text-[#7D8592] focus:outline-none">
//                             <option disabled selected>
//                               HR
//                             </option>
//                             <option>Han Solo</option>
//                             <option>Greedo</option>
//                           </select>
//                         </div>
//                         <div className="mb-4 py-2">
//                           <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium ">
//                             Employee Selection
//                           </label>
//                           <select className="select mt-1 flex w-full px-3 border border-gray-300 rounded-[14px] shadow-sm items-center text-[#7D8592] focus:outline-none">
//                             <option disabled selected>
//                               Mern Stack Developer
//                             </option>
//                             <option>Han Solo</option>
//                             <option>Greedo</option>
//                           </select>
//                         </div>
//                         <div className="mb-4 py-2">
//                           <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
//                             Assign Profile Code
//                           </label>
//                           <input
//                             type="text"
//                             name="code"
//                             // value={form.code}
//                             // onChange={handleChange}
//                             placeholder="Assign Profile Code"
//                             className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
//                           />
//                         </div>
//                         <div className="mb-6 py-2">
//                           <label className="block text-start text-[12px] pb-1 font-medium text-[#7D8592]">
//                             Description
//                           </label>
//                           <textarea
//                             name="description"
//                             // value={form.description}
//                             // onChange={handleChange}
//                             placeholder=" Add some Descriptionof"
//                             className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px] min-h-[100px]"
//                           />
//                         </div>
//                         {/* Links  */}
//                         <div className="flex gap-3">
//                           <Link
//                             to="#"
//                             // onClick={handleReset}
//                             className="bg-[#6D5DD319] text-[#6D5DD3] px-4 py-2 rounded-md flex items-center"
//                           >
//                             <ImAttachment />
//                           </Link>
//                           <Link
//                             to="#"
//                             // onClick={handleReset}
//                             className="bg-[#15C0E61A] text-[#15C0E6] px-4 py-2 rounded-md flex items-center"
//                           >
//                             <LuLink />
//                           </Link>
//                         </div>
//                       </div>
//                       <button className="btn text-white font-nunito w-[150px] px-2 py-3 bg-[#3F8CFF] rounded-xl">
//                         Save
//                       </button>
//                     </form>
//                   </div>
//                 </dialog>

//                 {/* filter */}
//                 <div
//                   className="w-12 h-12 py-1  bg-[white] flex items-center justify-center rounded-[15px] cursor-pointer z-20"
//                   onClick={showSideMenu}
//                 >
//                   <FiFilter fontSize={20} />
//                 </div>
//               </div>
//             </div>

//             <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
//               {employees.map((employee) => (
//                 <EmployeesCard
//                   key={employee.id}
//                   id={employee.id} //pass unique ID
//                   image={employee.image}
//                   fname={employee.fname}
//                   title={employee.name}
//                   depart={employee.depart}
//                   position={employee.position}
//                   isDropdownOpen={openDropdownId === employee.id} // Check if this dropdown is open
//                   toggleDropdown={toggleDropdown} // Pass the function to toggle the dropdown
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </Layout>
//     </>
//   );
// }

// export default Employees;

import React, { useState, useRef, useEffect } from "react";
import EmployeesCard from "../../../utils/EmployeesCard";
import { Link, useNavigate } from "react-router-dom";
import { LuLink } from "react-icons/lu";
import { ImAttachment } from "react-icons/im";
import Layout from "../../Layout";
import { VscFilter } from "react-icons/vsc";
import { FiFilter } from "react-icons/fi";
import axios from "axios";
import EditEmployeeModal from "./EditEmployeeModal";

const employees = [
  // existing employees array
];

function Employees() {
  const navigate = useNavigate();
  const addEmployee = useRef();
  const ProfileAssign = useRef();
  const [employees, setEmployees] = useState([]); // Employee list from API
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Employee to edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(selectedEmployee);

  const updateEmployee = useRef(); // Ref for the modal

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleUpdate = (updatedEmployee) => {
    // Update the employees state after editing
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  const [form, setForm] = useState({
    name: "",
    profile: "",
    department: "",
    designation: "",
  });

  // const showSideMenu = () => {
  //   setToggle(true);
  // };
  // const hideSideMenu = () => {
  //   setToggle(false);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Create and Add Employee
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/employee", form)
      .then((response) => {
        console.log("Employee added successfully:", response.data);
        setForm({
          name: "",
          profile: "",
          department: "",
          designation: "",
        });
        addEmployee.current.close();
        fetchEmployees();
      })
      .catch((error) => {
        console.error("There was an error adding the employee:", error);
      });
  };
  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/employee");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError(error.message);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <Layout>
        <div className="fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2 z-10">
          <div className="overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
            <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">
              "Welcome back, Rahul Singh"
            </p>
            <div className="grid grid-cols-2 place-content-between gap-4">
              <div className="col-span-1">
                <h1 className="text-[34px] font-nunito font-semibold">
                  Employee
                </h1>
              </div>

              <div className="col-span-1 ml-34 text-end flex items-center justify-end gap-4">
                <button
                  className="btn text-white font-nunito w-[200px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
                  onClick={() => addEmployee.current.showModal()}
                >
                  + Add Employee
                </button>
                <dialog ref={addEmployee} className="modal h-auto">
                  <div className="modal-box overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
                    <button
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      onClick={() => addEmployee.current.close()}
                    >
                      ✕
                    </button>
                    <form method="dialog" onSubmit={handleSubmit}>
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
                            value={form.name}
                            onChange={handleChange}
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
                            name="profile"
                            value={form.profile}
                            onChange={handleChange}
                            placeholder="UI/UX Designer"
                            className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                          />
                        </div>
                        <div className="mb-4 py-2">
                          <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
                            Employee Department
                          </label>
                          <input
                            type="text"
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            placeholder="R & D"
                            className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                          />
                        </div>
                        <div className="mb-4 py-2">
                          <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
                            Employee Designation
                          </label>
                          <input
                            type="text"
                            name="designation"
                            value={form.designation}
                            onChange={handleChange}
                            placeholder="Head"
                            className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn text-white font-nunito w-[150px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
                      >
                        Save Employee
                      </button>
                    </form>
                  </div>
                </dialog>

                {/* Profile Assign Buttton */}

                <button
                  className="btn text-white font-nunito w-[200px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
                  onClick={() => ProfileAssign.current.showModal()}
                >
                  + Profile Assign
                </button>
                <dialog ref={ProfileAssign} className="modal h-auto">
                  <div className=" modal-box overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
                    <form method="dialog modal-action">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                      <div className="text-[20px] text-start px-4 py-4 font-bold">
                        Profile Assign
                      </div>
                      <div className="px-4 pb-8">
                        <div className="mb-4 py-2">
                          <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium ">
                            Profile Selection
                          </label>
                          <select className="select mt-1 flex w-full px-3 border border-gray-300 rounded-[14px] shadow-sm items-center text-[#7D8592] focus:outline-none">
                            <option disabled selected>
                              HR
                            </option>
                            <option>Han Solo</option>
                            <option>Greedo</option>
                          </select>
                        </div>
                        <div className="mb-4 py-2">
                          <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium ">
                            Employee Selection
                          </label>
                          <select className="select mt-1 flex w-full px-3 border border-gray-300 rounded-[14px] shadow-sm items-center text-[#7D8592] focus:outline-none">
                            <option disabled selected>
                              Mern Stack Developer
                            </option>
                            <option>Han Solo</option>
                            <option>Greedo</option>
                          </select>
                        </div>
                        <div className="mb-4 py-2">
                          <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
                            Assign Profile Code
                          </label>
                          <input
                            type="text"
                            name="code"
                            // value={form.code}
                            // onChange={handleChange}
                            placeholder="Assign Profile Code"
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
                            placeholder=" Add some Descriptionof"
                            className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px] min-h-[100px]"
                          />
                        </div>
                      </div>
                      <button className="btn text-white font-nunito w-[150px] px-2 py-3 bg-[#3F8CFF] rounded-xl">
                        Save
                      </button>
                    </form>
                  </div>
                </dialog>
                {/* filter button */}
                <div
                  className="w-12 h-12 py-1  bg-[white] flex items-center justify-center rounded-[15px] cursor-pointer z-20"
                  // onClick={showSideMenu}
                >
                  <FiFilter fontSize={20} />
                </div>
              </div>
            </div>

            <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
              {employees.map((employee, key) => (
                <EmployeesCard
                  key={key}
                  id={employee._id} //pass unique ID
                  image={employee.image ? employee.image : "/dummy-profile.png"}
                  name={employee.name}
                  profile={employee.profile}
                  depart={employee.department}
                  position={employee.designation}
                  updateEmployee={updateEmployee}
                  openEditModal={() => openEditModal(employee)} // Pass function to open modal
                />
              ))}

              {/* Edit Employee Modal */}
              {selectedEmployee && (
                <EditEmployeeModal
                  employee={selectedEmployee}
                  isOpen={isModalOpen}
                  onClose={closeEditModal}
                  onUpdate={handleUpdate}
                  update={fetchEmployees}
                />
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Employees;
