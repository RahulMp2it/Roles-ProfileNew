import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { PiArrowRightFill } from 'react-icons/pi';
import { useSearchParams } from 'react-router-dom';

function Knowledge() {

  const [knowledges, setKnowledges] = useState([]);
  const [newKnowledge, setNewKnowledge] = useState('');
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get("profile_id")
  const knowledgeModal = useRef(null);

  const fetchKnowledges = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/knowledge/${profileId}`);
      //console.log('==>', response.data);
      setKnowledges(response.data);
    } catch (error) {
      console.error("Error fetching Knowledge :", error);
    }
  };

  // post a new Interview 
  const handleKnowledgeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/knowledge ", { knowledge: newKnowledge, profileId });
      console.log(response);
      knowledgeModal.current.close();
      fetchKnowledges()
    } catch (error) {
      console.error("Error creating new Knowledges:", error);
    }
  };

  // Fetch Interviews 
  useEffect(() => {
    fetchKnowledges();
  }, []);

  return (
    <div>
      <button
        className="text-black text-[15px] font-bold p-[5px] px-3 rounded-lg mt-3 mb-2 bg-[#D9D9D9]"
        onClick={() => knowledgeModal.current.showModal()} >
        + Upload Knowledge
      </button>

      <div className="border-l-[10px] border-[#3F8CFF] mt-3 flex W-[340px]">
        <div className="w-[352px] ">
          <ul>

            {
              knowledges && knowledges.map((knowledge, key) => {
                return (
                  <li key={key} className="mb-2 py-1.5 text-[11px] font-bold text-sm cursor-pointer ">
                    <PiArrowRightFill className="inline text-[#3F8CFf] text-[22px] me-2" /> {knowledge.knowledge}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>

      <div>
        {/* Modal */}
        <dialog ref={knowledgeModal} className="modal h-auto shadow-xl">
          <div className="modal-box bg-[#3F8CFF]">
            <button
              className="btn btn-sm btn-circle btn-ghost text-white absolute right-2 top-2"
              onClick={() => knowledgeModal.current.close()}
            >
              ✕
            </button>
            <h3 className="text-white pl-3 text-lg pb-3">Upload </h3>
            <form onSubmit={handleKnowledgeSubmit}>
              <input
                type="text"
                value={newKnowledge}
                onChange={(e) => setNewKnowledge(e.target.value)}
                className="w-full h-11 rounded-xl bg-white text-black mb-2"
                placeholder={`Write Your Notes`}
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

export default Knowledge
