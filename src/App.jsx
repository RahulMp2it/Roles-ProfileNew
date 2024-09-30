import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import DesignationEmployee from "./components/Pages/Designation/DesignationEmployee";
import DesignationPosition from "./components/Pages/Designation/DesignationPosition";
import DesignationProfile from "./components/Pages/Designation/DesignationProfile";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProfileDoc from "./components/Pages/Profile/ProfileDoc";

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

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      {/* {isLoggedIn && (
        <>
          <Sidebar />
          <Navbar />
        </>
      )} */}

      <Routes>
        <Route
          path="/register"
          element={<SignUp onRegister={handleRegister} />}
        />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        <Route path="" element={<ProtectedRoutes />}>
          <Route path="/" element={<Department />} />
          <Route path="/Employees" element={<Employees />} />
          <Route path="/department" element={<Department />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profileDoc" element={<ProfileDoc />} />
          <Route path="/Designation" element={<Designation />} />
          <Route path="/ProfileAssign" element={<ProfileAssign />} />
          <Route path="/SubDepartment" element={<SubDepartment />} />
          <Route path="/RDPosition" element={<RDposition />} />
          <Route path="/RDprofile" element={<RDprofile />} />
          <Route path="/RDemployee" element={<RDemployee />} />
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

      {/* <Routes>
        {!isRegistered && (
          <Route
            path="/register"
            element={<SignUp onRegister={handleRegister} />}
          />
        )}

        {!isLoggedIn && (
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        )}
        {isLoggedIn ? (
          <>
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
            <Route
              path="/designationRDdepart"
              element={<DesignationRDdepart />}
            />
            <Route
              path="/designationPosition"
              element={<DesignationPosition />}
            />
            <Route
              path="/designationProfile"
              element={<DesignationProfile />}
            />
            <Route
              path="/designationEmployee"
              element={<DesignationEmployee />}
            />
          </>
        ) : (
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        )}
      </Routes> */}
    </>
  );
}

export default App;
