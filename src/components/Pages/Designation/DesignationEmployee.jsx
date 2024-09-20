import React from "react";
import DesignationEmployeeCard from "../../../subUtils/DesignationEmployeeCard";

const dEmployees = [
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

function DesignationEmployee() {
  return (
    <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
      {dEmployees.map((dEmployee) => (
        <DesignationEmployeeCard
          key={dEmployee.id}
          image={dEmployee.image}
          title={dEmployee.name}
          buttonText="1 Member"
        />
      ))}
    </div>
  );
}

export default DesignationEmployee;
