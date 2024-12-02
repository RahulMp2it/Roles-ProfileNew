import React from 'react'

const TrainingVideoCard = ({ link, onClick }) => {
  return (
    <div className='w-[160px] h-[160px] bg-[#D8D8D83D] rounded-xl '>
      <div className='h-[90px] w-[90px] ml-7 mt-4'><img src="vedio.png" alt="Loading...." /></div>
      <div className="ml-7 mt-4">UI/UX Designer 1</div>
      {/* <a href="" download>Download</a> */}
    </div>
  )
}

export default TrainingVideoCard
