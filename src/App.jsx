import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import DesignationEmployee from "./components/Pages/Designation/DesignationEmployee";
import DesignationPosition from "./components/Pages/Designation/DesignationPosition";
import DesignationProfile from "./components/Pages/Designation/DesignationProfile";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProfileDescribe from "./components/Pages/Profile/ProfileDescribe";
import DepartmentDetail from "./components/Pages/Department/DepartmentDetail";
import EmployeeList from "./components/Pages/Department/EmployeeList";
import ProfileList from "./components/Pages/Department/ProfileList";
import DesignationList from "./components/Pages/Department/DesignationList";
import DesignationDetail from "./components/Pages/Designation/DesignationDetail";
import DProfileList from "./components/Pages/Designation/DProfileList";
import DEmployeeList from "./components/Pages/Designation/DEmployeeList";
import DDepartmentList from "./components/Pages/Designation/DDepartmentList";
import Demo from "./components/Demo";

function App() {
  const [heading, setHeading] = useState("Department");
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubPage, setIsSubPage] = useState(false); // Track if it's a subpage

  const handleRegister = () => {
    setIsRegistered(true);
    setIsLoggedIn(true);
    navigate("/");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // useEffect(() => {
  //   switch (location.pathname) {
  //     case "/Employees":
  //       setHeading("Employees");
  //       setIsSubPage(false);
  //       break;
  //     case "/department":
  //       setHeading("Department");
  //       setIsSubPage(false);
  //       break;
  //     case "/profile":
  //       setHeading("Profile");
  //       setIsSubPage(false);
  //       break;
  //     case "/Designation":
  //       setHeading("Designation");
  //       setIsSubPage(false);
  //       break;
  //     case "/ProfileAssign":
  //       setHeading("Profile Assign");
  //       setIsSubPage(false);
  //       break;
  //     case "/department/:id":
  //       setHeading("Department/Sub-Department");
  //       setIsSubPage(true);
  //       break;
  //     case "/RDPosition":
  //       setHeading("Department/Sub-Department/R&D Department Position");
  //       setIsSubPage(true);
  //       break;
  //     case "/RDprofile":
  //       setHeading("Department/Sub-Department/R&D Department Profile");
  //       setIsSubPage(true);
  //       break;
  //     case "/RDemployee":
  //       setHeading("Department/Sub-Department/R&D Department Employee");
  //       setIsSubPage(true);
  //       break;
  //     case "/designationRDdepart": //sub Designation pages
  //       setHeading("Designation/Designation R&D Department");
  //       setIsSubPage(true);
  //       break;
  //     case "/designationEmployee":
  //       setHeading(
  //         "Designation/Designation R&D Department/Employee Designation Department"
  //       );
  //       setIsSubPage(true);
  //       break;
  //     case "/designationProfile":
  //       setHeading(
  //         "Designation/Designation R&D Department/Profile Designation Department"
  //       );
  //       setIsSubPage(true);
  //       break;
  //     case "/designationPosition":
  //       setHeading(
  //         "Designation/Designation R&D Department/Position Designation Department"
  //       );
  //       setIsSubPage(true);
  //       break;
  //     default:
  //       setHeading("Department");
  //       setIsSubPage(false);
  //   }
  // }, [location.pathname]);

  useEffect(() => {
    switch (location.pathname) {
      case "/Employees":
      case "/department":
      case "/profile":
      case "/Designation":
      case "/ProfileAssign":
        setHeading("Welcome back, Rahul Singh");
        setIsSubPage(false);
        break;
      default:
        setHeading("Back to Dashboard");
        setIsSubPage(true);
    }
  }, [location.pathname]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <Routes>
        <Route
          path="/register"
          element={<SignUp onRegister={handleRegister} />}
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        <Route path="" element={<ProtectedRoutes />}>
          <Route path="/" element={<Department heading={heading} isSubPage={isSubPage} />} />
          <Route path="/Employees" element={<Employees />} />
          <Route path="/department" element={<Department />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profileDescribe" element={<ProfileDescribe heading={heading} isSubPage={isSubPage} />} />
          <Route path="/Designation" element={<Designation />} />
          <Route path="/ProfileAssign" element={<ProfileAssign />} />
          <Route path="/SubDepartment" element={<SubDepartment />} />
          <Route path="/RDPosition" element={<RDposition />} />
          <Route path="/RDprofile" element={<RDprofile />} />
          <Route path="/RDemployee" element={<RDemployee />} />
          <Route path="/department/:id" element={<DepartmentDetail heading={heading} isSubPage={isSubPage} />} />
          <Route path="/department/:id/designations" element={<DesignationList heading={heading} isSubPage={isSubPage} />} />
          <Route path="/department/:id/profiles" element={<ProfileList heading={heading} isSubPage={isSubPage} />} />
          <Route path="/department/:id/employees" element={<EmployeeList heading={heading} isSubPage={isSubPage} />} />
          <Route path="/designation/:id" element={<DesignationDetail heading={heading} isSubPage={isSubPage} />} />
          <Route path="/designation/:id/profiles" element={<DProfileList heading={heading} isSubPage={isSubPage} />} />
          <Route path="/designation/:id/department" element={<DDepartmentList heading={heading} isSubPage={isSubPage} />} />
          <Route path="/demo" element={<Demo/>} />


          <Route
            path="/designationRDdepart"
            element={<DesignationRDdepart />}
          />
          <Route
            path="/designationPosition"
            element={<DesignationPosition />}
          />
          <Route path="/designationProfile" element={<DesignationProfile />} />
          <Route
            path="/designationEmployee"
            element={<DesignationEmployee />}
          />
        </Route>
      </Routes>

    </>
  );
}

export default App;
