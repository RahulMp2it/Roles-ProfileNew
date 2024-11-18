import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Card from '../../../utils/Card';

function DDepartmentList({ heading, isSubPage }) {
  const navigate = useNavigate();
  const { id: designationId } = useParams(); // Use designationId to fetch related departments
  const { state } = useLocation();
  const DesignationName = state?.DesignationName || 'Designation';

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (designationId) {
      fetchDepartments();
    } else {
      console.error("Designation ID is undefined");
    }
  }, [designationId]);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/designation/${designationId}/department`);
      console.log("API Response:", response.data);
      setDepartments(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setError("Failed to load departments.");
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
              <h1 className="text-[34px] font-nunito font-semibold">{DesignationName} Departments</h1>
            </div>
          </div>
          <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
            {departments.map(department => (
              <Card
                key={department._id}
                image={department.image || "/image2.png"}
                title={department.Department}
                buttonText="View Details"
              // onClick={() => navigate(`/department/${department._id}`, { state: { DesignationName, designationId } })}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DDepartmentList;
