import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const EmployeeList = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const DepartmentName = state?.DepartmentName || 'Department';

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (id) fetchEmployees();
  }, [id]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/employee/${id}`);
      console.log("Fetched employees:===>", response.data);
      setEmployees(response.data);

    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <div>
      <h2>{DepartmentName} Employees</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee._id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
