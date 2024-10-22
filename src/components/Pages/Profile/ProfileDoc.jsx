import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../../Layout";
import { PiArrowRightFill } from "react-icons/pi";
import axios from "axios";

function ProfileDoc() {
  const UploadSkills = useRef();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedStage, setSelectedStage] = useState(null);
  const [showForum, setShowForum] = useState(false); // New state for showing the Forum
  const [modalType, setModalType] = useState(''); // Modal type (skills, stages, or roles)
  const [skills, setSkills] = useState([]);  // State to store the list of skills
  const [newSkill, setNewSkill] = useState('');  // State to store new skill input
  const [stages, setStages] = useState([]);
  const [roles, setRoles] = useState(['']);
  const UploadModal = useRef(null);
  const [showUpload, setShowUpload] = useState(null); // Controls which upload button to show
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get("profile_id")
  console.log(skills);

  const fetchSkills = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/skill");
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  // post a new skill 
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/skill", { skill: newSkill, profileId });
      //setSkills([...skills, response.data]);
      fetchSkills()
      // setNewSkill('');
    } catch (error) {
      console.error("Error creating new skill:", error);
    }
  };

  // Handle input change for the new skill
  const handleSkillInputChange = (e) => {
    setNewSkill(e.target.value);
  };

  // Fetch skills 
  useEffect(() => {
    fetchSkills();
  }, []);


  // Handle change for dynamic input
  const handleInputChange = (index, e, type) => {
    const newValue = e.target.value;
    if (type === 'skills') {
      const updatedSkills = [...skills];
      updatedSkills[index] = newValue;
      setSkills(updatedSkills);
    } else if (type === 'stages') {
      const updatedStages = [...stages];
      updatedStages[index] = newValue;
      setStages(updatedStages);
    } else if (type === 'roles') {
      const updatedRoles = [...roles];
      updatedRoles[index] = newValue;
      setRoles(updatedRoles);
    }
  };

  // Add new input field
  const handleAdd = (type) => {
    if (type === 'skills') {
      setSkills([...skills, '']);
    } else if (type === 'stages') {
      setStages([...stages, '']);
    } else if (type === 'roles') {
      setRoles([...roles, '']);
    }
  };

  // Open modal based on button clicked
  const handleOpenModal = (type) => {
    setModalType(type);
    setShowUpload(type); // Set the state to show relevant upload button
    UploadModal.current.showModal();
  };

  const getData = [
    {
      tabName: "skills",
      tabContent: [
        "Knowledge About Graphic Designing",
        "Knowledge About After Effect/Premium Pro",
        "Knowledge About 3D Animation",
        "Knowledge About Photoshop/Adobe/Illustration",
        "Knowledge About Figma/AdobeXD",
      ],
    },
    {
      tabName: "interview",
      tabContent: [
        { stage: "Stage 1 25 Minutes", questions: ["What do you mean by UI/UX Designer", "What do you mean by UI/UX Designer", "What do you mean by UI/UX Designer", "What do you mean by UI/UX Designer", "What do you mean by UI/UX Designer"] },
        { stage: "Stage 2 25 Minutes", questions: ["Q1", "Q2"] },
        { stage: "Stage 3 25 Minutes", questions: ["Q1"] },
        { stage: "Stage 4 25 Minutes", questions: ["Q1", "Q2"] },
        { stage: "Stage 5 25 Minutes", questions: ["Q1", "Q2", "Q3", "Q4"] },
      ],
    },
    {
      tabName: "Training Material",
      tabContent: [
        <div className="flex gap-20 ">
          <img src="vedioImg.png" alt="" className="h-32 w-32" />,
          <img src="vedioImg.png" alt="" className="h-32 w-32 " />,
          <img src="vedioImg.png" alt="" className="h-32 w-32" />,
          <img src="vedioImg.png" alt="" className="h-32 w-32" />,
        </div>
      ],
    },
    {
      tabName: "Role",
      tabContent: [
        "Knowledge About Graphic Designing",
        "Knowledge About After Effect/Premium Pro",
        "Knowledge About 3D Animation",
        "Knowledge About Photoshop/Adobe/Illustration",
        "Knowledge About Figma/AdobeXD",
      ],
    },
  ];

  const handleClick = (index) => {
    setActiveTab(index);
    setSelectedStage(null); // Reset selected stage when switching tabs
    setShowForum(false); // Reset forum when switching tabs
  };

  const handleStageClick = (stage) => {
    setSelectedStage(stage); // Update state when a specific stage is clicked
    setShowForum(false); // Close forum when stage is clicked
  };

  const handleForumClick = () => {
    setShowForum(true); // Show forum when clicked
  };

  // Render content based on modal type
  const renderModalContent = () => {
    if (modalType === 'skills') {
      return (
        <>
          <h3 className="text-white pl-3 text-lg pb-3">Upload Skills</h3>
          <form onSubmit={handleSkillSubmit}>  {/* Form for submitting new skill */}
            <input
              type="text"
              value={newSkill}  // Bind input to newSkill state
              onChange={handleSkillInputChange}  // Update state when input changes
              className="w-full h-11 rounded-xl bg-white text-black mb-2"
              placeholder="Write Your New Skill"
              required
            />
            <button type="submit" className="btn w-[150px] h-3 rounded-2xl bg-white text-[#3F8CFF]">
              Save Skill
            </button>
          </form>

          <div className="rounded-[8px] border-none">
            {/* {skills.map((skill, index) => (
              <input
                key={index}
                type="text"
                value={skill}
                onChange={(e) => handleInputChange(index, e, 'skills')}
                className="w-full h-11 rounded-xl bg-white text-black mb-2"
                placeholder={`Write Your Skill ${index + 1}`}
              />
            ))} */}
          </div>
          <p
            className="text-white text-center font-medium pt-3 cursor-pointer"
            onClick={() => handleAdd('skills')}
          >
            + Add one more
          </p>
        </>
      );
    } else if (modalType === 'stages') {
      return (
        <>
          <h3 className="text-white pl-3 text-lg pb-3">Upload Stages</h3>
          <div className="rounded-[8px] border-none">
            {stages.map((stage, index) => (
              <input
                key={index}
                type="text"
                value={stage}
                onChange={(e) => handleInputChange(index, e, 'stages')}
                className="w-full h-11 rounded-xl bg-white text-black mb-2"
                placeholder={`Write Your Stage ${index + 1}`}
              />
            ))}
          </div>
          <p
            className="text-white text-center font-medium pt-3 cursor-pointer"
            onClick={() => handleAdd('stages')}
          >
            + Add one more
          </p>
        </>
      );
    } else if (modalType === 'roles') {
      return (
        <>
          <h3 className="text-white pl-3 text-lg pb-3">Upload Role</h3>
          <div className="rounded-[8px] border-none">
            {roles.map((role, index) => (
              <input
                key={index}
                type="text"
                value={role}
                onChange={(e) => handleInputChange(index, e, 'roles')}
                className="w-full h-11 rounded-xl bg-white text-black mb-2"
                placeholder={`Write Your Role ${index + 1}`}
              />
            ))}
          </div>
          <p
            className="text-white text-center font-medium pt-3 cursor-pointer"
            onClick={() => handleAdd('roles')}
          >
            + Add one more
          </p>
        </>
      );
    }
  };

  return (
    <Layout>
      <div className=" fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2 ">
        <div className=" overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
          <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">
            "Welcome back, Rahul singh"
          </p>
          <div className="grid grid-cols-4 place-content-between gap-4">
            <div className="col-span-3 ">
              <h1 className="text-[34px] font-nunito font-semibold">Profile</h1>
            </div>

            <div className=" text-end">
              <button className="btn text-white font-nunito w-[200px] px-2 py-3 bg-[#3F8CFF] rounded-xl">
                + Upload Files
              </button>
            </div>
          </div>

          {/* main Container */}
          <div className="max-w-[1400px] mt-3 pl-3 pr-[20px] py-8 mx-auto rounded-[20px] bg-white">
            <div className="w-[1250px] h-20 bg-[#F4F9FD] flex items-center mb-5 rounded-[18px]">
              <div className="px-6">
                <p className="text-[#91929E] text-[12px]">Profile Name</p>
                <p className="text-[16px]">UI/UX Designer</p>
              </div>
              <div className="px-6">
                <p className="text-[#91929E] text-[12px]">Department</p>
                <p className="text-[16px]">Research & Development</p>
              </div>
              <div className="px-11">
                <p className="text-[#91929E] text-[12px]">Position</p>
                <p className="text-[16px]">None</p>
              </div>
              <div className="px-24">
                <p className="text-[#91929E] text-[12px]">Assigne</p>
                <img src="image2.png" className="w-5 h-5 " alt="" />
              </div>
            </div>
            <div>
              <div className="w-[1250px] h-14 bg-[#F4F9FD] flex items-center mb-5 rounded-[18px]">
                <div className="flex items-center">
                  {getData.map((data, i) => (

                    <div
                      key={i}
                      className={`text-[#91929E] text-[15px] px-6 ml-10 cursor-pointer transition-all duration-1000 ease ${activeTab === i ? "bg-blue-500 text-white font-bold rounded-[100px] py-4" : ""
                        }`}
                      onClick={() => handleClick(i)}
                    >
                      {data.tabName}
                    </div>
                  ))}
                </div>
              </div>

              {activeTab === 0 && (
                <button
                  className="btn text-black font-bold bg-[#D9D9D9]"
                  onClick={() => {
                    setShowUpload('skills');
                    handleOpenModal('skills');
                  }}
                >
                  + Upload Skills
                </button>
              )}
              {activeTab === 1 && (
                <button
                  className="btn text-black font-bold bg-[#D9D9D9]"
                  onClick={() => {
                    setShowUpload('stages');
                    handleOpenModal('stages');
                  }}
                >
                  + Upload Stages
                </button>
              )}
              {activeTab === 3 && (
                <button
                  className="btn text-black font-bold bg-[#D9D9D9]"
                  onClick={() => {
                    setShowUpload('roles');
                    handleOpenModal('roles');
                  }}
                >
                  + Upload Roles
                </button>
              )}
              {/* Conditionally rendering the button */}
              {selectedStage && (
                <button
                  className="btn text-black font-bold bg-[#D9D9D9] ml-60"
                  onClick={() => {
                    handleOpenModal('stageDescription');
                  }}
                >
                  + Upload Stage Description
                </button>
              )}
              {/* Conditionally rendering the button */}
              {showForum && (
                <button
                  className="btn text-black font-bold bg-[#D9D9D9] ml-60"
                  onClick={() => {
                    handleOpenModal('stageDescription');
                  }}
                >
                  + Upload Q&A
                </button>
              )}
              {/* content */}
              <div className="content-area p-4 bg-white rounded-md shadow-md">
                {activeTab === 1 && (
                  <p className="w-[423px] bg-[#3F8CFf] text-center text-white py-1">Stage & Time</p>
                )}
                {activeTab === 3 && (
                  <p className="w-[423px] bg-[#3F8CFf] text-center text-white py-1">Role</p>
                )}
                <div className="border-l-[10px] border-[#3F8CFF] flex W-[340px]">
                  <div className="w-[352px] ">
                    <ul>
                      {getData[activeTab].tabContent.map((content, idx) => (
                        <li
                          key={idx}
                          className="mb-2 py-4 font-bold text-sm cursor-pointer "
                          onClick={() =>
                            activeTab === 1 ? handleStageClick(content) : null
                          } // Enable click only for the "Interview" tab
                        >
                          <PiArrowRightFill className="inline text-[#3F8CFf] text-[22px] me-2" />{activeTab === 1 ? content.stage : content}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className=" -mt-8 flex ">
                    {selectedStage && (
                      <div className="w-[400px] border-l-[6px] border-[#3F8CFF] h-full">
                        <p className="w-full bg-[#3F8CFf] text-center text-white py-1">Stage Description</p>
                        <h3 className="text-lg font-bold mb-3"><PiArrowRightFill className="inline text-[#3F8CFf] text-[22px] me-2" />
                          <button className="hover:bg-[#3F8CFF] mt-2 hover:rounded-md hover:text-white px-2"
                            onClick={handleForumClick}>Forum</button></h3>
                        <div className="h-[400px] w-full top-0 overflow-y-auto text-white ml-3">
                          <ul>
                            {selectedStage.questions.map((question, idx) => (
                              <li key={idx} className="py-4 font-bold text-[11px]  bg-[#3F8CFF]">
                                <div className="ml-3">{question}</div>
                                <div className="mt-2">
                                  <label className="block mb-1"></label>
                                  <input
                                    className="w-[300px] p-2 border rounded-md ml-3 "
                                    rows="3"
                                    placeholder="Type your answer here..."
                                  />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Forum Panel */}
                    {showForum && (
                      <div className="w-full border-l-[6px] border-[#3F8CFF] h-[500px]  top-0 overflow-y-auto">
                        <p className="w-full bg-[#3F8CFf] text-center text-white py-1">Question & answer</p>
                        <h3 className="text-lg font-bold mb-3 "></h3>
                        <div className="h-[435px] top-0 overflow-y-auto text-white">
                          <ul className="pl-3 w-full" >
                            {selectedStage.questions.map((question, idx) => (
                              <li key={idx} className=" py-4 font-bold text-[11px] bg-[#3F8CFF]">
                                <div className="ml-3">{question}</div>

                                <div className="mt-2">
                                  <label className="block mb-1"></label>
                                  <input
                                    className="w-[300px] p-2 rounded-md ml-4 "
                                    rows="3"
                                    placeholder="Type your answer here..."
                                  />
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Modal */}
            <dialog ref={UploadModal} className="modal h-auto shadow-xl">
              <div className="modal-box bg-[#3F8CFF]">
                {renderModalContent()}

                <div className="modal-action">
                  <form method="dialog">
                    <button
                      className="btn w-[150px] h-3 rounded-2xl bg-white text-[#3F8CFF]"
                      type="submit"
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfileDoc;

