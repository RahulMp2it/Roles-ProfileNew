import React, { useEffect, useRef, useState } from "react";
import DesignationCard from "../../../utils/DesignationCard";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout";
import axios from "axios";
import { useForm } from "react-hook-form";
import EditDesignationModal from "./EditDesignationModal";

function Designation() {
  const navigate = useNavigate();
  const addDesignation = useRef();
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(selectedDesignation);

  const updateDesignation = useRef();

  const openEditModal = (designation) => {
    setSelectedDesignation(designation);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedDesignation(null);
  };

  const handleUpdate = (updatedDesignation) => {
    // Update the Designation state after editing
    setDesignations((prevDesignations) =>
      prevDesignations.map((desig) =>
        desig.id === updatedDesignation.id ? updatedDesignation : desig
      )
    );
  };

  const [form, setForm] = useState({
    DesignationName: "",
    department: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const fetchDesignations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/designation"
      );
      setDesignations(response.data.data);
    } catch (error) {
      console.error("Failed to fetch designations:", error);
    }
  };

  // Fetch departments from the backend
  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/department");
      setDepartments(response.data.data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  useEffect(() => {
    fetchDesignations();
    fetchDepartments(); //fetchDepartments when the component mounts
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/designation",
        data
      );
      if (response.data.status === "success") {
        setDesignations([...designations, response.data.data]);
        addDesignation.current.close();
        reset();
        setForm({ DesignationName: "", DepartmentName: "" });
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to save designation:", error);
    }
  };

  // Delete Designation From database
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/designation/${id}`)
      .then((response) => {
        console.log("designation deleted successfully:", response.data);
        updateDesignations();
      })
      .catch((error) => {
        console.error("There was an error deleting the designation:", error);
      });
  };

  //Update the function to refresh after delete
  const updateDesignations = () => {
    fetchDesignations();
  }


  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2 z-10">
        <div className="overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
          <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">
            "Welcome back, Rahul Singh"
          </p>
          <div className="grid grid-cols-4 place-content-between gap-4">
            <div className="col-span-3">
              <h1 className="text-[34px] font-nunito font-semibold">
                Designation
              </h1>
            </div>
            <div className="text-end">
              <button
                className="btn text-white font-nunito w-[200px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
                onClick={() => addDesignation.current.showModal()}
              >
                + Add Designation
              </button>
              <dialog ref={addDesignation} className="modal h-auto">
                <div className="modal-box overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => addDesignation.current.close()}
                  >
                    ✕
                  </button>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-[20px] text-start px-4 py-4 font-bold">
                      Add Designation
                    </div>
                    <div className="px-4 pb-8">
                      <div className="mb-4 py-2">
                        <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium ">
                          Type of Department
                        </label>
                        <select
                          {...register("department", {
                            required: "Department name is required",
                          })}
                          name="department"
                          value={form.department}
                          onChange={handleChange}
                          className="select mt-1 flex w-full px-3 border border-gray-300 rounded-[14px] shadow-sm items-center text-[#7D8592] focus:outline-none"
                          required
                        >
                          <option value="" disabled>
                            Select Department
                          </option>
                          {departments.map((department) => (
                            <option key={department._id} value={department._id}>
                              {department.DepartmentName}
                            </option>
                          ))}
                        </select>
                        {errors.department && (
                          <p className="text-red-600">
                            {errors.department.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-4 py-2">
                        <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
                          Designation Name
                        </label>
                        <input
                          {...register("DesignationName", {
                            required: "Designation name is required",
                            minLength: {
                              value: 2,
                              message: "Min length is 2 characters",
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
                          name="DesignationName"
                          value={form.DesignationName}
                          onChange={handleChange}
                          placeholder="Designation Name"
                          className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                          required
                        />
                        {errors.DesignationName && (
                          <p className="text-red-600">
                            {errors.DesignationName.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-6 py-2">
                        <label className="block text-start text-[12px] pb-1 font-medium text-[#7D8592]">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                          placeholder=" Add some Descriptionof the Designtion"
                          className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px] min-h-[100px]"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn text-white font-nunito w-[150px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
                    >
                      Save Designation
                    </button>
                  </form>
                </div>
              </dialog>
            </div>
          </div>

          <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
            {designations.map((designation, key) => (
              <DesignationCard
                key={key}
                id={designation._id} // unique IDa
                image={designation.image || "/image5.png"}
                title={designation.DesignationName}
                buttonText="1 Member"
                updateDesignation={updateDesignation}
                handleDelete={handleDelete}
                openEditModal={() => openEditModal(designation)} // Pass function to open modal
                onClick={() => navigate(`/designation/${designation._id}`, { state: { DesignationName: designation.DesignationName } })} // Pass department name in state
              />

            ))}

            {/* Edit Designation Modal */}
            {selectedDesignation && (
              <EditDesignationModal
                designation={selectedDesignation}
                isOpen={isModalOpen}
                onClose={closeEditModal}
                onUpdate={handleUpdate}
                update={fetchDesignations}
              />
            )}

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Designation;
