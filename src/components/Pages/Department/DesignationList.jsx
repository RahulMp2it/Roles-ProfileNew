import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from '../../../utils/Card';

const DesignationList = () => {
  const { id: departmentId } = useParams();
  const { state } = useLocation();
  const DepartmentName = state?.DepartmentName || 'Department';

  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (departmentId) {
      fetchDesignations();
    } else {
      console.error("Department ID is undefined");
    }
  }, [departmentId]);

  const fetchDesignations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/designation/department/${departmentId}`);
      //console.log("Fetched designations:", response.data); 

      setDesignations(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching designations:", error);
      setError("Failed to load designations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{DepartmentName} Designations</h2>
      {loading ? (
        <p>Loading designations...</p>
      ) : error ? (
        <p>{error}</p>
      ) : designations.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {designations.map(designation => (
            <Card
              key={designation._id}
              image={designation.image || "/image2.png"}
              title={designation.DesignationName}
              buttonText="View Details"
            />
          ))}
        </div>
      ) : (
        <p>No designations found for this department.</p>
      )}
    </div>
  );
};

export default DesignationList;
