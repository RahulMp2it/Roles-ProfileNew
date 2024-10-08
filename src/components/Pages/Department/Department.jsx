import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Card from "../../../utils/Card";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout";
import { useForm } from "react-hook-form";

const Department = () => {
  const navigate = useNavigate();
  const addDepartment = useRef();
  const [form, setForm] = useState({ DepartmentName: "" });
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/department",
        { DepartmentName: data.DepartmentName }
      );

      if (response.status === 201) {
        alert("Department added successfully!");
        addDepartment.current.close();
        // setForm({ DepartmentName: "" });
        reset();
        fetchDepartments();
      }
    } catch (error) {
      console.error("Error adding department:", error);
      alert("Failed to add department");
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/department");
      setDepartments(response.data.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      alert("Failed to fetch departments");
    }
  };

  return (
    <Layout>
      <div className="fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2 ">
        <div className="overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
          <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">
            "Welcome back, Rahul Singh"
          </p>
          <div className="grid grid-cols-4 place-content-between gap-4">
            <div className="col-span-3 ">
              <h1 className="text-[34px] font-nunito font-semibold">
                Department
              </h1>
            </div>

            <div className="text-end">
              <button
                className="btn text-white font-nunito w-[200px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
                onClick={() => addDepartment.current.showModal()}
              >
                + Add more Department
              </button>
              <dialog ref={addDepartment} className="modal h-auto">
                <div className="modal-box">
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={() => addDepartment.current.close()}
                  >
                    ✕
                  </button>
                  <form
                    method="dialog modal-action"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="text-[20px] text-start px-4 py-4 font-bold">
                      Add Department
                    </div>
                    <div className="px-4 pb-8">
                      <div className="mb-4 py-2">
                        <label className="block text-[12px] pb-1 text-[#7D8592] text-start font-medium ">
                          Department Name
                        </label>
                        <input
                          {...register("DepartmentName", {
                            required: "Department name is required",
                            minLength: {
                              value: 3,
                              message: "min length 3",
                            },
                            maxLength: {
                              value: 20,
                              message: "max length 20",
                            },
                            pattern: {
                              value: /^[A-Za-z]+$/i,
                              message: "not valid number not allowed",
                            },
                          })}
                          type="text"
                          name="DepartmentName"
                          value={form.DepartmentName}
                          onChange={handleChange}
                          placeholder="Department name"
                          className="mt-1 flex w-full px-3 py-2 border border-gray-300 rounded-[14px] shadow-sm items-center focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-[12px]"
                          required
                        />
                        {errors.DepartmentName && (
                          <p className="text-[red]">
                            {errors.DepartmentName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      className="btn text-white font-nunito w-[150px] px-2 py-3 bg-[#3F8CFF] rounded-xl"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Department"}
                    </button>
                  </form>
                </div>
              </dialog>
            </div>
          </div>

          <div className="max-w-[1400px] mt-3 px-24 py-8 mx-auto grid lg:grid-cols-4 rounded-[20px] gap-24 bg-white">
            {departments.map((department) => (
              <Card
                key={department._id}
                image={department.image || "/image1.png"}
                title={department.DepartmentName}
                buttonText="1 Member"
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Department;
