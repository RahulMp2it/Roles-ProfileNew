import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@fontsource/inika";

function SignUp() {
  const [logoBgColor, setLogoBgColor] = useState("white");
  const [logoColor, setLogoColor] = useState("default");
  const [currentImage, setCurrentImage] = useState("logo1.png");

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/user/register", {
        name,
        email,
        password,
        passwordConfirmation,
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) =>
        prevImage === "logo1.png" ? "logo2.png" : "logo1.png"
      );
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

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
              <form onSubmit={handleSubmit}>
                <div className="relative my-4 text-[13px]">
                  <label htmlFor="">Name</label>
                  {/* <br /> */}
                  <input
                    type="name"
                    placeholder="Full Name"
                    className="w-full rounded-[5px] text-black py-1 text-[14px] pl-3  "
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="relative  my-4 text-[13px]">
                  <label htmlFor="">Email</label>
                  <br />
                  <input
                    type="email"
                    placeholder="admin@123.com"
                    className="w-full rounded-[5px] text-black py-1 text-[14px] pl-3  "
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative  my-4 text-[13px]">
                  <label htmlFor="">Password</label>
                  <br />
                  <input
                    type="password"
                    placeholder="*********"
                    className="w-full rounded-[5px] py-1 text-black text-[14px] pl-2"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="relative  my-4 text-[13px]">
                  <label htmlFor="">Confirm Password</label>
                  <br />
                  <input
                    type="password"
                    placeholder="*********"
                    className="w-full rounded-[5px] py-1 text-black text-[14px] pl-2"
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
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
