import Layout from '../../Layout'
import Skill from '../ProfileDescribe/Skill';
import Role from '../ProfileDescribe/Role';
import Interview from '../ProfileDescribe/Interview';
import Knowledge from '../ProfileDescribe/Knowledge';
import PBehaviour from '../ProfileDescribe/PBehaviour';
import Tasksheet from '../ProfileDescribe/Tasksheet';

function ProfileDescribe() {

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
          <div className="max-w-[1400px] h-[100%] mt-3 pl-3 pr-[20px] py-8 mx-auto rounded-[20px] bg-white">
            {/* first NavBar */}
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

            {/* Second NavBar */}
            <div role="tablist" className="tabs tabs-bordered w-[1250px] h-14 bg-[#F4F9FD]">
              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Skills" defaultChecked />
              <div role="tabpanel" className="tab-content p-10">
                <Skill />
              </div>

              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Role & Function" />
              <div role="tabpanel" className="tab-content p-10">
                <Role />
              </div>

              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Interview" />
              <div role="tabpanel" className="tab-content p-10">
                <Interview />
              </div>

              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Training Material" />
              <div role="tabpanel" className="tab-content p-10">
                Tab content 4</div>

              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Knowledge" />
              <div role="tabpanel" className="tab-content p-10">
                <Knowledge />
              </div>

              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Professional Behaviour" />
              <div role="tabpanel" className="tab-content p-10">
                <PBehaviour />
              </div>

              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="TaskSheet" />
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
