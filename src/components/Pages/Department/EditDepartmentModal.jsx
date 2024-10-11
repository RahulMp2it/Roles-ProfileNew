import axios from 'axios';
import React, { useState } from 'react'

function EditDepartmentModal({ department, isOpen, onClose, onUpdate, update }) {

  const [departmentName, setDepartmentName] = useState(department.DepartmentName || "");

  const handleEdit = async () => {
    try {
      const updatedDepartment = { DepartmentName: departmentName };
      const response = await axios.put(
        `http://localhost:8080/api/department/${department._id}`,
        updatedDepartment
      );
      console.log("Department updated successfully:", response.data);
      update(); // Refresh the departments list
      onUpdate(response.data); // Pass updated data to parent
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("There was an error updating the department:", error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">Edit Department</h2>

          <div className="mb-4">
            <label className="block text-sm">Department Name</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
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

export default EditDepartmentModal
