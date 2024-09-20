import React from "react";
import DesignationProfileCard from "../../../subUtils/DesignationProfileCard";

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
  return (
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
  );
}

export default DesignationProfile;
