import React, { useEffect, useRef, useState } from "react";
import DesignationCard from "../../../utils/DesignationCard";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout";
import axios from "axios";

function Designation() {
  const navigate = useNavigate();
  const addDesignation = useRef();
  const [designations, setDesignations] = useState([]);
  const [form, setForm] = useState({
    DesignationName: "",
    DepartmentName: "",
  });

  const departments = [
    { id: 1, name: "Human Resources Department" },
    { id: 2, name: "Engineering Department" },
    { id: 3, name: "Marketing Department" },
    { id: 4, name: "R&D Department" },
    // we can add more departments as needed
  ];

  useEffect(() => {
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

    fetchDesignations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/designation",
        form
      );
      if (response.data.status === "success") {
        setDesignations([...designations, response.data.data]);
        addDesignation.current.close();
        setForm({ DesignationName: "", DepartmentName: "" });
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to save designation:", error);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2">
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
                  <form onSubmit={handleSubmit}>
                    <div className="text-[20px] text-start px-4 py-4 font-bold">
                      Add Designation
                    </div>
                    <div className="px-4 pb-8">
                      <div className="mb-4 py-2">
                        <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium ">
                          Type of Department
                        </label>
                        <select
                          name="DepartmentName"
                          value={form.DepartmentName}
                          onChange={handleChange}
                          className="select mt-1 flex w-full px-3 border border-gray-300 rounded-[14px] shadow-sm items-center text-[#7D8592] focus:outline-none"
                          required
                        >
                          <option value="" disabled>
                            Select Department
                          </option>
                          {departments.map((department) => (
                            <option key={department.id} value={department.name}>
                              {department.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4 py-2">
                        <label className="block text-[12px] text-start pb-1 font-medium text-[#7D8592]">
                          Designation Name
                        </label>
                        <input
                          type="text"
                          name="DesignationName"
                          value={form.DesignationName}
                          onChange={handleChange}
                          placeholder="Designation Name"
                          className="mt-1 flex items-center w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                          required
                        />
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
            {designations.map((designation) => (
              <DesignationCard
                key={designation._id}
                image={designation.image || "/image2.png"}
                title={designation.DesignationName}
                buttonText="1 Member"
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Designation;
