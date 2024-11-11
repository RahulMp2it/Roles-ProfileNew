import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';
import { FaArrowLeftLong } from 'react-icons/fa6';
import DesignationCard from '../../../utils/DesignationCard';


function DProfileList({ heading, isSubPage }) {

  const navigate = useNavigate();
  const { id: designationId } = useParams(); // Use designationId to fetch related profiles
  const { state } = useLocation();
  const DesignationName = state?.DesignationName || 'Designation';

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (designationId) {
      fetchProfiles();
    } else {
      console.error("Designation ID is undefined");
    }
  }, [designationId]);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/profile/designation/${designationId}`);
      setProfiles(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setError("Failed to load profiles.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2 z-10">
        <div className="overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
          <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">
            {isSubPage ? (
              <button onClick={() => navigate(-1)} className="text-blue-500 flex items-center">
                <FaArrowLeftLong className="mr-2" /> {heading}
              </button>
            ) : (
              <span className="text-[#7D8592] text-[14px] tracking-wide mb-0">{heading}</span>
            )}
          </p>
          <div className="grid grid-cols-4 place-content-between gap-4">
            <div className="col-span-3">
              <h1 className="text-[34px] font-nunito font-semibold">{DesignationName} Profiles</h1>
            </div>
          </div>
          <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
            {loading ? (
              <p>Loading profiles...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              profiles.map(profile => (
                <DesignationCard
                  key={profile._id}
                  image={profile.image || "/image2.png"}
                  title={profile.Profile}
                  buttonText="View Details"
                  onClick={() => navigate(`/profile/${profile._id}`, { state: { DesignationName, designationId } })}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DProfileList
