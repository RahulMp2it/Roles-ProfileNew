import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const EmployeeList = () => {
  const { id: departmentId } = useParams(); // Department ID
  const { state } = useLocation();
  const DepartmentName = state?.DepartmentName || 'Department';

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
    <div>
      <h2>{DepartmentName} Employees</h2>
      {loading ? (
        <p>Loading employees...</p>
      ) : error ? (
        <p>{error}</p>
      ) : employees.length > 0 ? (
        <ul>
          {employees.map(employee => (
            <li key={employee._id}>{employee.name}</li>
          ))}
        </ul>
      ) : (
        <p>No employees found for this department.</p>
      )}
    </div>
  );
};

export default EmployeeList;
