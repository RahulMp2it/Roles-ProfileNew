import axios from 'axios';
import React, { useState } from 'react';

function EditEmployeeModal({ employee, isOpen, onClose, onUpdate, update }) {
  // State management for employee fields
  const [employeeName, setEmployeeName] = useState(employee.name || "");
  const [employeeEmail, setEmployeeEmail] = useState(employee.email || "");
  const [employeePhone, setEmployeePhone] = useState(employee.phone || "");

  // Function to handle employee update
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedEmployee = {
        name: employeeName,
        email: employeeEmail,
        phone: employeePhone,
      };
      const response = await axios.put(
        `http://localhost:8080/api/employee/${employee._id}`,
        updatedEmployee
      );
      console.log("Employee updated successfully:", response.data);
      update(); // Refresh the employee list
      onUpdate(response.data); // Pass updated data to parent
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("There was an error updating the employee:", error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative bg-white p-6 rounded-lg shadow-lg w-full lg:w-[530px]">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
            style={{ zIndex: 1000 }}
          >
            ✕
          </button>

          {/* Form Title */}
          <div className="text-[20px] text-start px-4 py-4 font-bold">
            Edit Employee
          </div>

          {/* Edit Form */}
          <form onSubmit={handleEdit} className="px-4 pb-8">
            {/* Employee Name */}
            <div className="mb-4 py-2">
              <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium">
                Employee Name
              </label>
              <input
                type="text"
                name="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                placeholder="Enter Employee Name"
                className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                required
              />
            </div>

            {/* Employee Email */}
            <div className="mb-4 py-2">
              <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
                Employee Email
              </label>
              <input
                type="email"
                name="employeeEmail"
                value={employeeEmail}
                onChange={(e) => setEmployeeEmail(e.target.value)}
                placeholder="Enter Employee Email"
                className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                required
              />
            </div>

            {/* Employee Phone */}
            <div className="mb-4 py-2">
              <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
                Employee Phone
              </label>
              <input
                type="tel"
                name="employeePhone"
                value={employeePhone}
                onChange={(e) => setEmployeePhone(e.target.value)}
                placeholder="Enter Phone Number"
                pattern="^\d{10}$"
                className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                required
              />
            </div>

            {/* Save and Cancel Buttons */}
            <div className="flex justify-end">
              <button
                className="btn text-gray-500 font-nunito w-[100px] px-2 py-3 bg-gray-200 rounded-xl mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn text-white font-nunito w-[150px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default EditEmployeeModal;
