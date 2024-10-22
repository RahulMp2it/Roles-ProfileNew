import React, { useRef } from 'react'

function Roles() {

  const roleModal = useRef(null);

  return (
    <div>
      <button
        className="btn text-black font-bold bg-[#D9D9D9]"
        onClick={() => roleModal.current.showModal()} >
        + Upload Stage
      </button>
      <div>
        Tab content 2
      </div>

      <div>
        {/* Modal */}
        <dialog ref={roleModal} className="modal h-auto shadow-xl">
          <div className="modal-box bg-[#3F8CFF]">
            <h3 className="text-white pl-3 text-lg pb-3">Create Role</h3> {/* Dynamic modal title */}
            <form >
              <input
                type="text"
                // value={newSkill}  // Bind input to newSkill state
                // onChange={handleSkillInputChange} // Update state when input changes
                className="w-full h-11 rounded-xl bg-white text-black mb-2"
                placeholder={`Write Your New Skill`}
                required
              />
              {/* <button type="submit" className="btn w-[150px] h-3 rounded-2xl bg-white text-[#3F8CFF]">
                      Save {activeTab === 0 ? 'Skill' : activeTab === 1 ? 'Role' : 'Project'}
                    </button> */}
            </form>

            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn w-[150px] h-3 rounded-2xl bg-white text-[#3F8CFF]"
                  type="submit"
                >
                  Save Skill
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  )
}

export default Roles
