import React, { useState } from "react";
import DesignationRDdepartCard from "../../../subUtils/DesignationRDdepartCard";
import { useNavigate } from "react-router-dom";

const dRDdeparts = [
  {
    id: 1,
    name: "Position Department",
    depart: "(R&D)",
    image: "image2.png",
    url: "/designationPosition",
  },
  {
    id: 2,
    name: "Position Profile",
    depart: "(R&D)",
    image: "image1.png",
    url: "/designationProfile",
  },
  {
    id: 3,
    name: "Position Employee",
    depart: "(R&D)",
    image: "image3.png",
    url: "/designationEmployee",
  },
];

function DesignationRDdepart() {
  const navigate = useNavigate();
  const [activeCardId, setActiveCardId] = useState(null);

  const handleClick = (id, url) => {
    setActiveCardId(id);
    if (url) {
      navigate(url);
    }
  };

  return (
    <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
      {dRDdeparts.map((dRDdepart) => (
        <DesignationRDdepartCard
          key={dRDdepart.id}
          id={dRDdepart.id}
          image={dRDdepart.image}
          title={dRDdepart.name}
          depart={dRDdepart.depart}
          buttonText="1 Member"
          onClick={handleClick}
          url={dRDdepart.url}
        />
      ))}
    </div>
  );
}

export default DesignationRDdepart;
