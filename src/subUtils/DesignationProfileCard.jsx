import React from "react";

function DesignationProfileCard({ image, title, buttonText }) {
  return (
    <div className="bg-[#F4F9FD] rounded-[22px] overflow-hidden flex flex-col items-center justify-center pt-6 pb-2">
      <div className="relative w-[75px] h-[75px] bg-progress-img bg-center bg-[length:100%_100%] justify-center ">
        {/* Rounded Image */}
        <img
          className="absolute top-[6px] left-[6px] h-[63px] w-[63px] object-cover rounded-full"
          src={image}
          alt={title}
        />
      </div>
      {/* Title and Button */}
      <h2 className="mb-1 text-[16px] leading-4 py-3 flex justify-center text-center font-nunito text-[#0A1629] dark:text-white h-[40px]">
        {title}
      </h2>
      <div className="p-4 text-center">
        <button className="inline-flex items-center border  border-[#8f97a3] px-4 py-1 text-[11px] font-nunito  text-[#7D8592] bg-[#F4F9FD] rounded-[3.5px] focus:outline-none">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default DesignationProfileCard;
