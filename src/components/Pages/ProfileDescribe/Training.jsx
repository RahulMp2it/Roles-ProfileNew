import TrainingDocCard from "../../../utils/TrainingDocCard"
import TrainingPdfCard from "../../../utils/TrainingPdfCard"
import TrainingVideoCard from "../../../utils/TrainingVideoCard"

function Training() {
  const trainingMaterial = [
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
    <div className="flex gap-10">
      {
        trainingMaterial.map(item => {
          return (
            item.type === 'video' ?
              <TrainingVideoCard link={item.link} />
              : item.type === 'docx' ?
                <TrainingDocCard link={item.link} />
                : item.type === 'pdf' ?
                  <TrainingPdfCard link={item.link} />
                  : 'Type not supported'
          )
        })
      }
    </div>
  )
}

export default Training
