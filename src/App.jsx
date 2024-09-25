import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Department from "./components/Pages/Department/Department";
import Profile from "./components/Pages/Profile/Profile";
import Designation from "./components/Pages/Designation/Designation";
import ProfileAssign from "./components/Pages/ProfileAssign/ProfileAssign";
import Employees from "./components/Pages/Employees/Employees";
import { useEffect, useState } from "react";
import SubDepartment from "./components/Pages/Department/SubDepartment";
import RDposition from "./components/Pages/Department/RDposition";
import RDprofile from "./components/Pages/Department/RDprofile";
import RDemployee from "./components/Pages/Department/RDemployee";
import DesignationRDdepart from "./components/Pages/Designation/DesignationRDdepart";
import { FaArrowLeftLong } from "react-icons/fa6";
import DesignationEmployee from "./components/Pages/Designation/DesignationEmployee";
import DesignationPosition from "./components/Pages/Designation/DesignationPosition";
import DesignationProfile from "./components/Pages/Designation/DesignationProfile";
import LoginPage from "./components/LoginPage";

function App() {
  const [heading, setHeading] = useState("Department");
  const location = useLocation();
  const navigate = useNavigate();

  const [isSubPage, setIsSubPage] = useState(false); // Track if it's a subpage

  useEffect(() => {
    switch (location.pathname) {
      case "/Employees":
        setHeading("Employees");
        setIsSubPage(false);
        break;
      case "/department":
        setHeading("Department");
        setIsSubPage(false);
        break;
      case "/profile":
        setHeading("Profile");
        setIsSubPage(false);
        break;
      case "/Designation":
        setHeading("Designation");
        setIsSubPage(false);
        break;
      case "/ProfileAssign":
        setHeading("Profile Assign");
        setIsSubPage(false);
        break;
      case "/SubDepartment":
        setHeading("Department/Sub-Department");
        setIsSubPage(true);
        break;
      case "/RDPosition":
        setHeading("Department/Sub-Department/R&D Department Position");
        setIsSubPage(true);
        break;
      case "/RDprofile":
        setHeading("Department/Sub-Department/R&D Department Profile");
        setIsSubPage(true);
        break;
      case "/RDemployee":
        setHeading("Department/Sub-Department/R&D Department Employee");
        setIsSubPage(true);
        break;
      case "/designationRDdepart": //sub Designation pages
        setHeading("Designation/Designation R&D Department");
        setIsSubPage(true);
        break;
      case "/designationEmployee":
        setHeading(
          "Designation/Designation R&D Department/Employee Designation Department"
        );
        setIsSubPage(true);
        break;
      case "/designationProfile":
        setHeading(
          "Designation/Designation R&D Department/Profile Designation Department"
        );
        setIsSubPage(true);
        break;
      case "/designationPosition":
        setHeading(
          "Designation/Designation R&D Department/Position Designation Department"
        );
        setIsSubPage(true);
        break;
      default:
        setHeading("Department");
        setIsSubPage(false);
    }
  }, [location.pathname]);

  // Function to handle going back to the previous page
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
      {/* <LoginPage /> */}
      <Sidebar />
      <Navbar />
      {/* <div className=" fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2 ">
        <div className=" overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
          <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">
            {isSubPage ? (
              <span
                onClick={handleBackClick}
                className="cursor-pointer text-[#3F8CFF] inline-flex items-center gap-2"
              >
                <FaArrowLeftLong />
                {"Back to Dashboard"}
              </span>
            ) : (
              "Welcome back, Rahul singh"
            )}
          </p>
          <div className="grid grid-cols-4 place-content-between gap-4">
            <div className="col-span-3 ">
              <h1 className="text-[34px] font-nunito font-semibold">
                {heading}
              </h1>
            </div>
            {!isSubPage && (
              <div className=" text-end">
                <button className=" text-white font-nunito w-[200px] px-2 py-3 bg-[#3F8CFF] rounded-xl">
                  {"+ Add  " + heading}
                </button>
              </div>
            )}
          </div>

        </div>
      </div> */}
      <Routes>
        <Route path="/" element={<Department />} />
        <Route path="/Employees" element={<Employees />} />
        <Route path="/department" element={<Department />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Designation" element={<Designation />} />
        <Route path="/ProfileAssign" element={<ProfileAssign />} />
        <Route path="/SubDepartment" element={<SubDepartment />} />
        <Route path="/RDPosition" element={<RDposition />} />
        <Route path="/RDprofile" element={<RDprofile />} />
        <Route path="/RDemployee" element={<RDemployee />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/designationRDdepart" element={<DesignationRDdepart />} />
        <Route path="/designationPosition" element={<DesignationPosition />} />
        <Route path="/designationProfile" element={<DesignationProfile />} />
        <Route path="/designationEmployee" element={<DesignationEmployee />} />
      </Routes>
    </>
  );
}

export default App;
