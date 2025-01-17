import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { PiArrowRightFill } from 'react-icons/pi';
import { useSearchParams } from 'react-router-dom';
import { WiTime5 } from "react-icons/wi";
import { FiEdit, FiTrash2 } from 'react-icons/fi';

function Interview() {
  const [interviews, setInterviews] = useState([]);
  const [stages, setStages] = useState([{ stage: '', time: '' }]); // Array for stages with times
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get("profile_id")
  const interviewModal = useRef(null);
  const [currentStage, setCurrentStage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchInterviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/interview/${profileId}`);
      setInterviews(response.data);
      //console.log("data is ", response.data);
    } catch (error) {
      console.error("Error fetching Interview :", error);
    }
  };

  // const handleInterviewSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     for (const stageObj of stages) {
  //       await axios.post(`http://localhost:8080/api/interview/stage/${profileId}`, {
  //         stage: stageObj.stage,
  //         time: stageObj.time,
  //       });
  //     }
  //     interviewModal.current.close();
  //     fetchInterviews(); // Refresh the list after posting
  //     setStages([{ stage: '', time: '' }]); // Reset input fields
  //   } catch (error) {
  //     console.error("Error creating new Interview:", error.response?.data || error.message);
  //   }
  // };

  // Handle Submit

  const handleInterviewSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode && currentStage) {
        console.log("Stage ID:", currentStage._id); // Debug log
        console.log("Interview ID:", profileId); // Debug log
        // Update stage
        await axios.put(`http://localhost:8080/api/interview/stage/${profileId}/${currentStage._id}`, {
          stage: stages[0].stage,
          time: stages[0].time,
        });
      } else {
        // Add new stages
        for (const stageObj of stages) {
          await axios.post(`http://localhost:8080/api/interview/stage/${profileId}`, {
            stage: stageObj.stage,
            time: stageObj.time,
          });
        }
      }

      interviewModal.current.close();
      fetchInterviews(); // Refresh the list
      resetModal();
    } catch (error) {
      console.error('Error saving stage:', error.response?.data || error.message);
    }
  };

  const resetModal = () => {
    setStages([{ stage: '', time: '' }]);
    setIsEditMode(false);
    setCurrentStage(null);
  };

  // Edit interview stage
  const handleEdit = (interviewId,stage) => {
    console.log("Edit Interview ID:", interviewId); // Debug log
    console.log("Edit Stage is:", stage); // Debug log
    setIsEditMode(true);
    setCurrentStage({ interviewId, ...stage });
    setStages([{ stage: stage.stage, time: stage.time }]);
    interviewModal.current.showModal();
  };

  // Delete interview stage
  const handleDelete = async (profileId, stageId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/interview/stage/${profileId}/${stageId}`);
      fetchInterviews(); // Refresh the interview list after deletion
    } catch (error) {
      console.error('Error deleting stage:', error.response?.data || error.message);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedStages = [...stages];
    updatedStages[index][field] = value;
    setStages(updatedStages);
  };

  const addStageField = () => {
    setStages([...stages, { stage: '', time: '' }]);
  };

  const removeStageField = (index) => {
    const updatedStages = stages.filter((_, i) => i !== index);
    setStages(updatedStages);
  };

  // Fetch Interviews 
  useEffect(() => {
    fetchInterviews();
  }, []);

  return (
    <div>
      <button
        className="text-black text-[15px] font-bold p-[5px] px-3 rounded-lg mt-3 mb-2 bg-[#D9D9D9]"
        onClick={() => interviewModal.current.showModal()} >
        + Upload Stage
      </button>

      <div className="border-l-[10px] border-[#3F8CFF] mt-3 flex W-[340px]">
        <div className="w-[352px] ">
          <ul>
            {interviews &&
              interviews.map((interview) =>
                interview.stages.map((item) => (
                  <li
                    key={item._id}
                    className="mb-2 py-1.5 text-[11px] font-bold text-sm flex items-center justify-between"
                  >
                    <span>
                      <PiArrowRightFill className="inline text-[#3F8CFf] text-[22px] me-2" />
                      {item.stage} : {item.time} min
                    </span>
                    <div>
                      <FiEdit
                        className="text-blue-500 cursor-pointer mr-2 inline text-[18px]"
                        onClick={() => handleEdit(interview._id, item)}
                      />
                      <FiTrash2
                        className="text-red-500 cursor-pointer inline text-[18px]"
                        onClick={() => handleDelete(interview._id, item._id)}
                      />
                    </div>
                  </li>
                ))
              )}
          </ul>
        </div>
      </div>

      <div>
        {/* Modal */}
        <dialog ref={interviewModal} className="modal h-auto shadow-xl">
          <div className="modal-box bg-[#3F8CFF]">
            <button
              className="btn btn-sm btn-circle btn-ghost text-white absolute right-2 top-2"
              onClick={() => interviewModal.current.close()}
            >
              ✕
            </button>

            <h3 className="text-white pl-3 text-lg pb-3">
              {isEditMode ? 'Edit Stage' : 'Upload Stage'}
            </h3>

            <form onSubmit={handleInterviewSubmit}>
              {stages.map((stageObj, index) => (
                <div key={index} className="flex items-center mb-3">
                  <input
                    type="text"
                    value={stageObj.stage}
                    onChange={(e) => handleInputChange(index, 'stage', e.target.value)}
                    className="w-80 h-11 rounded-xl bg-white text-black mb-2"
                    placeholder={`Write Your Stage`}
                    required
                  />

                  {/* Time Input */}
                  <div className="relative">
                    <input
                      type="number"
                      value={stageObj.time}
                      onChange={(e) => handleInputChange(index, 'time', e.target.value)}
                      className="w-20 h-11 rounded-xl bg-white text-black pl-8 mb-2 px-3 ml-2"
                      placeholder="12"
                      required
                    />
                    <WiTime5 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3F8CFF] text-xl" />
                  </div>

                  {/* Remove Button */}
                  {index > 0 && (
                    <button
                      type="button"
                      className="text-red-600 font-bold ml-2"
                      onClick={() => removeStageField(index)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              {!isEditMode && (
                <button
                  type="button"
                  className="text-sm text-white bg-blue-500 px-3 py-1 rounded-lg mb-2"
                  onClick={addStageField}
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

export default Interview

