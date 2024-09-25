import React, { useState } from "react";
import RDEmployeeCard from "../../../subUtils/RDEmployeeCard";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const rdEmployees = [
  {
    id: 1,
    name: "Rahul Singh",
    image: "image2.png",
  },
  {
    id: 2,
    name: "Jatin Gautam",
    image: "image2.png",
  },
  {
    id: 3,
    name: "Piyush Tomar",
    image: "image2.png",
  },
  {
    id: 4,
    name: "Harshita Tomar",
    image: "image2.png",
  },
  {
    id: 5,
    name: "Saurabh Dev",
    image: "image2.png",
  },
  {
    id: 6,
    name: "Chandrsekhar Jadon",
    image: "image2.png",
  },
  {
    id: 7,
    name: "Dheeraj Kumar",
    image: "image2.png",
  },
  {
    id: 8,
    name: "Kalyan Singh",
    image: "image2.png",
  },
  {
    id: 9,
    name: "Sachin Sharma",
    image: "image2.png",
  },
  {
    id: 10,
    name: "Mayank Chaturvedi",
    image: "image2.png",
  },
];

function RDemployee() {
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
              Department/Sub Department/R&D Department Employee
            </h1>
          </div>
        </div>

        <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
          {rdEmployees.map((rdEmployee) => (
            <RDEmployeeCard
              key={rdEmployee.id}
              image={rdEmployee.image}
              title={rdEmployee.name}
              buttonText="1 Member"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RDemployee;
