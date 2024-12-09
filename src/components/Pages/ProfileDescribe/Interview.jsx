import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { PiArrowRightFill } from 'react-icons/pi';
import { useSearchParams } from 'react-router-dom';
import { WiTime5 } from "react-icons/wi";


function Interview() {
  const [interviews, setInterviews] = useState([]);
  const [stages, setStages] = useState([{ stage: '', time: '' }]); // Array for stages with times
  const [newInterview, setNewInterview] = useState('');
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get("profile_id")
  const interviewModal = useRef(null);

  const fetchInterviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/interview/${profileId}`);
      //console.log('==>', response.data);
      setInterviews(response.data);
    } catch (error) {
      console.error("Error fetching Interview :", error);
    }
  };

  const handleInterviewSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission reload
  
    try {
      // Combine all stages into a single object with profileId
      const payload = {
        profile: profileId,
        stages,
      };
  
      // POST the data to the backend
      const response = await axios.post("http://localhost:8080/api/interview/stage/${profileId}", payload);
  
      // Refresh the interview list and close modal on success
      fetchInterviews(); // Refresh interview data
      setStages([{ stage: '', time: '' }]); // Reset the form fields
      interviewModal.current.close(); // Close modal
    } catch (error) {
      console.error("Error creating/updating interview:", error);
      alert("Failed to create/update the interview. Please try again.");
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
            {
              interviews && interviews.map((interview, key) => {
                return (
                  interview.stages && interview.stages.map((item, index) =>
                      <li key={index} className="mb-2 py-1.5 text-[11px] font-bold text-sm cursor-pointer ">
                        <PiArrowRightFill className="inline text-[#3F8CFf] text-[22px] me-2" /> {item.stage} : {item.time} min
                      </li>
                  )
                )
              })
            }
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
            <h3 className="text-white pl-3 text-lg pb-3">Upload Stage</h3>

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

              {/* Add More Button */}
              <button
                type="button"
                className="text-sm text-white bg-blue-500 px-3 py-1 rounded-lg mb-2"
                onClick={addStageField}
              >
                + Add one More
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

export default Interview
