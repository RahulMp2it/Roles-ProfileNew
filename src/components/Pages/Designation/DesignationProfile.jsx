import React, { useState } from "react";
import DesignationProfileCard from "../../../subUtils/DesignationProfileCard";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout";

const dProfiles = [
  {
    id: 1,
    name: "UI/UX Designer",
    image: "image2.png",
  },
  {
    id: 2,
    name: "Writer",
    image: "image2.png",
  },
  {
    id: 3,
    name: "Researcher",
    image: "image2.png",
  },
];

function DesignationProfile() {
  const navigate = useNavigate();
  const [isSubPage, setIsSubPage] = useState(false); // Track if it's a subpage

  // Function to handle going back to the previous page
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
    <Layout>
      <div className=" fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2 ">
        <div className=" overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
          <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">
            {isSubPage ? (
              <span
                onClick={handleBackClick}
                className="cursor-pointer text-[#3F8CFF] inline-flex items-center gap-2"
              >
                <FaArrowLeftLong />
                {"Back to Dashboard"}
              </span>
            ) : (
              "Welcome back, Rahul singh"
            )}
          </p>
          <div className="grid grid-cols-4 place-content-between gap-4">
            <div className="col-span-3 ">
              <h1 className="text-[34px] font-nunito font-semibold">
                Designation/Designation R&D Department/Designation Profile
                Department
              </h1>
            </div>
          </div>

          <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
            {dProfiles.map((dProfile) => (
              <DesignationProfileCard
                key={dProfile.id}
                image={dProfile.image}
                title={dProfile.name}
                buttonText="1 Member"
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DesignationProfile;
