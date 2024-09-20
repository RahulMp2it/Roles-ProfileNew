import React, { useState } from "react";
import RDPositionCard from "../../../subUtils/RDPositionCard";

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
  return (
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
  );
}

export default RDposition;
