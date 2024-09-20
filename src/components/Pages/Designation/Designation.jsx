import React from "react";
import DesignationCard from "../../../utils/DesignationCard";

const designations = [
  {
    id: 1,
    name: "Team Leader",
    image: "image.png",
    url: "/designationRDdepart",
  },
  {
    id: 2,
    name: "Head",
    image: "image1.png",
    url: "/designationRDdepart",
  },
  {
    id: 3,
    name: "Executive",
    image: "image7.png",
    url: "/designationRDdepart",
  },
  {
    id: 4,
    name: "Director",
    image: "image3.png",
    url: "/designationRDdepart",
  },
  {
    id: 5,
    name: "CEO",
    image: "image4.png",
    url: "/designationRDdepart",
  },
  {
    id: 6,
    name: "Clarical Executive",
    image: "image5.png",
    url: "/designationRDdepart",
  },
];

function Designation() {
  return (
    <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
      {designations.map((designation) => (
        <DesignationCard
          key={designation.id}
          image={designation.image}
          title={designation.name}
          buttonText="1 Member"
          url={designation.url}
        />
      ))}
    </div>
  );
}

export default Designation;
