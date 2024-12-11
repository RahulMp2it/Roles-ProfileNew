import React from 'react'
import { Link } from 'react-router-dom'

const TrainingVideoCard = ({ link, onClick, name, path1 }) => {
  return (
    <div className='w-[160px] h-[160px] bg-[#D8D8D83D] rounded-xl '>
      <Link to={`/videoview?path1=${encodeURIComponent(path1)}`}>
      
      <div className='h-[90px] w-[90px] ml-7 mt-4'>
        <img src="vedio.png" alt="Loading...." />
       </div>
        <div className="ml-7 mt-4">{name}</div>
      {/* <a href="" download>Download</a> */}
      </Link>
    </div>
  )
}

export default TrainingVideoCard
