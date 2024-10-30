import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../../../utils/Card';
import Layout from '../../Layout';

const DepartmentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const DepartmentName = state?.DepartmentName || 'Department';

  const [designations, setDesignations] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [designationRes, profileRes, employeeRes] = await Promise.all([
        axios.get(`http://localhost:8080/api/designation/${id}`),
        axios.get(`http://localhost:8080/api/profile/${id}`),
        axios.get(`http://localhost:8080/api/employee/${id}`)
      ]);
      setDesignations(designationRes.data);
      setProfiles(profileRes.data);
      setEmployees(employeeRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Layout>
      <div className=" fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2 z-10">
        <div className=" overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
          <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">
            "Welcome back, Rahul singh"
          </p>
          <div className="grid grid-cols-3 place-content-between gap-4">
            <div className="col-span-3">
              <h1 className="text-[34px] font-nunito font-semibold">Sub Department</h1>
            </div>
            <Card
              title={`${DepartmentName} Designation`}
              buttonText="View Designations"
              onClick={() => navigate(`/department/${id}/designations`, { state: { DepartmentName } })}
            />

            <Card title={`${DepartmentName} Profile`} buttonText="View Profiles" />

            <Card
              title={`${DepartmentName} Employees`}
              buttonText="View Employees"
              onClick={() => navigate(`/department/${id}/employee`)}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default DepartmentDetail; 
