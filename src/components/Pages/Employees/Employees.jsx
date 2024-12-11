import React, { useState, useRef, useEffect } from "react";
import EmployeesCard from "../../../utils/EmployeesCard";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../Layout";
import { FiFilter } from "react-icons/fi";
import axios from "axios";
import EditEmployeeModal from "./EditEmployeeModal";
import { useForm } from "react-hook-form";

function Employees() {
  const navigate = useNavigate();
  const addEmployee = useRef();
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]); // New state for departments
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //console.log(selectedEmployee);

  const updateEmployee = useRef();

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleUpdate = (updatedEmployee) => {
    // Update the employees state after editing
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "", // Add department field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Create and Add Employee
  const onSubmit = (data) => {
    axios
      .post("http://localhost:8080/api/employee", data)
      .then((response) => {
        console.log("Employee added successfully:", response.data);
        setForm({
          name: "",
          email: "",
          phone: "",
          department: "", // Reset department field
        });
        addEmployee.current.close();
        reset();
        fetchEmployees();
      })
      .catch((error) => {
        console.error("There was an error adding the employee:", error);
      });
  };

  // Fetch departments data
  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/department");
      setDepartments(response.data.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // Fetch employees data
  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/employee");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setError(error.message);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments(); // Fetch departments when component mounts
  }, []);

  // Delete employee From database
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/employee/${id}`) // Delete the employee
      .then((response) => {
        console.log("Employee deleted successfully:", response.data);
        updateEmployees();
      })
      .catch((error) => {
        console.error("There was an error deleting the employee:", error);
      });
  };
  //Update the function to refresh after delete
  const updateEmployees = () => {
    fetchEmployees(); // re-fresh the Employee
  }

  //Validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <>
      <Layout>
        <div className="fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2 z-10">
          <div className="overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
            <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">
              "Welcome back, Rahul Singh"
            </p>
            <div className="grid grid-cols-2 place-content-between gap-4">
              <div className="col-span-1">
                <h1 className="text-[34px] font-nunito font-semibold">
                  Employee
                </h1>
              </div>

              <div className="col-span-1 ml-34 text-end flex items-center justify-end gap-4">
                <button
                  className="btn text-white font-nunito w-[200px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
                  onClick={() => addEmployee.current.showModal()}
                >
                  + Add Employee
                </button>
                <dialog ref={addEmployee} className="modal h-auto">
                  <div className="modal-box overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
                    <button
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      onClick={() => addEmployee.current.close()}
                    >
                      ✕
                    </button>
                    <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
                      <div className="text-[20px] text-start px-4 py-4 font-bold">
                        Add Employee
                      </div>
                      <div className="px-4 pb-8">
                        <div className="mb-4 py-2">
                          <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium ">
                            Employee Name
                          </label>
                          <input
                            {...register("name", {
                              required: " name is required",
                              minLength: {
                                value: 3,
                                message: "Min length is 3 characters",
                              },
                              maxLength: {
                                value: 50,
                                message: "Max length is 50 characters",
                              },
                              pattern: {
                                value: /^[A-Za-z\s]+$/i,

                                message: "not valid number not allowed",
                              },
                            })}
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter Name"
                            className="mt-1 flex w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm items-center focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                          />
                          {errors.name && (
                            <p className="text-red-600">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-4 py-2">
                          <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
                            Employee Email
                          </label>
                          <input
                            {...register("email", {
                              required: true,
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address",
                              },
                            })}
                            type="text"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="admin@gmail.com"
                            className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                          />
                          {errors.email && (
                            <p className="text-[red]">{errors.email.message}</p>
                          )}
                        </div>
                        <div className="mb-4 py-2">
                          <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
                            Employee phoneNo.
                          </label>
                          <input
                            {...register("phone", {
                              required: true,
                              pattern: {

                                value: /^\d{10}$/,
                                message: "Enter a valid phone number",
                              },
                            })}
                            maxLength={10} // Restrict the input to 10 characters
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+91"
                            className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                          />
                          {errors.phone && (
                            <p className="text-[red]">{errors.phone.message}</p>
                          )}
                        </div>

                        {/* Department selection dropdown */}
                        <div className="mb-4 py-2">
                          <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium ">
                            Department
                          </label>
                          <select
                            {...register("department", { required: "Department is required" })}
                            name="department"
                            value={form.department}
                            onChange={handleChange}
                            className="mt-1 flex w-full px-3 border border-gray-300 rounded-[14px]"
                          >
                            <option value="">Select Department</option>
                            {departments.map((department) => (
                              <option key={department._id} value={department._id}>
                                {department.DepartmentName}
                              </option>
                            ))}
                          </select>
                          {errors.department && <p className="text-red-600">{errors.department.message}</p>}
                        </div>

                      </div>
                      <button
                        type="submit"
                        className="btn text-white font-nunito w-[150px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
                      >
                        Save Employee
                      </button>
                    </form>
                  </div>
                </dialog>
              </div>
            </div>

            <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
              {employees.map((employee, key) => (
                <EmployeesCard
                  key={key}
                  id={employee._id} // unique ID
                  image={employee.image ? employee.image : "/dummy-profile.png"}
                  name={employee.name}
                  email={employee.email}
                  phone={employee.phone}
                  handleDelete={handleDelete}
                  updateEmployee={updateEmployee}
                  openEditModal={() => openEditModal(employee)} // Pass function to open modal
                />
              ))}

              {/* Edit Employee Modal */}
              {selectedEmployee && (
                <EditEmployeeModal
                  employee={selectedEmployee}
                  isOpen={isModalOpen}
                  onClose={closeEditModal}
                  onUpdate={handleUpdate}
                  update={fetchEmployees}
                />
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Employees;
