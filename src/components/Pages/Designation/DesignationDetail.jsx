import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DesignationCard from '../../../utils/DesignationCard';
import Layout from '../../Layout';
import { FaArrowLeftLong } from 'react-icons/fa6';

const DesignationDetail = ({ heading, isSubPage }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const DesignationName = state?.DesignationName || 'Designation';

  console.log("id is===> ", id);


  const [department, setDepartment] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (id) {
      fetchData();
    } else {
      console.error("Designation ID is undefined");
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const [departmentRes, profileRes, employeeRes] = await Promise.all([
        axios.get(`http://localhost:8080/api/department/designation/${id}`),
        axios.get(`http://localhost:8080/api/profile/designation/${id}`),
        axios.get(`http://localhost:8080/api/employee/designation/${id}`)
      ]);
      setDepartment(departmentRes.data);
      setProfiles(profileRes.data);
      setEmployees(employeeRes.data);
      console.log('====>', profileRes);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Layout>
      <div className=" fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2 z-10">
        <div className=" overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
          <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">
            {isSubPage ? (
              <button onClick={() => navigate(-1)} className="text-blue-500 flex items-center">
                <FaArrowLeftLong className="mr-2" /> {heading}
              </button>
            ) : (
              <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">{heading}</p>
            )}
          </p>
          <div className="grid grid-cols-4 place-content-between gap-4">
            <div className="col-span-3">
              <h1 className="text-[34px] font-nunito font-semibold">Designation /Sub Designation</h1>
            </div>
          </div>
          <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
            {id && (
              <>
                <DesignationCard title={`${DesignationName} Department`} buttonText="View Department"
                  onClick={() => navigate(`/designation/${id}/department`, { state: { DesignationName, id } })}
                />
                <DesignationCard title={`${DesignationName} Profile`} buttonText="View Profiles"
                  onClick={() => navigate(`/designation/${id}/profiles`, { state: { DesignationName, id } })}
                />
                <DesignationCard title={`${DesignationName} Employees`} buttonText="View Employees"
                  onClick={() => navigate(`/designation/${id}/employees`, { state: { DesignationName, id } })}
                />
              </>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
}

export default DesignationDetail;
