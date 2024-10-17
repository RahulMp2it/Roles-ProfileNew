import React, { useEffect, useRef, useState } from "react";
import ProfileAssignCard from "../../../utils/ProfileAssignCard";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout";
import axios from "axios";
import { useForm } from "react-hook-form";
import Select from 'react-select';

// const profileAssigns = [
//   {
//     id: 1,
//     name: "UI/UX Designer",
//     image: "image8.png",
//     depart: "Marketing Department",
//     position: "Executive",
//   },
//   {
//     id: 2,
//     name: "UI/UX Designer",
//     image: "image7.png",
//     depart: "Marketing Department",
//     position: "Executive",
//   },
//   {
//     id: 3,
//     name: "UI/UX Designer",
//     image: "image3.png",
//     depart: "Marketing Department",
//     position: "Executive",
//   },
//   {
//     id: 4,
//     name: "UI/UX Designer",
//     image: "image5.png",
//     depart: "Marketing Department",
//     position: "Executive",
//   },
//   {
//     id: 5,
//     name: "UI/UX Designer",
//     image: "image4.png",
//     depart: "Marketing Department",
//     position: "Executive",
//   },
//   {
//     id: 6,
//     name: "UI/UX Designer",
//     image: "image1.png",
//     depart: "Marketing Department",
//     position: "Executive",
//   },
//   {
//     id: 7,
//     name: "UI/UX Designer",
//     image: "image.png",
//     depart: "Marketing Department",
//     position: "Executive",
//   },
//   {
//     id: 8,
//     name: "UI/UX Designer",
//     image: "image8.png",
//     depart: "Marketing Department",
//     position: "Executive",
//   },
//   {
//     id: 9,
//     name: "UI/UX Designer",
//     image: "image1.png",
//     depart: "Marketing Department",
//     position: "Executive",
//   },
//   {
//     id: 10,
//     name: "UI/UX Designer",
//     image: "image4.png",
//     depart: "Marketing Department",
//     position: "Executive",
//   },
// ];

function ProfileAssign() {
  const navigate = useNavigate();
  const addProfile = useRef();
  const ProfileAssign = useRef();
  const [profiles, setProfiles] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  // Fetch profiles on component mount (this is the same as the Profile component)
  useEffect(() => {
    fetchProfiles();
    fetchDepartments();
    fetchDesignations();
    fetchEmployees();
  }, []);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/employee");
      setEmployees(response.data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Fetch profiles (same API as Profile component)
  const fetchProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/profile");
      setProfiles(response.data.data);
    } catch (error) {
      console.error("Error fetching profiles", error);
    }
  };

  // Fetch departments (optional, if needed for the form)
  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/department");
      setDepartments(response.data.data);
    } catch (error) {
      console.error("Error fetching departments", error);
    }
  };

  // Fetch designations (optional, if needed for the form)
  const fetchDesignations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/designation");
      setDesignations(response.data.data);
    } catch (error) {
      console.error("Error fetching designations", error);
    }
  };

  // Handle form data and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [form, setForm] = useState({
    employee: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
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
                Profile Assign
              </h1>
            </div>

            <div className=" text-end">
              <button
                className="btn text-white font-nunito w-[200px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
                onClick={() => ProfileAssign.current.showModal()}
              >
                + Profile Assign
              </button>
              <dialog ref={ProfileAssign} className="modal h-auto">
                <div className=" modal-box overflow-y-auto no-scrollbar lg:h-[calc(90vh-90px)]">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => ProfileAssign.current.close()}>
                    ✕
                  </button>
                  <form method="dialog modal-action" >
                    <div className="text-[20px] text-start px-4 py-4 font-bold">
                      Profile Assign
                    </div>
                    <div className="px-4 pb-8">
                      <div className="mb-4 py-2">
                        <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium">
                          Employee Selection
                        </label>
                        <select
                          {...register("employeeId", { required: "Employee is required" })}
                          name="employeeId"
                          value={form.employee}
                          onChange={handleChange}
                          className="select mt-1 flex w-full px-3 border border-gray-300 rounded-[14px] shadow-sm items-center text-[#7D8592] focus:outline-none"
                          required
                        >
                          <option value="" disabled>
                            Select Employee
                          </option>
                          {employees.map((employee) => (
                            <option key={employee._id} value={employee._id}>
                              {employee.name}
                            </option>
                          ))}
                        </select>
                        {errors.employee && (
                          <p className="text-red-600">{errors.employee.message}</p>
                        )}
                      </div>

                    </div>
                    <button
                      type="submit"
                      className="btn text-white font-nunito w-[150px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
                    >
                      Save Profile
                    </button>
                  </form>
                </div>
              </dialog>
            </div>
          </div>

          <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
            {profiles.map((profile, key) => (
              <ProfileAssignCard
                key={key}
                id={profile._id}
                image={profile.image || "/image2.png"}
                title={profile.Profile}
                depart={profile.department?.DepartmentName || "No Department"}
                position={profile.designation?.DesignationName || "No Designation"}
                buttonText="1 Member"

              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfileAssign;