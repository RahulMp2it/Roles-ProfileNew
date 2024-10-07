import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@fontsource/inika";
import { useForm } from "react-hook-form";

function SignUp() {
  const [logoBgColor, setLogoBgColor] = useState("white");
  const [logoColor, setLogoColor] = useState("default");
  const [currentImage, setCurrentImage] = useState("logo1.png");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleSignUp = (data) => {
    console.log(data);

    axios
      .post("http://localhost:8080/api/user/register", data)
      .then((result) => {
        console.log(result);
        if (result.status == 201) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  // Watch the password field for matching confirmation
  const password = watch("password");

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImage((prevImage) =>
  //       prevImage === "logo1.png" ? "logo2.png" : "logo1.png"
  //     );
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div
      className="text-white h-[100vh] flex justify-center items-center bg-cover"
      style={{ backgroundImage: "url('Login-Page-img.png" }}
    >
      <div className="flex items-center justify-center ">
        <div className="bg-[#5882C147] w-[370px] rounded-[18px] p-5 backdrop-filter backdrop-blur-sm bg-opacity-50 relative flex items-center justify-center ">
          {/* logo image */}
          <div className="flex flex-col items-center justify-center">
            <div className="  relative w-[90px] shadow-logo-shadow ">
              <img src={currentImage} alt="logo" />
            </div>
            <div className="font-inika">
              <h1 className="relative  my-3 text-[22px] text-white mb-3">
                Register
              </h1>
              <form onSubmit={handleSubmit(handleSignUp)}>
                <div className="relative my-4 text-[13px]">
                  <label htmlFor="">Name</label>
                  <input
                    {...register("name", {
                      required: true,
                      minLength: { value: 3, message: "min length 3" },
                      maxLength: { value: 20, message: "max length 20" },
                      pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: "it is not valid",
                      },
                    })}
                    type="text"
                    placeholder="Full Name"
                    className="w-full rounded-[5px] text-black py-1 text-[14px] pl-3"
                  />
                  {errors.name && (
                    <p className="text-[red]">{errors.name.message}</p>
                  )}
                </div>
                <div className="relative  my-4 text-[13px]">
                  <label htmlFor="">Email</label>
                  <br />
                  <input
                    {...register("email", {
                      required: true,
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder="admin@123.com"
                    className="w-full rounded-[5px] text-black py-1 text-[14px] pl-3  "
                  />
                  {errors.email && (
                    <p className="text-[red]">{errors.email.message}</p>
                  )}
                </div>
                <div className="relative  my-4 text-[13px]">
                  <label htmlFor="">Password</label>
                  <br />
                  <input
                    {...register("password", {
                      required: true,
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
                        message:
                          "Password must contain at least 8 characters,including uppercase, lowercase, number, and special character",
                      },
                    })}
                    type="password"
                    placeholder="*********"
                    className="w-full rounded-[5px] py-1 text-black text-[14px] pl-2"
                  />
                  {errors.password && (
                    <p className="text-[red]">{errors.password.message}</p>
                  )}
                </div>
                <div className="relative  my-4 text-[13px]">
                  <label htmlFor="">Confirm Password</label>
                  <br />
                  <input
                    {...register("passwordConfirmation", {
                      required: true,
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    type="password"
                    placeholder="*********"
                    className="w-full rounded-[5px] py-1 text-black text-[14px] pl-2"
                  />
                  {errors.passwordConfirmation && (
                    <p className="text-[red]">
                      {errors.passwordConfirmation.message}
                    </p>
                  )}
                </div>

                <div className="bg-[#003465] py-[6px] rounded-[8px] text-center text-[15px]">
                  <button type="submit">Sign Up</button>
                </div>
              </form>
              <p className=" text-[11px] text-center py-3">
                Allready have an Account
              </p>
              <div className="w-full">
                <Link
                  to={"/login"}
                  className="bg-[#003465] px-24 mt-7 py-[6px] rounded-[8px] text-center text-[15px]"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
