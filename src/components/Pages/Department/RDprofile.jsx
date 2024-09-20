import React from "react";
import RDProfleCard from "../../../subUtils/RDProfleCard";

const rdProfiles = [
  {
    id: 1,
    name: "UI/UX Designer",
    image: "image2.png",
    // url: "/RDProfile",
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
  {
    id: 4,
    name: "Research Executive",
    image: "image2.png",
  },
  {
    id: 5,
    name: "Full Stack Developer",
    image: "image2.png",
  },
  {
    id: 6,
    name: "Mern Stack Developer",
    image: "image2.png",
  },
  {
    id: 7,
    name: "Graphic Designer",
    image: "image2.png",
  },
  {
    id: 8,
    name: "Front-End Developer",
    image: "image2.png",
  },
  {
    id: 9,
    name: "Back-End Developer",
    image: "image2.png",
  },
  {
    id: 10,
    name: "pythan Developer",
    image: "image2.png",
  },
];

function RDprofile() {
  return (
    <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
      {rdProfiles.map((rdProfile) => (
        <RDProfleCard
          key={rdProfile.id}
          image={rdProfile.image}
          title={rdProfile.name}
          buttonText="1 Member"
        />
      ))}
    </div>
  );
}

export default RDprofile;
