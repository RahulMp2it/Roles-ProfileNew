import React from 'react'
import { Link } from 'react-router-dom'

const TrainingPdfCard = ({ name, pdfPath }) => {

  return (
    <div className='w-[160px] h-[160px] bg-[#D8D8D83D] rounded-xl '>
      <Link to={`/pdfview?pdfPath=${encodeURIComponent(pdfPath)}`}>

      <div className='h-[70px] w-[70px] ml-11 mt-8 '>
        <img src="pdf.png" alt="Loading...." />
      </div>
      <div className="ml-5 mt-5 ">{name}</div>
      
      </Link>
    </div>
  )
}

export default TrainingPdfCard
