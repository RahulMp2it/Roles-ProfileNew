import React, { useEffect, useRef, useState } from "react";
import ProfileCard from "../../../utils/ProfileCard";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout";
import axios from "axios";
import { useForm } from "react-hook-form";
import EditProfileModal from "./EditProfileModal";

function Profile() {
  const navigate = useNavigate();
  const addProfile = useRef();
  const [profiles, setProfiles] = useState([]);
  const [activeCardId, setActiveCardId] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const updateProfile = useRef();

  // Fetch profiles from backend on component mount
  useEffect(() => {
    fetchProfiles();
    fetchDepartments();
    fetchDesignations();
  }, []);

  // Fetch all profiles
  const fetchProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/profile");

      setProfiles(response.data.data);
    } catch (error) {
      console.error("Error fetching profiles", error);
    }
  };

  // Fetch departments from backend
  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/department");
      setDepartments(response.data.data);
    } catch (error) {
      console.error("Error fetching departments", error);
    }
  };

  // Fetch designations from backend
  const fetchDesignations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/designation");
      setDesignations(response.data.data);
      console.log('designation', response.data.data);
    } catch (error) {
      console.error("Error fetching designations", error);
    }
  };

  // Open edit modal and set selected profile
  const openEditModal = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedProfile(null);
  };

  const handleUpdate = (updatedProfile) => {
    // Update the Profiles state after editing
    setProfiles((prevProfiles) =>
      prevProfiles.map((pro) =>
        pro.id === updatedProfile.id ? updatedProfile : pro
      )
    );
  };

  // Form state for adding a new profile
  const [form, setForm] = useState({
    Profile: "",
    designation: "",
    department: "",
  });

  // Handle form data and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Add a new profile
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/api/profile", {
        Profile: data.Profile,
        designation: data.designation,
        department: data.department,
      });
      console.log("Profile added successfully", response.data);
      addProfile.current.close();
      fetchProfiles(); // Refresh profile list
      reset();

    } catch (error) {
      console.error("Error adding profile", error);
    }
  };

  // Delete Card From database
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/profile/${id}`)
      .then((response) => {
        console.log("Employee deleted successfully:", response.data);
        updateProfiles();
      })
      .catch((error) => {
        console.error("There was an error deleting the employee:", error);
      });
  };

  // Update function to refresh the profiles list after delete
  const updateProfiles = () => {
    fetchProfiles();
  };

  const handleClick = (profile) => {

    setActiveCardId(profile._id);
    navigate("/profileDescribe", {
      state: {
        profileName: profile.Profile,
        department: profile.department?.DepartmentName || "No Department",
        designation: profile.designation?.DesignationName || "No Designation",
      },
    });
  };

  return (
    <Layout>
      <div className=" fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2 z-10">
        <div className=" overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
          <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">
            "Welcome back, Rahul singh"
          </p>
          <div className="grid grid-cols-4 place-content-between gap-4">
            <div className="col-span-3 ">
              <h1 className="text-[34px] font-nunito font-semibold">Profile</h1>
            </div>

            <div className=" text-end">
              <button
                className="btn text-white font-nunito w-[200px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
                onClick={() => addProfile.current.showModal()}
              >
                + Add Profile
              </button>
              <dialog ref={addProfile} className="modal h-auto ">
                <div className=" modal-box overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => addProfile.current.close()}
                  >
                    ✕
                  </button>
                  <form
                    method="dialog modal-action"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="text-[20px] text-start px-4 py-4 font-bold">
                      Add Profile
                    </div>
                    <div className="px-4 pb-8">
                      <div className="mb-4 py-2">
                        <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium ">
                          Type of Department
                        </label>
                        <select
                          {...register("department", {
                            required: "Department name is required",
                          })}
                          name="department"
                          value={form.department}
                          onChange={handleChange}
                          className="select mt-1 flex w-full px-3 border border-gray-300 rounded-[14px] shadow-sm items-center text-[#7D8592] focus:outline-none"
                          required
                        >
                          <option value="" disabled>
                            Select Department
                          </option>
                          {departments.map((department) => (
                            <option key={department._id} value={department._id}>
                              {department.DepartmentName}

                            </option>
                          ))}
                        </select>
                        {errors.department && (
                          <p className="text-red-600">
                            {errors.department.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-4 py-2">
                        <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium ">
                          Designation Type
                        </label>
                        <select
                          {...register("designation", {
                            required: "Designation type is required",
                          })}
                          name="designation"
                          value={form.designation}
                          onChange={handleChange}
                          className="select mt-1 flex w-full px-3 border border-gray-300 rounded-[14px] shadow-sm items-center text-[#7D8592] focus:outline-none"
                          required
                        >
                          <option value="" disabled>
                            Select designation
                          </option>
                          {designations.map((designation) => (
                            <option
                              key={designation._id}
                              value={designation._id
                              }
                            >
                              {designation.
                                DesignationName
                              }
                            </option>
                          ))}
                        </select>
                        {errors.designation && (
                          <p className="text-red-600">
                            {errors.designation.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-4 py-2">
                        <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
                          Profile Name
                        </label>
                        <input
                          {...register("Profile", {
                            required: "Profile name is required",
                            minLength: {
                              value: 3,
                              message:
                                "Profile name must be at least 3 characters",
                            },
                            maxLength: {
                              value: 50,
                              message:
                                "Profile name can't exceed 50 characters",
                            },
                            pattern: {
                              value: /^[A-Za-z\s]+$/i,
                              message: "not valid number not allowed",
                            },
                          })}
                          type="text"
                          name="Profile"
                          value={form.Profile}
                          onChange={handleChange}
                          placeholder="Profile Name"
                          className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                          required
                        />
                        {errors.Profile && (
                          <p className="text-red-600">
                            {errors.Profile.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-6 py-2">
                        <label className="block text-start text-[12px] pb-1 font-medium text-[#7D8592]">
                          Description
                        </label>
                        <textarea
                          {...register("description")}
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                          placeholder=" Add some Descriptionof the Designtion"
                          className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px] min-h-[100px]"
                        />
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
              <ProfileCard
                key={key}
                id={profile._id}
                image={profile.image || "/image2.png"}
                title={profile.Profile}
                depart={profile.department?.DepartmentName || "No Department"}
                position={profile.designation?.DesignationName || "No Designation"}
                buttonText="view"
                handleDelete={handleDelete}
                updateEmployee={updateProfile}
                openEditModal={() => openEditModal(profile)} // Pass function to open modal
                onClick={handleClick}
              />
            ))}

            {/* Edit Profile Modal */}
            {selectedProfile && (
              <EditProfileModal
                profile={selectedProfile}
                isOpen={isModalOpen}
                onClose={closeEditModal}
                onUpdate={handleUpdate}
                update={fetchProfiles}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
