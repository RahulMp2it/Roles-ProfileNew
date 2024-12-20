import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { PiArrowRightFill } from 'react-icons/pi';
import { useSearchParams } from 'react-router-dom';

function PBehaviour() {

  const [behaviours, setbehaviours] = useState([]);
  const [newBehaviour, setNewBehaviour] = useState('');
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get("profile_id")
  const behaviourModal = useRef(null);

  const fetchBehaviours = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/behaviour/${profileId}`);
      //console.log('==>', response.data);
      setbehaviours(response.data);
    } catch (error) {
      console.error("Error fetching behaviours :", error);
    }
  };

  // post a new Behaviours 
  const handleBehaviourSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/behaviour ", { behaviour: newBehaviour, profileId });
      console.log(response);
      behaviourModal.current.close();
      fetchBehaviours()
    } catch (error) {
      console.error("Error creating new Behaviours:", error);
    }
  };

  // Fetch Behaviours 
  useEffect(() => {
    fetchBehaviours();
  }, []);

  return (
    <div>
      <button
        className="text-black text-[15px] font-bold p-[5px] px-3 rounded-lg mt-3 mb-2 bg-[#D9D9D9]"
        onClick={() => behaviourModal.current.showModal()} >
        + Upload productivity
      </button>

      <button
        className="text-black text-[15px] font-bold p-[5px] px-3 rounded-lg mt-3 mb-2 bg-[#D9D9D9] ml-[250px]"
        onClick={() => taskModal.current.showModal()}
      >
        + Upload Learning
      </button>

      <button
        className="text-black text-[15px] font-bold p-[5px] px-3 rounded-lg mt-3 mb-2 bg-[#D9D9D9] ml-[250px]"
        onClick={() => instructionModal.current.showModal()}
      >
        + Upload Behaviour
      </button>

      <p className="bg-[#3F8CFf] text-center text-white py-1 w-[362px]">Productivity</p>
      <div className="border-l-[10px] border-[#3F8CFF] flex W-[340px]">
        <div className="w-[352px] ">
          <ul>

            {
              behaviours && behaviours.map((behaviour, key) => {
                return (
                  <li key={key} className="mb-2 py-1.5 text-[11px] font-bold text-sm cursor-pointer ">
                    <PiArrowRightFill className="inline text-[#3F8CFf] text-[22px] me-2" /> {behaviour.behaviour}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>


      <div>
        {/* Modal */}
        <dialog ref={behaviourModal} className="modal h-auto shadow-xl">
          <div className="modal-box bg-[#3F8CFF]">
            <button
              className="btn btn-sm btn-circle btn-ghost text-white absolute right-2 top-2"
              onClick={() => behaviourModal.current.close()}
            >
              ✕
            </button>
            <h3 className="text-white pl-3 text-lg pb-3">Upload </h3>
            <form onSubmit={handleBehaviourSubmit}>
              <input
                type="text"
                value={newBehaviour}
                onChange={(e) => setNewBehaviour(e.target.value)}
                className="w-full h-11 rounded-xl bg-white text-black mb-2"
                placeholder={`Write Your PB`}
                required
              />

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

export default PBehaviour
