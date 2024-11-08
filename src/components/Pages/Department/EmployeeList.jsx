import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';
import EmployeesCard from '../../../utils/EmployeesCard';
import { FaArrowLeftLong } from 'react-icons/fa6';

const EmployeeList = ({ heading, isSubPage }) => {
  const { id: departmentId } = useParams(); // Department ID
  const { state } = useLocation();
  const DepartmentName = state?.DepartmentName || 'Department';
  const navigate = useNavigate();
  console.log("Department ID:", departmentId);


  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (departmentId) {
      fetchEmployees();
    } else {
      console.error("Department ID is undefined");
    }
  }, [departmentId]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/employee/department/${departmentId}`);
      // console.log("Fetched employees:===>", response.data);
      setEmployees(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError("Failed to load employees.");
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
              <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">{heading}</p>
            )}
          </p>
          <div className="grid grid-cols-4 place-content-between gap-4">
            <div className="col-span-3">
              <h1 className="text-[34px] font-nunito font-semibold">{DepartmentName} Employees</h1>
            </div>
          </div>
          <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
            {loading ? (
              <p>Loading employees...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : employees.length > 0 ? (
              employees.map(employee => (
                <EmployeesCard
                  key={employee._id}
                  image={employee.image || "/dummy-profile.png"}
                  name={employee.name}
                  email={employee.email}
                  phone={employee.phone}
                  subtitle={employee.position || 'Position Unknown'}
                  buttonText="View Details"

                />
              ))
            ) : (
              <p>No employees found for this department.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeList;
