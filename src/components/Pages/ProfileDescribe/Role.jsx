import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { PiArrowRightFill } from 'react-icons/pi';
import { useSearchParams } from 'react-router-dom';

function Role() {

  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get("profile_id")
  const roleModal = useRef(null);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/role/${profileId}`);
      //console.log('==>', response.data);
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching Roles:", error);
    }
  };

  // post a new Role 
  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/role", { role: newRole, profileId });
      console.log(response);
      fetchRoles()
    } catch (error) {
      console.error("Error creating new Role:", error);
    }
  };

  // Fetch skills 
  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div>
      <button
        className="text-black text-[15px] font-bold p-[5px] px-3 rounded-lg mt-3 mb-2 bg-[#D9D9D9]"
        onClick={() => roleModal.current.showModal()} >
        + Upload Role
      </button>

      <div className="border-l-[10px] border-[#3F8CFF] mt-3 flex W-[340px]">
        <div className="w-[352px] ">
          <ul>

            {
              roles && roles.map((role, key) => {
                return (
                  <li key={key} className="mb-2 py-1.5 text-[11px] font-bold text-sm cursor-pointer ">
                    <PiArrowRightFill className="inline text-[#3F8CFf] text-[22px] me-2" /> {role.role}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>

      <div>
        {/* Modal */}
        <dialog ref={roleModal} className="modal h-auto shadow-xl">
          <div className="modal-box bg-[#3F8CFF]">
            <h3 className="text-white pl-3 text-lg pb-3">Upload Role</h3>
            <form onSubmit={handleRoleSubmit}>
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full h-11 rounded-xl bg-white text-black mb-2"
                placeholder={`Write Your Role`}
                required
              />
            </form>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn w-[150px] h-3 rounded-2xl bg-white text-[#3F8CFF]" type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

    </div>
  )
}

export default Role
