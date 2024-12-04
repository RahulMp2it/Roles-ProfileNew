import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { PiArrowRightFill } from 'react-icons/pi';
import { useSearchParams } from 'react-router-dom';

function Skill() {
  const [skills, setSkills] = useState([]);
  const [skillList, setSkillList] = useState(['']); // Array of skills
  const [newSkill, setNewSkill] = useState('');
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
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/skill", { skills: skillList, profileId });
      console.log(response);
      skillModal.current.close();
      fetchSkills()
      setSkillList([""]); // Reset input fields
    } catch (error) {
      console.error("Error creating new skill:", error);
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
        onClick={() => skillModal.current.showModal()} >
        + Upload Skills
      </button>

      <div className="border-l-[10px] border-[#3F8CFF] mt-3 flex W-[340px]">
        <div className="w-[352px] ">
          <ul>

            {
              skills && skills.map((skill, key) => {
                return (
                  <li key={key} className="mb-2 py-1.5 text-[11px] font-bold text-sm cursor-pointer ">
                    <PiArrowRightFill className="inline text-[#3F8CFf] text-[22px] me-2" /> {skill.skill}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>

      <div>
        {/* Modal */}
        <dialog ref={skillModal} className="modal h-auto shadow-xl">
          <div className="modal-box bg-[#3F8CFF]">
            <button
              className="btn btn-sm btn-circle btn-ghost text-white absolute right-2 top-2"
              onClick={() => skillModal.current.close()}
            >
              ✕
            </button>
            <h3 className="text-white pl-3 text-lg pb-3">Upload Skill</h3>
            <form onSubmit={handleSkillSubmit}>
            {skillList.map((skill, index) => (
              <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="w-full h-11 rounded-xl bg-white text-black mb-2"
                placeholder={`Write Skill ${index + 1}`}
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  className="text-red-600 font-bold"
                  onClick={() => removeSkillField(index)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
                type="button"
                className="text-sm text-white bg-blue-500 px-3 py-1 rounded-lg mb-2 "
                onClick={addSkillField}
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

export default Skill
