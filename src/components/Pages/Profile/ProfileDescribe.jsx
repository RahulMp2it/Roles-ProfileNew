import Layout from '../../Layout'
import Skill from '../ProfileDescribe/Skill';
import Role from '../ProfileDescribe/Role';
import Interview from '../ProfileDescribe/Interview';
import Knowledge from '../ProfileDescribe/Knowledge';
import PBehaviour from '../ProfileDescribe/PBehaviour';
import Tasksheet from '../ProfileDescribe/Tasksheet';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Training from '../ProfileDescribe/Training';
import { useState } from 'react';

function ProfileDescribe({ heading, isSubPage }) {

  const navigate = useNavigate();
  const location = useLocation();
  const { profileName, department, designation } = location.state || {};
  // console.log("Location state:", location.state);
  const [activeTab, setActiveTab] = useState('Skills'); // State to track the active tab


  return (
    <Layout>
      <div className=" fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2 ">
        <div className=" overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
          <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">
            {isSubPage ? (
              <button onClick={() => navigate(-1)} className="text-blue-500 flex items-center">
                <FaArrowLeftLong className="mr-2" /> {heading}
              </button>
            ) : (
              <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">{heading}</p>
            )}
          </p>
          <div className="grid grid-cols-4 place-content-between gap-4">
            <div className="col-span-3 ">
              <h1 className="text-[34px] font-nunito font-semibold">Profile</h1>
            </div>

            <div className="text-end">
              <button
                className={`btn text-white font-nunito w-[200px] px-2 py-3 rounded-xl ${activeTab === 'Training Material' ? 'bg-[#3F8CFF]' : 'bg-gray-400'
                  }`}
                disabled={activeTab !== 'Training Material'}
              >
                + Upload Files
              </button>
            </div>
          </div>

          {/* main Container */}
          <div className="max-w-[1400px] h-[100%] mt-3 pl-3 pr-[20px] py-8 mx-auto rounded-[20px] bg-white">
            {/* first NavBar */}
            <div className="w-[1250px] h-20 bg-[#F4F9FD] flex items-center mb-5 rounded-[18px]">
              <div className="px-6">
                <p className="text-[#91929E] text-[12px]">Profile Name</p>
                <p className="text-[16px]">{profileName}</p>
              </div>
              <div className="px-6">
                <p className="text-[#91929E] text-[12px]">Department</p>
                <p className="text-[16px]">{department}</p>
              </div>
              <div className="px-11">
                <p className="text-[#91929E] text-[12px]">Designation</p>
                <p className="text-[16px]">{designation}</p>
              </div>

            </div>

            {/* Second NavBar */}
            <div role="tablist" className="tabs tabs-bordered w-[1250px] h-14 bg-[#F4F9FD]">
              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Skills" id="tab-skills" onClick={() => setActiveTab('Skills')} defaultChecked />
              <div role="tabpanel" className="tab-content p-10">
                <Skill />
              </div>

              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Role & Function" id="tab-role" onClick={() => setActiveTab('Role & Function')} />
              <div role="tabpanel" className="tab-content p-10">
                <Role />
              </div>

              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Interview" onClick={() => setActiveTab('Interview')} />
              <div role="tabpanel" className="tab-content p-10" id="tab-interview">
                <Interview />
              </div>

              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Training Material" id="tab-training" onClick={() => setActiveTab('Training Material')} />
              <div role="tabpanel" className="tab-content p-10">
                <Training />
              </div>

              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Knowledge" id="tab-knowledge" onClick={() => setActiveTab('Knowledge')} />
              <div role="tabpanel" className="tab-content p-10">
                <Knowledge />
              </div>

              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Evaluation Behaviour" id="tab-behaviour" onClick={() => setActiveTab('Evaluation Behaviour')} />
              <div role="tabpanel" className="tab-content p-10">
                <PBehaviour />
              </div>

              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="TaskSheet" id="tab-tasksheet" onClick={() => setActiveTab('TaskSheet')} />
              <div role="tabpanel" className="tab-content p-10">
                <Tasksheet />
              </div>

            </div>

          </div>

        </div>
      </div>
    </Layout>
  )
}

export default ProfileDescribe
