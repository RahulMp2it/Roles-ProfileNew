import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout";
import { PiArrowRightFill } from "react-icons/pi";

function ProfileDoc() {
  const UploadSkills = useRef();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedStage, setSelectedStage] = useState(null);
  const [showForum, setShowForum] = useState(false); // New state for showing the Forum

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
        "vedio",
        "vedio",
        "vedio",
        "vedio",
        "vedio",
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
              <button
                className="btn text-black font-nunito w-[125px] px-2 bg-[#D9D9D9] rounded-xl"
                onClick={() => UploadSkills.current.showModal()}
              >
                + Upload Skills
              </button>
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
                          <button className="hover:bg-[#3F8CFF] mt-2 hover:rounded-md hover:p-0.5 px-2"
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

            <dialog ref={UploadSkills} className="modal h-auto shadow-xl">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Upload Skills</h3>
                <div className="rounded-[8px]">
                  <input
                    type="text"
                    className="w-10 h-3 bg-white text-black "
                    placeholder="Write Your Skills Here"
                  />
                </div>
                <p className="text-white ">+ Add one more </p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                      className="btn w-[200px] h-4 bg-white text-[#3F8CFF]"
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

