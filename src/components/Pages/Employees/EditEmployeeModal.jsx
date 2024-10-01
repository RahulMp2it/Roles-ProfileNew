import React, { useState } from "react";
import axios from "axios";

function EditEmployeeModal({ employee, isOpen, onClose, onUpdate, update }) {
  const [name, setName] = useState(employee.name || "");
  const [designation, setDesignation] = useState(employee.designation || "");
  const [department, setDepartment] = useState(employee.department || "");
  const [profile, setProfile] = useState(employee.profile || "");

  const handleEdit = async () => {
    try {
      const updatedEmployee = { name, designation, department, profile };
      const response = await axios.put(
        `http://localhost:8080/api/employee/${employee._id}`,
        updatedEmployee
      );
      console.log("Employee updated successfully:", response.data);
      update();
      onUpdate(response.data); // Call the onUpdate function to update the employee list in the parent
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("There was an error updating the employee:", error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>

          <div className="mb-4">
            <label className="block text-sm">Name</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Profile</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={profile}
              onChange={(e) => setProfile(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm">Department</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm">Designation</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleEdit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default EditEmployeeModal;
