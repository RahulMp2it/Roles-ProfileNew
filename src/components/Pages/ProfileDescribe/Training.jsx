import { useEffect, useState } from "react";
import TrainingDocCard from "../../../utils/TrainingDocCard"
import TrainingPdfCard from "../../../utils/TrainingPdfCard"
import TrainingVideoCard from "../../../utils/TrainingVideoCard"
import axios from "axios";

function Training() {
  const trainingMaterials = [
    {
      id: 1,
      type: 'video',
      link: "sdsadas"
    },
    {
      id: 2,
      type: 'docx',
      link: "sdsadas"
    },
    {
      id: 3,
      type: 'pdf',
      link: "sdsadas"
    },
    {
      id: 4,
      type: 'docx',
      link: "sdsadas"
    },
    {
      id: 5,
      type: 'video',
      link: "sdsadas"
    },
  ]

  return (
    <>
      

      <div className=" grid lg:grid-cols-6 gap-12  py-8 mx-auto overflow-hidden">
        {
          trainingMaterials.map((item) => {
            return (
              item.type === 'video' ?
                <TrainingVideoCard key={item._id} link={item.link} />
                : item.type === 'docx' ?
                  <TrainingDocCard key={item._id} link={item.link} />
                  : item.type === 'pdf' ?
                    <TrainingPdfCard key={item._id} link={item.link} />
                    : 'Type not supported'
            )
          })
        }
      </div>
    </>
  )
}

export default Training
