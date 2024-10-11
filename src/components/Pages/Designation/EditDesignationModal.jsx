import axios from 'axios';
import React, { useState } from 'react'

function EditDesignationModal({ designation, isOpen, onClose, onUpdate, update }) {
  const [designationName, setDesignationName] = useState(designation.DesignationName || "");
  const [departmentName, setDepartmentName] = useState(designation.DepartmentName || "");

  const handleEdit = async () => {
    try {
      const updatedDesignation = {
        DesignationName: designationName,
        DepartmentName: departmentName,
      };

      const response = await axios.put(
        `http://localhost:8080/api/designation/${designation._id}`,
        updatedDesignation
      );

      console.log("Designation updated successfully:", response.data);
      update(); // Refresh the designations list
      onUpdate(response.data); // Pass updated data to parent
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating designation:", error);
    }
  };
  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">Edit Designation</h2>

          <div className="mb-4">
            <label className="block text-sm">Designation Name</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={designationName}
              onChange={(e) => setDesignationName(e.target.value)}
            />
          </div>

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
  )
}

export default EditDesignationModal
