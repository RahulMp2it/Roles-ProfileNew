import React, { useState } from "react";
import SubDepartCard from "../../../subUtils/SubDepartCard";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import Layout from "../../Layout";

const departments = [
  {
    id: 1,
    name: "R&D Department",
    depart: "Position",
    image: "image8.png",
    url: "/RDPosition",
  },
  {
    id: 2,
    name: "R&D Department",
    depart: "Profile  ",
    image: "image4.png",
    url: "/RDprofile",
  },
  {
    id: 3,
    name: "R&D Department",
    depart: "Employee",
    image: "image7.png",
    url: "/RDemployee",
  },
];

function SubDepartment() {
  const navigate = useNavigate();
  const [activeCardId, setActiveCardId] = useState(null);

  const [isSubPage, setIsSubPage] = useState(false); // Track if it's a subpage

  const handleClick = (id, url) => {
    setActiveCardId(id);
    if (url) {
      navigate(url);
    }
  };

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
                Department/Sub Department
              </h1>
            </div>
          </div>

          <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
            {departments.map((department) => (
              <SubDepartCard
                key={department.id}
                id={department.id}
                image={department.image}
                title={department.name}
                depart={department.depart}
                buttonText="1 Member"
                onClick={handleClick}
                url={department.url}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SubDepartment;
