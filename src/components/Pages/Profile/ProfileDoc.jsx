import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Layout";

function ProfileDoc() {
  const UploadSkills = useRef();
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
            <div className="w-[1250px] h-14 bg-[#F4F9FD] flex items-center mb-5 rounded-[18px]">
              <div className="flex items-center">
                <p className="text-[#91929E] text-[15px] px-6"> Skills</p>
                <p className="text-[#91929E] text-[15px] px-28">Interview</p>
                <p className="text-[#91929E] text-[15px] px-14">
                  Training Material
                </p>
                <p className="text-[#91929E] text-[15px] px-6">Role</p>
              </div>
            </div>

            <div>
              <button
                className="btn text-black font-nunito w-[125px] px-2 bg-[#D9D9D9] rounded-xl"
                onClick={() => UploadSkills.current.showModal()}
              >
                + Upload Skills
              </button>
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
      </div>
    </Layout>
  );
}

export default ProfileDoc;

// import React from "react";

// const ProfileDoc = () => {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-bold">Profile Name</h3>
//         <div className="flex items-center">
//           <p className="text-gray-500 mr-2">Department</p>
//           <p className="text-gray-500">Research & Development</p>
//         </div>
//       </div>
//       <div className="flex justify-between items-center mb-4">
//         <p className="text-gray-500">Position</p>
//         <div className="flex items-center">
//           <p className="text-gray-500 mr-2">Assignee</p>
//           {/* Add your assignee image or avatar here */}
//         </div>
//       </div>
//       <div className="mb-4">
//         <h4 className="text-lg font-bold">Skills</h4>
//       </div>
//       <ul className="list-disc pl-4">
//         <li className="text-gray-500">Knowledge About Graphic Designing</li>
//         <li className="text-gray-500">
//           Knowledge About After Effect/Premium Pro
//         </li>
//         <li className="text-gray-500">Knowledge About 3d Animation</li>
//         <li className="text-gray-500">
//           Knowledge About Photoshop/adobe/illustration
//         </li>
//         <li className="text-gray-500">Knowledge About Figma/Adobexd</li>
//       </ul>
//       <div className="flex justify-center">
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
//           Upload Skills
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileDoc;
