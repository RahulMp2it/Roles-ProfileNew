import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { PiArrowRightFill } from 'react-icons/pi';
import { useSearchParams } from 'react-router-dom';

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

  // post a new Interview 
  const handleInterviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/interview ", { stages, profileId });
      console.log(response);
      interviewModal.current.close(); //close the modal
      fetchInterviews()
      setStages([{ stage: '', time: '' }]); // Reset the input fields
    } catch (error) {
      console.error("Error creating new Interview:", error);
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
                  <li key={key} className="mb-2 py-1.5 text-[11px] font-bold text-sm cursor-pointer ">
                    <PiArrowRightFill className="inline text-[#3F8CFf] text-[22px] me-2" /> {interview.interview}
                  </li>
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
                className="w-full h-11 rounded-xl bg-white text-black mb-2"
                placeholder={`Write Your Stage`}
                required
              />

              {/* Time Input */}
              <input
              type="number"
              value={stageObj.time}
              onChange={(e) => handleInputChange(index, 'time', e.target.value)}
              className="w-20 h-11 rounded-xl bg-white text-black mb-2 px-3 ml-2"
              placeholder="Time"
              required
            />

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
