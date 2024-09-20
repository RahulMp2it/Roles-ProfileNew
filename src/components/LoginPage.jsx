import React from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div
      className="text-white h-[100vh] flex justify-center items-center bg-cover"
      style={{ backgroundImage: "url('Login-Page-img.png" }}
    >
      <div className="flex items-center justify-center">
        <div className="bg-[#5882C147] rounded-[18px] p-8 backdrop-filter backdrop-blur-sm bg-opacity-50 relative flex items-center justify-center ">
          {/* logo image */}
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white relative my-4 w-14 rounded-[8px] ">
              <img src="mprw logo-01.png" alt="logo" />
            </div>
            <div>
              <h1 className="relative my-4 text-3xl text-white mb-6">Login</h1>
              <form action="">
                <div className="relative my-4">
                  <label htmlFor="">Email</label>
                  <br />
                  <input
                    type="email"
                    placeholder="admin@123.com"
                    className="w-full rounded-[5px] py-2 text-[14px] pl-2  "
                  />
                </div>
                <div className="relative my-4">
                  <label htmlFor="">Password</label>
                  <br />
                  <input
                    type="password"
                    placeholder="*********"
                    className="w-full rounded-[5px] py-2 text-[14px] pl-2"
                  />
                </div>
                <div className="relative my-4">
                  <span>Forgot Password?</span>
                </div>
                <div className="bg-[#003465] mx-10 py-2 rounded-[8px] text-center text-[18px]">
                  <button type="submit">Sign In</button>
                </div>
                <span>or continue with</span>
                <div>
                  <img src="" alt="" />
                  <img src="" alt="" />
                </div>
                <div>
                  <span>
                    Don't have an account yet?
                    <Link to={"/Register"}> Register for free</Link>
                  </span>
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
