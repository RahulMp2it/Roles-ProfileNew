import { useEffect, useState } from "react";
import TrainingDocCard from "../../../utils/TrainingDocCard"
import TrainingPdfCard from "../../../utils/TrainingPdfCard"
import TrainingVideoCard from "../../../utils/TrainingVideoCard"
import axios from "axios";

function Training() {
  // const trainingMaterial = [
  //   {
  //     id: 1,
  //     type: 'video',
  //     link: "sdsadas"
  //   },
  //   {
  //     id: 2,
  //     type: 'docx',
  //     link: "sdsadas"
  //   },
  //   {
  //     id: 3,
  //     type: 'pdf',
  //     link: "sdsadas"
  //   },
  //   {
  //     id: 4,
  //     type: 'docx',
  //     link: "sdsadas"
  //   },
  //   {
  //     id: 5,
  //     type: 'video',
  //     link: "sdsadas"
  //   },
  // ]

  const [trainingMaterials, setTrainingMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [type, setType] = useState("");
  const [link, setLink] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility


  // Fetch materials on component mount
  useEffect(() => {
    fetchMaterials();
  }, []);

  // Fetch training materials from the backend
  const fetchMaterials = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/training");
      setTrainingMaterials(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching training materials:", error);
      setLoading(false);
    }
  };

  // Post new training material to the backend
  const handleAddMaterial = async (e) => {
    e.preventDefault();
    try {
      const newMaterial = { type, link };
      await axios.post("http://localhost:8080/api/training", newMaterial);
      fetchMaterials();
      setType("");
      setLink("");
      setIsModalOpen(false); // Close the modal after submission
    } catch (error) {
      console.error("Error adding training material:", error);
    }
  };

  // Show a loading state while fetching data
  if (loading) {
    return <div>Loading training materials...</div>;
  }

  return (
    <>
      <form onSubmit={handleAddMaterial} className="mb-5">
        <div>
          <label>
            Type:
            <select value={type} onChange={(e) => setType(e.target.value)} required>
              <option value="">Select Type</option>
              <option value="video">Video</option>
              <option value="docx">Document</option>
              <option value="pdf">PDF</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Link:
            <input
              type="file"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Enter material link"
              required
            />
          </label>
        </div>
        <button type="submit">Add Material</button>
      </form>

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
