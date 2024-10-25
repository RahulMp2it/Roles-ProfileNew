import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { PiArrowRightFill } from 'react-icons/pi';
import { useSearchParams } from 'react-router-dom';

function Tasksheet() {

  const [tasksheets, setTasksheets] = useState([]);
  const [newTasksheet, setNewTasksheet] = useState('');
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get("profile_id")
  const tasksheetModal = useRef(null);

  const fetchTasksheets = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/tasksheet/${profileId}`);
      //console.log('==>', response.data);
      setTasksheets(response.data);
    } catch (error) {
      console.error("Error fetching Tasksheet :", error);
    }
  };

  // post a new Tasksheet 
  const handleTasksheetSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/tasksheet ", { tasksheet: newTasksheet, profileId });
      console.log(response);
      fetchTasksheets()
    } catch (error) {
      console.error("Error creating new Tasksheet:", error);
    }
  };

  // Fetch Behaviours 
  useEffect(() => {
    fetchTasksheets();
  }, []);


  return (
    <div>
      <button
        className="text-black text-[15px] font-bold p-[5px] px-3 rounded-lg mt-3 mb-2 bg-[#D9D9D9]"
        onClick={() => tasksheetModal.current.showModal()} >
        + Upload tasksheet
      </button>

      <div className="border-l-[10px] border-[#3F8CFF] mt-3 flex W-[340px]">
        <div className="w-[352px] ">
          <ul>

            {
              tasksheets && tasksheets.map((tasksheet, key) => {
                return (
                  <li key={key} className="mb-2 py-1.5 text-[11px] font-bold text-sm cursor-pointer ">
                    <PiArrowRightFill className="inline text-[#3F8CFf] text-[22px] me-2" /> {tasksheet.tasksheet}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>

      <div>
        {/* Modal */}
        <dialog ref={tasksheetModal} className="modal h-auto shadow-xl">
          <div className="modal-box bg-[#3F8CFF]">
            <h3 className="text-white pl-3 text-lg pb-3">Upload Tasksheet</h3>
            <form onSubmit={handleTasksheetSubmit}>
              <input
                type="text"
                value={newTasksheet}
                onChange={(e) => setNewTasksheet(e.target.value)}
                className="w-full h-11 rounded-xl bg-white text-black mb-2"
                placeholder={`Write Your PB`}
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

export default Tasksheet
