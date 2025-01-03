import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@fontsource/inika";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";

function LoginPage() {
  const [currentImage, setCurrentImage] = useState("logo1.png");

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  // Logo switching logic
    useEffect(() => {
      const logos = ["logo1.png", "logo2.png"]; // Add more image names if needed
      let index = 0;
  
      const interval = setInterval(() => {
        index = (index + 1) % logos.length; // Cycle through the logos
        setCurrentImage(logos[index]);
      }, 3000); // Switch every 3 seconds
  
      return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImage((prevImage) =>
  //       prevImage === "logo1.png" ? "logo2.png" : "logo1.png"
  //     );
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm();

  const handleSignIn = (data) => {
    console.log(data);

    axios
      .post("http://localhost:8080/api/user/login", data)
      .then((result) => {
        console.log(result);
        if (result.data.success) {
          localStorage.setItem("token", result.data.token);
          navigate("/");
        } else {
          setLoginError("Email not registered. Please sign up first.");
        }
      })

      .catch((err) => {
        setLoginError("Error Occured, Please try again.=>", err);
      });
  };

  return (
    <div
      className="text-white h-[100vh] flex justify-center items-center bg-cover"
      style={{ backgroundImage: "url('Login-Page-img.png" }}
    >
      <div className="flex items-center justify-center">
        <div className="bg-[#5882C147] rounded-[18px] p-10 py-5 backdrop-filter backdrop-blur-sm bg-opacity-50 relative flex items-center justify-center ">
          {/* logo image */}
          <div className="flex flex-col items-center justify-center">
            <div className="  relative w-[90px] rounded-[19px] shadow-logo-shadow ">
              <img src={currentImage} className="" alt="logo" />
            </div>
            <div className="font-inika px-8">
              <h1 className="relative my-3 text-[24px] text-white mb-4">
                Login
              </h1>

              <form action="" onSubmit={handleSubmit(handleSignIn)}>
                <div className="relative my-4 text-[13px]">
                  <label htmlFor="">Email</label>
                  <br />
                  <input
                    {...register("email", {
                      required: "Email is required",
                    })}
                    type="email"
                    placeholder="admin@123.com"
                    className="w-full rounded-[5px] text-black mt-1 py-1 text-[14px] pl-2"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative my-4 text-[13px]">
                  <label htmlFor="">Password</label>
                  <br />
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type="password"
                    placeholder="*********"
                    className="w-full rounded-[5px] py-1 mt-1 text-black text-[14px] pl-2"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="relative my-4 text-[13px]">
                  <span>Forgot Password?</span>
                </div>
                <div className="bg-[#003465] py-[6px] rounded-[8px] text-center text-[15px]">
                  <button type="submit">Sign In</button>
                </div>
                <p className="text-red-600">{loginError}</p>
                <p className=" text-[13px] text-center py-3">
                  or continue with
                </p>
                <div className="flex justify-center items-center gap-8">
                  <div className="bg-white px-6 py-2 rounded-[7px]">
                    <FcGoogle />
                  </div>
                  <div className="bg-white px-6 py-[8px] rounded-[7px]">
                    <img src="icone/micro.png" width={16} alt="" />
                  </div>
                </div>
                <div>
                  <p className=" text-[11px] text-center py-3">
                    Don't have an account yet?
                    <Link to={"/Register"}> Register for free</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
