// import React, { useRef, useState } from "react";
// import Card from "../../../utils/Card";
// import { Link, useNavigate } from "react-router-dom";
// import { FaArrowLeftLong } from "react-icons/fa6";
// import Layout from "../../Layout";

// const departments = [
//   // {
//   //   id: 1,
//   //   name: "R&D Department",
//   //   image: "image.png",
//   //   url: "/SubDepartment",
//   // },
//   // {
//   //   id: 2,
//   //   name: "Business Management Department",
//   //   image: "image1.png",
//   //   url: "/SubDepartment",
//   // },
//   // {
//   //   id: 3,
//   //   name: "Marketing Department",
//   //   image: "image7.png",
//   //   url: "/SubDepartment",
//   // },
//   // {
//   //   id: 4,
//   //   name: "Sales Department",
//   //   image: "image3.png",
//   //   url: "/SubDepartment",
//   // },
//   // {
//   //   id: 5,
//   //   name: "Operation Department",
//   //   image: "image4.png",
//   //   url: "/SubDepartment",
//   // },
//   // {
//   //   id: 6,
//   //   name: "Accounts Department",
//   //   image: "image5.png",
//   //   url: "/SubDepartment",
//   // },
//   // {
//   //   id: 7,
//   //   name: "HR Department",
//   //   image: "image.png",
//   //   url: "/SubDepartment",
//   // },
//   // {
//   //   id: 8,
//   //   name: "IT & Maintenance Department",
//   //   image: "image8.png",
//   //   url: "/SubDepartment",
//   // },
// ];

// const Department = () => {
//   const navigate = useNavigate();
//   const addDepartment = useRef();
//   const [form, setForm] = useState({ department: "" });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { department, value } = e.target;
//     setForm({ ...form, [department]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/department",
//         { name: form.department }
//       );

//       if (response.status === 201) {
//         alert("Department added successfully!");
//         addDepartment.current.close();
//         setForm({ department: "" });
//       }
//     } catch (error) {
//       console.error("Error adding department:", error);
//       alert("Failed to add department");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBackClick = () => {
//     navigate(-1); // Go back to the previous page
//   };

//   return (
//     <Layout>
//       <div>
//         <div className=" fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2 ">
//           <div className=" overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
//             <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">
//               "Welcome back, Rahul singh"
//             </p>
//             <div className="grid grid-cols-4 place-content-between gap-4">
//               <div className="col-span-3 ">
//                 <h1 className="text-[34px] font-nunito font-semibold">
//                   Department
//                 </h1>
//               </div>

//               <div className="text-end">
//                 <button
//                   className="btn text-white font-nunito w-[200px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
//                   onClick={() => addDepartment.current.showModal()}
//                 >
//                   + Add more Department
//                 </button>
//                 <dialog ref={addDepartment} className="modal h-auto">
//                   <div className=" modal-box">
//                     <form method="dialog modal-action" onSubmit={handleSubmit}>
//                       <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
//                         ✕
//                       </button>
//                       <div className="text-[20px] text-start px-4 py-4 font-bold">
//                         Add Deparment
//                       </div>
//                       <div className="px-4 pb-8">
//                         <div className="mb-4 py-2">
//                           <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium ">
//                             Department Name
//                           </label>
//                           <input
//                             type="text"
//                             name="department"
//                             value={form.department}
//                             onChange={handleChange}
//                             placeholder="Department name"
//                             className="mt-1 flex w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm items-center focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
//                           />
//                         </div>
//                         {/* <div className="mb-4 py-2">
//                           <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
//                             Department Code
//                           </label>
//                           <input
//                             type="text"
//                             name="code"
//                             // value={form.code}
//                             // onChange={handleChange}
//                             placeholder="Department code"
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
//                         </div> */}
//                       </div>
//                       <button
//                         className="btn text-white font-nunito w-[150px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
//                         disabled={loading}
//                       >
//                         {loading ? "Saving..." : "Save Department"}
//                       </button>
//                     </form>
//                   </div>
//                 </dialog>
//               </div>
//             </div>

//             <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
//               {departments.map((department) => (
//                 <Card
//                   key={department.id}
//                   image={department.image || "/dummy-profile.png"}
//                   title={department.name}
//                   buttonText="1 Member"
//                   // url={department.url}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Department;

import React, { useRef, useState, useEffect } from "react";
import axios from "axios"; // Import axios
import Card from "../../../utils/Card";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout";

const Department = () => {
  const navigate = useNavigate();
  const addDepartment = useRef();
  const [form, setForm] = useState({ DepartmentName: "" });
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/department",
        { DepartmentName: form.DepartmentName }
      );

      if (response.status === 201) {
        alert("Department added successfully!");
        addDepartment.current.close();
        setForm({ DepartmentName: "" });
        fetchDepartments();
      }
    } catch (error) {
      console.error("Error adding department:", error);
      alert("Failed to add department");
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/department");
      setDepartments(response.data.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      alert("Failed to fetch departments");
    }
  };

  return (
    <Layout>
      <div className="fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2 ">
        <div className="overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
          <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">
            "Welcome back, Rahul Singh"
          </p>
          <div className="grid grid-cols-4 place-content-between gap-4">
            <div className="col-span-3 ">
              <h1 className="text-[34px] font-nunito font-semibold">
                Department
              </h1>
            </div>

            <div className="text-end">
              <button
                className="btn text-white font-nunito w-[200px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
                onClick={() => addDepartment.current.showModal()}
              >
                + Add more Department
              </button>
              <dialog ref={addDepartment} className="modal h-auto">
                <div className="modal-box">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                  <form method="dialog modal-action" onSubmit={handleSubmit}>
                    <div className="text-[20px] text-start px-4 py-4 font-bold">
                      Add Department
                    </div>
                    <div className="px-4 pb-8">
                      <div className="mb-4 py-2">
                        <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium ">
                          Department Name
                        </label>
                        <input
                          type="text"
                          name="DepartmentName"
                          value={form.DepartmentName}
                          onChange={handleChange}
                          placeholder="Department name"
                          className="mt-1 flex w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm items-center focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                          required
                        />
                      </div>
                    </div>
                    <button
                      className="btn text-white font-nunito w-[150px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Department"}
                    </button>
                  </form>
                </div>
              </dialog>
            </div>
          </div>

          <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
            {departments.map((department) => (
              <Card
                key={department._id}
                image={department.image || "/image1.png"}
                title={department.DepartmentName}
                buttonText="1 Member"
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Department;
