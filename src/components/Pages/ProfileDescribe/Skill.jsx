import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { PiArrowRightFill } from 'react-icons/pi';
import { useSearchParams } from 'react-router-dom';

function Skill() {
  const [skills, setSkills] = useState([]);
  const [skillList, setSkillList] = useState(['']); // Array of skills
  const [currentSkill, setCurrentSkill] = useState(null); // Track skill being edited
  const [isEditMode, setIsEditMode] = useState(false); // Track modal mode
  const [selectedSkill, setSelectedSkill] = useState(null); // For editing a skill
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get("profile_id")
  const skillModal = useRef(null);

  const fetchSkills = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/skill/${profileId}`);
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  // post a new skill 
  // const handleSkillSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:8080/api/skill", { skills: skillList, profileId });
  //     console.log(response);
  //     skillModal.current.close();
  //     fetchSkills()
  //     setSkillList([""]); // Reset input fields
  //   } catch (error) {
  //     console.error("Error creating new skill:", error);
  //   }
  // };

  // Add or Update a Skill
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode && currentSkill) {
         // Edit existing skill
        await axios.put(`http://localhost:8080/api/skill/${currentSkill._id}`, {
          skill: skillList[0], // Only send the updated skill
        });
      } else {
        // Add new skills
        await axios.post("http://localhost:8080/api/skill", { skills: skillList, profileId });
      }
      skillModal.current.close();
      fetchSkills();
      setSkillList([""]);
      setIsEditMode(false); // Reset to create mode
      setCurrentSkill(null); // Clear current skill
    } catch (error) {
      console.error("Error saving skill:", error);
    }
  };

  const handleEdit = (skill) => {
    setIsEditMode(true); // Switch to edit mode
    setCurrentSkill(skill); // Set current skill being edited
    setSkillList([skill.skill]); // Populate the modal input with the selected skill
    skillModal.current.showModal();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/skill/${id}`);
      fetchSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const addSkillField = () => {
    setSkillList([...skillList, ""]);
  };

  const removeSkillField = (index) => {
    const updatedList = skillList.filter((_, i) => i !== index);
    setSkillList(updatedList);
  };
  const handleSkillChange = (index, value) => {
    const updatedList = [...skillList];
    updatedList[index] = value;
    setSkillList(updatedList);
  };


  // Fetch skills 
  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div>
      <button
        className="text-black text-[15px] font-bold p-[5px] px-3 rounded-lg mt-3 mb-2 bg-[#D9D9D9]"
        onClick={() => {
          setIsEditMode(false); // Switch to create mode
          setSkillList([""]); // Reset input fields
          skillModal.current.showModal()
        }} >
        + Upload Skills
      </button>

      <div className="border-l-[10px] border-[#3F8CFF] mt-3 flex W-[340px]">
        <div className="w-[352px] ">
          <ul>

            {skills &&
              skills.map((skill) => (
                <li
                  key={skill._id}
                  className="mb-2 py-1.5 text-[11px] font-bold text-sm flex items-center justify-between"
                >
                  <span>
                    <PiArrowRightFill className="inline text-[#3F8CFf] text-[22px] me-2" />
                    {skill.skill}
                  </span>
                  <div>
                    <FiEdit
                      className="text-blue-500 cursor-pointer mr-3 inline text-[18px]"
                      onClick={() => handleEdit(skill)}
                    />
                    <FiTrash2
                      className="text-red-500 cursor-pointer inline text-[18px]"
                      onClick={() => handleDelete(skill._id)}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div>
        {/* Modal */}
        <dialog ref={skillModal} className="modal h-auto shadow-xl">
          <div className="modal-box bg-[#3F8CFF]">
            <button
              className="btn btn-sm btn-circle btn-ghost text-white absolute right-2 top-2"
              onClick={() => {
                skillModal.current.close();
              }}
            >
              ✕
            </button>
            <h3 className="text-white pl-3 text-lg pb-3">
              {isEditMode ? "Edit Skill" : "Upload Skill"}
            </h3>
            <form onSubmit={handleSkillSubmit}>

              {skillList.map((skill, index) => (
                <div key={index} className="flex items-center mb-2 relative ">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="w-full h-11 rounded-xl bg-white text-black pr-10"
                    placeholder={`Write Skill ${index + 1}`}
                    required
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-600 font-bold"
                      onClick={() => removeSkillField(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
 
               {/* Show "Add More" button only in create mode */}
              {!isEditMode && (
                <button
                  type="button"
                  className="text-sm text-white bg-blue-500 px-3 py-1 rounded-lg mb-2 "
                  onClick={() => setSkillList([...skillList, ""])}
                >
                  + Add More
                </button>
              )}

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

export default Skill
