import React from 'react'
import { Link } from 'react-router-dom'

export default function TrainingDocCard({ name, docPath }) {
  return (
    <div className='w-[160px] h-[160px] bg-[#D8D8D83D] rounded-xl '>
      <Link to={`/docview?docPath=${encodeURIComponent(docPath)}`}>

        <div className='h-[100px] w-[100px] mt-5 ml-5 '>
          <img src="doc.png" alt="Loading...." /></div>
        <div className="ml-7 mt-1">{name}</div>
        {/* <a href="" download>Download</a> */}
      </Link>
    </div>
  )
}
