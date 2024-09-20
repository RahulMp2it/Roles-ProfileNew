import React from "react";
import DesignationPositionCard from "../../../subUtils/DesignationPositionCard";

const dpositions = [
  {
    id: 1,
    name: "Business Management Department",
    image: "image1.png",
  },
];

function DesignationPosition() {
  return (
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
  );
}

export default DesignationPosition;
