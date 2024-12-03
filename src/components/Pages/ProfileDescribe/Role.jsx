import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { PiArrowRightFill } from 'react-icons/pi';
import { useSearchParams } from 'react-router-dom';

function Role() {

  const [roles, setRoles] = useState([]);
  const [newRoles, setNewRoles] = useState(['']); // For uploading multiple roles
  const [newTasks, setNewTasks] = useState(['']);
  const [newInstructions, setNewInstructions] = useState(['']);
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get("profile_id")
  const roleModal = useRef(null);
  const [selectedRole, setSelectedRole] = useState(null); // To track the selected role
  const [tasks, setTasks] = useState([]); // To store tasks for the selected role
  const [instructions, setInstructions] = useState([]); // To store instructions for the selected role
  const taskModal = useRef(null); // Reference for the task modal
  const instructionModal = useRef(null); // Reference for the instruction modal
  const [showInstructions, setShowInstructions] = useState(false); // Track if instructions are visible
  // console.log(instructions);


  const fetchRoles = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/role/${profileId}`);
      //console.log('==>', response.data);
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching Roles:", error);
    }
  };

  // Fetch Tasks for a selected role
  const fetchTasksForRole = async (roleId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/task/${roleId}`); // Assuming you have a task API endpoint
      setTasks(response.data);

    } catch (error) {
      console.error('Error fetching Tasks:', error);
    }
  };

  // Fetch Instructions for a selected role
  const fetchInstructionsForRole = async (roleId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/instruction/${roleId}`);
      //console.log('==>', response.data);
      setInstructions(response.data);
    } catch (error) {
      console.error('Error fetching Instructions:', error);
    }
  };

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setShowInstructions(false); // Reset instructions visibility
    fetchTasksForRole(role._id); // Fetch tasks for the selected role
    fetchInstructionsForRole(role._id); // Fetch instructions for the selected role
  };

  const handleToggleInstructions = () => {
    setShowInstructions(!showInstructions); // Toggle instructions visibility
  };

  // post a new Role 
  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/role", { roles: newRoles, profileId });
      console.log(response);
      roleModal.current.close();
      fetchRoles([''])
    } catch (error) {
      console.error("Error creating new Roles:", error);
    }
  };

  // Handle Task Submit (adding a new task)
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) return alert('Please select a role first.');
    try {
      await axios.post('http://localhost:8080/api/task', {
        roleTasks: newTasks,
        roleId: selectedRole._id, // Link task to the selected role
      });
      taskModal.current.close();
      fetchTasksForRole(selectedRole._id); // Refresh tasks for the current role
      setNewTasks(['']); // Reset input fields
    } catch (error) {
      console.error('Error creating new Task:', error);
    }
  };

  // Add a new input field for tasks
  const handleAddFields = () => {
    setNewTasks((prev) => [...prev, '']);
  };

  // Handle input changes
  const handleInputChanges = (index, value) => {
    setNewTasks((prev) => {
      const updatedTasks = [...prev];
      updatedTasks[index] = value;
      return updatedTasks;
    });
  };


  const handleInstructionSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) return alert('Please select a role first.');
    try {
      await axios.post('http://localhost:8080/api/instruction', {
        roleInstruction: newInstructions,
        roleId: selectedRole._id,
      });
      instructionModal.current.close();
      fetchInstructionsForRole(selectedRole._id);
      setNewInstructions(['']); // Reset input fields

    } catch (error) {
      console.error('Error creating new Instruction:', error);
    }
  };

  // Fetch skills 
  useEffect(() => {
    fetchRoles();
  }, []);

  // Add a new input field
  const handleAddField = (setter, value) => {
    setter((prev) => [...prev, value]);
  };

  // Update an input field
  const handleInputChange = (setter, index, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  return (
    <div>

      <button
        className="text-black text-[15px] font-bold p-[5px] px-3 rounded-lg mt-3 mb-2 bg-[#D9D9D9]"
        onClick={() => roleModal.current.showModal()} >
        + Upload Role
      </button>

      {/* Upload Task Button */}

      {selectedRole && (
        <>
          <button
            className="text-black text-[15px] font-bold p-[5px] px-3 rounded-lg mt-3 mb-2 bg-[#D9D9D9] ml-[250px]"
            onClick={() => taskModal.current.showModal()}
          >
            + Upload Task
          </button>

          {showInstructions && (
            <button
              className="text-black text-[15px] font-bold p-[5px] px-3 rounded-lg mt-3 mb-2 bg-[#D9D9D9] ml-[250px]"
              onClick={() => instructionModal.current.showModal()}
            >
              + Upload Instruction
            </button>
          )}
        </>
      )}

      <p className="bg-[#3F8CFf] text-center text-white py-1 w-[362px]">Role</p>
      <div className='flex'>
        <div className="border-l-[10px] border-[#3F8CFF] flex W-[340px]">
          <div className="w-[352px] ">
            <ul>
              {
                roles && roles.map((role, key) => {
                  return (
                    <li key={key} className="mb-2 py-1.5 text-[11px] font-bold text-sm cursor-pointer " onClick={() => handleRoleClick(role)}>
                      <PiArrowRightFill className="inline text-[#3F8CFf] text-[22px] me-2" /> {role.role}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>


        {selectedRole && (
          <>
            <div className="-mt-8 border-l-[10px] border-[#3F8CFF] W-[340px]">
              <p className="bg-[#3F8CFf] text-center text-white py-1 mb-2 w-[350px]">Task</p>
              <h3 className="text-sm font-bold text-[black] cursor-pointer" onClick={handleToggleInstructions}><PiArrowRightFill className="inline text-[#3F8CFf] text-[22px] me-2" /> {selectedRole.role}</h3>
              <div className='bg-[#3F8CFF] ml-2 w-[320px] rounded-lg my-2 py-2'>
                <ul>
                  {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                      <li key={index} className="mb-2">
                        <div className=" text-white px-4">{task.roleTask}</div>
                      </li>
                    ))
                  ) : (
                    <p>No tasks available for this role.</p>
                  )}
                </ul>
              </div>
            </div>
            {showInstructions && (
              <div className="-mt-8 border-l-[10px] border-[#3F8CFF] W-[340px]">
                <p className="bg-[#3F8CFf] text-center text-white py-1 mb-2 w-[350px]">Instruction</p>
                <div className='bg-[#3F8CFF] ml-2 w-[320px] rounded-lg my-2 py-2'>
                  <ul>
                    {
                      instructions.length > 0 ? (
                        instructions.map((instruction, index) => (
                          <li key={index} className="mb-2">
                            <div className="text-white px-4">{instruction.roleInstruction}</div>
                          </li>
                        ))
                      ) : (
                        <p>No instructions available for this role.</p>
                      )
                    }
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div>
        {/* Modal */}
        <dialog ref={roleModal} className="modal h-auto shadow-xl">
          <div className="modal-box bg-[#3F8CFF]">
            <button
              className="btn btn-sm btn-circle btn-ghost text-white absolute right-2 top-2"
              onClick={() => roleModal.current.close()}
            >
              ✕
            </button>
            <h3 className="text-white pl-3 text-lg pb-3">Upload Role</h3>
            <form onSubmit={handleRoleSubmit}>
              {newRoles.map((role, index) => (
                <input
                  key={index}
                  type="text"
                  value={role}
                  onChange={(e) => handleInputChange(setNewRoles, index, e.target.value)}
                  className="w-full h-11 rounded-xl bg-white text-black mb-2"
                  placeholder={`Write Role ${index + 1}`}
                  required
                />
              ))}
              <button
                type="button"
                className="text-sm text-white bg-blue-500 px-3 py-1 rounded-lg mb-2"
                onClick={() => handleAddField(setNewRoles, '')}
              >
                + Add More
              </button>
              <div className="modal-action">
                <button className="btn w-[150px] h-3 rounded-2xl bg-white text-[#3F8CFF]" type="submit">
                  Save
                </button>
              </div>
            </form>

          </div>
        </dialog>


        {/* Upload Task Modal */}
        <dialog ref={taskModal} className="modal h-auto shadow-xl">
          <div className="modal-box bg-[#3F8CFF]">
            <button
              className="btn btn-sm btn-circle btn-ghost text-white absolute right-2 top-2"
              onClick={() => taskModal.current.close()}
            >
              ✕
            </button>
            <h3 className="text-white pl-3 text-lg pb-3">Upload Task for {selectedRole?.role}</h3>
            <form onSubmit={handleTaskSubmit}>
              {newTasks.map((task, index) => (
                <input
                  key={index}
                  type="text"
                  value={task}
                  onChange={(e) => handleInputChanges(index, e.target.value)}
                  className="w-full h-11 rounded-xl bg-white text-black mb-2"
                  placeholder={`Write Your Task`}
                  required
                />
              ))}

              <button
                type="button"
                className="text-sm text-white bg-blue-500 px-3 py-1 rounded-lg mb-2"
                onClick={handleAddFields}
              >
                + Add More
              </button>

              <div className="modal-action">
                <button className="btn w-[150px] h-3 rounded-2xl bg-white text-[#3F8CFF]" type="submit">
                  Save
                </button>
              </div>
            </form>

          </div>
        </dialog>

        <dialog ref={instructionModal} className="modal h-auto shadow-xl">
          <div className="modal-box bg-[#3F8CFF]">
            <button
              className="btn btn-sm btn-circle btn-ghost text-white absolute right-2 top-2"
              onClick={() => instructionModal.current.close()}
            >
              ✕
            </button>
            <h3 className="text-white pl-3 text-lg pb-3">Upload Instruction for {selectedRole?.role}</h3>
            <form onSubmit={handleInstructionSubmit}>
              {newInstructions.map((instruction, index) => (
                <input
                  key={index}
                  type="text"
                  value={instruction}
                  onChange={(e) => setNewInstructions(e.target.value)}
                  className="w-full h-11 rounded-xl bg-white text-black mb-2"
                  placeholder="Write Your Instruction"
                  required
                />
              ))}
              <button
                type="button"
                className="text-sm text-white bg-blue-500 px-3 py-1 rounded-lg mb-2"
                //onClick={handleAddInsFields}
              >
                + Add More
              </button>
              <div className="modal-action">
                <button className="btn w-[150px] h-3 rounded-2xl bg-white text-[#3F8CFF]" type="submit">
                  Save
                </button>
              </div>
            </form>

          </div>
        </dialog>

      </div>

    </div>
  )
}

export default Role
