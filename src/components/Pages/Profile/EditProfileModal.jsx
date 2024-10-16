import axios from 'axios';
import React, { useEffect, useState } from 'react'

function EditProfileModal({ profile, isOpen, onClose, onUpdate, update }) {
  const [form, setForm] = useState({
    Profile: profile.Profile || "",
    designation: profile.designation || "",
    department: profile.Department || "",
    description: profile.description || "",
  });
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  // Handle form submission to update profile
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = {
        Profile: form.Profile,
        designation: form.designation,
        department: form.department,
        //description: form.description,
      };

      const response = await axios.put(
        `http://localhost:8080/api/profile/${profile._id}`,
        updatedProfile
      );

      console.log("Profile updated successfully:", response.data);
      update(); // Refresh profile list
      onUpdate(response.data); // Pass updated profile back
      onClose(); // Close modal after successful update
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchDesignations();
  }, []);

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
    } catch (error) {
      console.error("Error fetching designations", error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative bg-white p-6 rounded-lg shadow-lg w-full lg:w-[530px]">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
            style={{ zIndex: 1000 }}
          >
            ✕
          </button>
          <div className="text-[20px] text-start px-4 py-4 font-bold">
            Edit Profile
          </div>
          <form onSubmit={handleEdit} className="px-4 pb-8">
            <div className="mb-4 py-2">
              <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium">
                Department Type
              </label>
              <select
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
            </div>

            <div className="mb-4 py-2">
              <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium">
                Designation Type
              </label>
              <select
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
                  <option key={designation._id} value={designation._id}>
                    {designation.DesignationName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4 py-2">
              <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
                Profile Name
              </label>
              <input
                type="text"
                name="Profile"
                value={form.Profile}
                onChange={handleChange}
                placeholder="Profile Name"
                className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                required
              />
            </div>

            <div className="mb-6 py-2">
              <label className="block text-start text-[12px] pb-1 font-medium text-[#7D8592]">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Add some Description of the Designation"
                className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px] min-h-[100px]"
              />
            </div>

            <button
              type="submit"
              className="btn text-white font-nunito w-[150px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    )
  )
}

export default EditProfileModal
