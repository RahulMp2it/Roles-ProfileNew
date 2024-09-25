import React, { useState } from "react";
import DesignationPositionCard from "../../../subUtils/DesignationPositionCard";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const dpositions = [
  {
    id: 1,
    name: "Business Management Department",
    image: "image1.png",
  },
];

function DesignationPosition() {
  const navigate = useNavigate();
  const [isSubPage, setIsSubPage] = useState(false); // Track if it's a subpage

  // Function to handle going back to the previous page
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };
  return (
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
              Designation/Designation R&D Department/Designation Position
              Department
            </h1>
          </div>
        </div>

        <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
          {dpositions.map((dposition) => (
            <DesignationPositionCard
              key={dposition.id}
              image={dposition.image}
              title={dposition.name}
              buttonText="1 Member"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DesignationPosition;
