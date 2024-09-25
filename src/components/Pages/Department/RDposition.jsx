import React, { useState } from "react";
import RDPositionCard from "../../../subUtils/RDPositionCard";
import { useNavigate } from "react-router-dom";

const positions = [
  {
    id: 1,
    name: "Team Leader",
    image: "image5.png",
    // url: "/RDposition",
  },
  {
    id: 2,
    name: "Head",
    image: "image4.png",
  },
  {
    id: 3,
    name: "Executive",
    image: "image8.png",
  },
  {
    id: 4,
    name: "Director",
    image: "image3.png",
  },
  {
    id: 5,
    name: "CEO",
    image: "image7.png",
  },
  {
    id: 6,
    name: "Clarical Executive",
    image: "image1.png",
  },
];

function RDposition() {
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
              Department/Sub Department/R&D Department Position
            </h1>
          </div>
        </div>

        <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
          {positions.map((position) => (
            <RDPositionCard
              key={position.id}
              image={position.image}
              title={position.name}
              buttonText="1 Member"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RDposition;
