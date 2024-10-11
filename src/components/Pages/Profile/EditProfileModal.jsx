import axios from 'axios';
import React, { useState } from 'react'

function EditProfileModal({ profile, isOpen, onClose, onUpdate, update }) {
  const [profileName, setProfileName] = useState(profile.Profile || "");
  const [designation, setDesignation] = useState(profile.designation || "");
  const [department, setDepartment] = useState(profile.Department || "");

  const handleEdit = async () => {
    try {
      const updatedProfile = {
        Profile: profileName,
        designation: designation,
        Department: department,
      };

      const response = await axios.put(
        `http://localhost:8080/api/profile/${profile._id}`,
        updatedProfile
      );

      console.log("Profile updated successfully:", response.data);
      update(); // Refresh profiles list
      onUpdate(response.data); // Pass updated data to parent
      onClose(); // Close modal after successful update
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

          <div className="mb-4">
            <label className="block text-sm">Profile Name</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
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

          <div className="mb-4">
            <label className="block text-sm">Department</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
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

export default EditProfileModal
