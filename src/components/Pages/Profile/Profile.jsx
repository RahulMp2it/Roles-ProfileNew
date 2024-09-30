import React, { useRef, useState } from "react";
import ProfileCard from "../../../utils/ProfileCard";
import { Link, useNavigate } from "react-router-dom";
import { ImAttachment } from "react-icons/im";
import { LuLink } from "react-icons/lu";
import Layout from "../../Layout";

const profiles = [
  {
    id: 1,
    name: "UI/UX Designer",
    image: "image.png",
    depart: "Marketing Department",
    position: "Executive",
    url: "/profileDoc",
  },
  {
    id: 2,
    name: "UI/UX Designer",
    image: "image1.png",
    depart: "Marketing Department",
    position: "Executive",
  },
  {
    id: 3,
    name: "UI/UX Designer",
    image: "image7.png",
    depart: "Marketing Department",
    position: "Executive",
  },
  {
    id: 4,
    name: "UI/UX Designer",
    image: "image3.png",
    depart: "Marketing Department",
    position: "Executive",
  },
  {
    id: 5,
    name: "UI/UX Designer",
    image: "image4.png",
    depart: "Marketing Department",
    position: "Executive",
  },
  {
    id: 6,
    name: "UI/UX Designer",
    image: "image5.png",
    depart: "Marketing Department",
    position: "Executive",
  },
  {
    id: 7,
    name: "UI/UX Designer",
    image: "image.png",
    depart: "Marketing Department",
    position: "Executive",
  },
  {
    id: 8,
    name: "UI/UX Designer",
    image: "image8.png",
    depart: "Marketing Department",
    position: "Executive",
  },
  {
    id: 9,
    name: "UI/UX Designer",
    image: "image1.png",
    depart: "Marketing Department",
    position: "Executive",
  },
  {
    id: 10,
    name: "UI/UX Designer",
    image: "image4.png",
    depart: "Marketing Department",
    position: "Executive",
  },
];

function Profile() {
  const navigate = useNavigate();
  const addProfile = useRef();
  const [activeCardId, setActiveCardId] = useState(null);

  const handleClick = (id, url) => {
    setActiveCardId(id);
    if (url) {
      navigate(url);
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };
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
              <button
                className="btn text-white font-nunito w-[200px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
                onClick={() => addProfile.current.showModal()}
              >
                + Add Profile
              </button>
              <dialog ref={addProfile} className="modal h-auto ">
                <div className=" modal-box overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
                  <form method="dialog modal-action">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                    <div className="text-[20px] text-start px-4 py-4 font-bold">
                      Add Profile
                    </div>
                    <div className="px-4 pb-8">
                      <div className="mb-4 py-2">
                        <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium ">
                          Type of Department
                        </label>
                        <select className="select mt-1 flex w-full px-3 border border-gray-300 rounded-[14px] shadow-sm items-center text-[#7D8592] focus:outline-none">
                          <option disabled selected>
                            Type of Department
                          </option>
                          <option>Han Solo</option>
                          <option>Greedo</option>
                        </select>
                      </div>
                      <div className="mb-4 py-2">
                        <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium ">
                          Designation Type
                        </label>
                        <select className="select mt-1 flex w-full px-3 border border-gray-300 rounded-[14px] shadow-sm items-center text-[#7D8592] focus:outline-none">
                          <option disabled selected>
                            Designation Type
                          </option>
                          <option>Han Solo</option>
                          <option>Greedo</option>
                        </select>
                      </div>
                      <div className="mb-4 py-2">
                        <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
                          Profile Name
                        </label>
                        <input
                          type="text"
                          name="code"
                          // value={form.code}
                          // onChange={handleChange}
                          placeholder="Profile Name"
                          className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                        />
                      </div>
                      <div className="mb-4 py-2">
                        <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
                          Profile Code
                        </label>
                        <input
                          type="text"
                          name="code"
                          // value={form.code}
                          // onChange={handleChange}
                          placeholder="Profile Code"
                          className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                        />
                      </div>
                      <div className="mb-6 py-2">
                        <label className="block text-start text-[12px] pb-1 font-medium text-[#7D8592]">
                          Description
                        </label>
                        <textarea
                          name="description"
                          // value={form.description}
                          // onChange={handleChange}
                          placeholder=" Add some Descriptionof the Designtion"
                          className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px] min-h-[100px]"
                        />
                      </div>
                      {/* Links  */}
                      <div className="flex gap-3">
                        <Link
                          to="#"
                          // onClick={handleReset}
                          className="bg-[#6D5DD319] text-[#6D5DD3] px-4 py-2 rounded-md flex items-center"
                        >
                          <ImAttachment />
                        </Link>
                        <Link
                          to="#"
                          // onClick={handleReset}
                          className="bg-[#15C0E61A] text-[#15C0E6] px-4 py-2 rounded-md flex items-center"
                        >
                          <LuLink />
                        </Link>
                      </div>
                    </div>
                    <button className="btn text-white font-nunito w-[150px] px-2 py-3 bg-[#3F8CFF] rounded-xl">
                      Save Designation
                    </button>
                  </form>
                </div>
              </dialog>
            </div>
          </div>

          <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                image={profile.image}
                title={profile.name}
                depart={profile.depart}
                position={profile.position}
                buttonText="1 Member"
                onClick={handleClick}
                url={profile?.url}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
