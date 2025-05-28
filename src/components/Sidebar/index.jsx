// import { Link, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import Button from "@mui/material/Button";
// import { RiDashboardFill } from "react-icons/ri";
// import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
// import { FaUnlockAlt } from "react-icons/fa";
// import { HiUsers } from "react-icons/hi2";
// import { IoFootstepsSharp } from "react-icons/io5";
// import { FaHeartbeat } from "react-icons/fa";
// import { FaBedPulse } from "react-icons/fa6";



// import { FaBrain } from "react-icons/fa6";
// import { BsFire } from "react-icons/bs";
// import { FaFileInvoice } from "react-icons/fa";
// import { SiGooglemessages } from "react-icons/si";
// import { IoSettingsSharp } from "react-icons/io5";
// import { MdLogout } from "react-icons/md";
// import { MyContext } from "../../App";
// import { IoMdAnalytics } from "react-icons/io";
// import { IoCloudUploadSharp } from "react-icons/io5";

// const Sidebar = () => {
//   const [dashboardOpen, setDashboardOpen] = useState(false);
//   const context = useContext(MyContext);
//   const navigate = useNavigate();

//   const toggleDashboard = () => {
//     setDashboardOpen(!dashboardOpen);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//     window.location.reload();
//   };

//   return (
//     <>
//       <div className="sidebar">
//         <ul>
//           <li>
//             <Button
//               className="w-100"
//               sx={{
//                 justifyContent: "flex-start",
//                 textTransform: "none",
//                 fontSize: "16px",
//                 fontWeight: "500",
//               }}
//               onClick={toggleDashboard}
//             >
//               <span className="icon">
//                 <RiDashboardFill />
//               </span>
//               Health 
//               <span className="arrow">
//                 {dashboardOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
//               </span>
//             </Button>
//           </li>

//           {/* Dashboard Child Links */}
//           {dashboardOpen && (
//             <div className="dashboard-sub-menu">

// <li>
//                 <Link to="/Dashboard">
//                   <Button
//                     className="w-100 sub-menu-btn"
//                     sx={{
//                       justifyContent: "flex-start",
//                       textTransform: "none",
//                       fontSize: "14px",
//                       fontWeight: "400",
//                       paddingLeft: "40px",
//                     }}
//                   >
//                     <span className="icon">
//                       <IoFootstepsSharp />
//                     </span>
//                     Dashboard
//                   </Button>
//                 </Link>
//               </li>

//               <li>
//                 <Link to="/Steptracker">
//                   <Button
//                     className="w-100 sub-menu-btn"
//                     sx={{
//                       justifyContent: "flex-start",
//                       textTransform: "none",
//                       fontSize: "14px",
//                       fontWeight: "400",
//                       paddingLeft: "40px",
//                     }}
//                   >
//                     <span className="icon">
//                       <IoFootstepsSharp />
//                     </span>
//                     Step Tracker
//                   </Button>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/Heartbeat">
//                   <Button
//                     className="w-100 sub-menu-btn"
//                     sx={{
//                       justifyContent: "flex-start",
//                       textTransform: "none",
//                       fontSize: "14px",
//                       fontWeight: "400",
//                       paddingLeft: "40px",
//                     }}
//                   >
//                     <span className="icon">
//                       <FaHeartbeat />
//                     </span>
//                     Heartbeat Rate
//                   </Button>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/sleephours">
//                   <Button
//                     className="w-100 sub-menu-btn"
//                     sx={{
//                       justifyContent: "flex-start",
//                       textTransform: "none",
//                       fontSize: "14px",
//                       fontWeight: "400",
//                       paddingLeft: "40px",
//                     }}
//                   >
//                     <span className="icon">
//                       <FaBedPulse />
//                     </span>
//                     Sleep Hours
//                   </Button>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/Stresslevel">
//                   <Button
//                     className="w-100 sub-menu-btn"
//                     sx={{
//                       justifyContent: "flex-start",
//                       textTransform: "none",
//                       fontSize: "14px",
//                       fontWeight: "400",
//                       paddingLeft: "40px",
//                     }}
//                   >
//                     <span className="icon">
//                       <FaBrain />
//                     </span>
//                     Stress Level
//                   </Button>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/Caloryburn">
//                   <Button
//                     className="w-100 sub-menu-btn"
//                     sx={{
//                       justifyContent: "flex-start",
//                       textTransform: "none",
//                       fontSize: "14px",
//                       fontWeight: "400",
//                       paddingLeft: "40px",
//                     }}
//                   >
//                     <span className="icon">
//                       <BsFire />
//                     </span>
//                     Calory Burn
//                   </Button>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dataanalysis">
//                   <Button
//                     className="w-100 sub-menu-btn"
//                     sx={{
//                       justifyContent: "flex-start",
//                       textTransform: "none",
//                       fontSize: "14px",
//                       fontWeight: "400",
//                       paddingLeft: "40px",
//                     }}
//                   >
//                     <span className="icon">
//                       <IoMdAnalytics />
//                     </span>
//                     Data Analysis
//                   </Button>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/upload">
//                   <Button
//                     className="w-100 sub-menu-btn"
//                     sx={{
//                       justifyContent: "flex-start",
//                       textTransform: "none",
//                       fontSize: "14px",
//                       fontWeight: "400",
//                       paddingLeft: "40px",
//                     }}
//                   >
//                     <span className="icon">
//                       <IoCloudUploadSharp />
//                     </span>
//                     Upload
//                   </Button>
//                 </Link>
//               </li>
//             </div>
//           )}

//           <li>
//             <Link to="/medical_report_analyzer">
//               <Button
//                 className="w-100"
//                 sx={{
//                   justifyContent: "flex-start",
//                   textTransform: "none",
//                   fontSize: "16px",
//                   fontWeight: "500",
//                 }}
//               >
//                 <span className="icon">
//                   <FaUnlockAlt />
//                 </span>
//                 Medical Report Analyzer
//                 <span className="arrow">
//                   <IoIosArrowForward />
//                 </span>
//               </Button>
//             </Link>
//           </li>
//           <li>
//             <Link to="/user">
//               <Button
//                 className="w-100"
//                 sx={{
//                   justifyContent: "flex-start",
//                   textTransform: "none",
//                   fontSize: "16px",
//                   fontWeight: "500",
//                 }}
//               >
//                 <span className="icon">
//                   <HiUsers />
//                 </span>
//                 Profile
//                 <span className="arrow">
//                   <IoIosArrowForward />
//                 </span>
//               </Button>
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact">
//               <Button
//                 className="w-100"
//                 sx={{
//                   justifyContent: "flex-start",
//                   textTransform: "none",
//                   fontSize: "16px",
//                   fontWeight: "500",
//                 }}
//               >
//                 <span className="icon">
//                   <IoSettingsSharp />
//                 </span>
//                 Contact Us
//                 <span className="arrow">
//                   <IoIosArrowForward />
//                 </span>
//               </Button>
//             </Link>
//           </li>
//         </ul>
//         <br />
//         <div className="logoutWrapper">
//           <div className="logoutBox">
//             <Button variant="contained" onClick={handleLogout}>
//               <MdLogout />
//               Logout
//             </Button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { RiDashboardFill } from "react-icons/ri";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FaUnlockAlt, FaHeartbeat, FaFileInvoice } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { IoFootstepsSharp, IoSettingsSharp, IoCloudUploadSharp } from "react-icons/io5";
import { FaBedPulse, FaBrain } from "react-icons/fa6";
import { BsFire } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { MyContext } from "../../App";

const Sidebar = () => {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [analyzerOpen, setAnalyzerOpen] = useState(false);
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const toggleDashboard = () => {
    setDashboardOpen(!dashboardOpen);
  };

  const toggleAnalyzer = () => {
    setAnalyzerOpen(!analyzerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  const btnSubStyle = {
    justifyContent: "flex-start",
    textTransform: "none",
    fontSize: "14px",
    fontWeight: "400",
    paddingLeft: "40px",
  };

  return (
    <>
      <div className="sidebar">
        <ul>

        <li>
            <Button
              className="w-100"
              onClick={toggleAnalyzer}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              <span className="icon">
                <FaUnlockAlt />
              </span>
              Medical Report Analyzer
              <span className="arrow">
                {analyzerOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </span>
            </Button>
          </li>

          {analyzerOpen && (
            <div className="dashboard-sub-menu">
              <li>
                <Link to="/medical_report_analyzer/#home">
                  <Button className="w-100 sub-menu-btn" sx={btnSubStyle}>
                    <span className="icon"><RiDashboardFill /></span>
                    Home
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="./#how-it-works">
                  <Button className="w-100 sub-menu-btn" sx={btnSubStyle}>
                    <span className="icon"><IoMdAnalytics /></span>
                    How it Works
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/medical_report_analyzer#critical-info">
                  <Button className="w-100 sub-menu-btn" sx={btnSubStyle}>
                    <span className="icon"><FaBrain /></span>
                    Critical Information
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/medical_report_analyzer#health-goal">
                  <Button className="w-100 sub-menu-btn" sx={btnSubStyle}>
                    <span className="icon"><FaBedPulse /></span>
                    Health Goal
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/ReportAnalyzer">
                  <Button className="w-100 sub-menu-btn" sx={btnSubStyle}>
                    <span className="icon"><IoCloudUploadSharp /></span>
                    Upload
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="../../../pages/medical_report_analyzer/ReportAnalyzer">
                  <Button className="w-100 sub-menu-btn" sx={btnSubStyle}>
                    <span className="icon"><IoMdAnalytics /></span>
                    Analysis
                  </Button>
                </Link>
              </li>
            </div>
          )}
          <li>
            <Button
              className="w-100"
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "500",
              }}
              onClick={toggleDashboard}
            >
              <span className="icon">
                <RiDashboardFill />
              </span>
              Health Tracker
              <span className="arrow">
                {dashboardOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
              </span>
            </Button>
          </li>

          {dashboardOpen && (
            <div className="dashboard-sub-menu">
              <li>
                <Link to="/Dashboard">
                  <Button className="w-100 sub-menu-btn" sx={btnSubStyle}>
                    <span className="icon">
                      <IoFootstepsSharp />
                    </span>
                    Dashboard
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/Steptracker">
                  <Button className="w-100 sub-menu-btn" sx={btnSubStyle}>
                    <span className="icon">
                      <IoFootstepsSharp />
                    </span>
                    Step Tracker
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/Heartbeat">
                  <Button className="w-100 sub-menu-btn" sx={btnSubStyle}>
                    <span className="icon">
                      <FaHeartbeat />
                    </span>
                    Heartbeat Rate
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/sleephours">
                  <Button className="w-100 sub-menu-btn" sx={btnSubStyle}>
                    <span className="icon">
                      <FaBedPulse />
                    </span>
                    Sleep Hours
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/Stresslevel">
                  <Button className="w-100 sub-menu-btn" sx={btnSubStyle}>
                    <span className="icon">
                      <FaBrain />
                    </span>
                    Stress Level
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/Caloryburn">
                  <Button className="w-100 sub-menu-btn" sx={btnSubStyle}>
                    <span className="icon">
                      <BsFire />
                    </span>
                    Calory Burn
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/dataanalysis">
                  <Button className="w-100 sub-menu-btn" sx={btnSubStyle}>
                    <span className="icon">
                      <IoMdAnalytics />
                    </span>
                    Data Analysis
                  </Button>
                </Link>
              </li>
              <li>
                <Link to="/upload">
                  <Button className="w-100 sub-menu-btn" sx={btnSubStyle}>
                    <span className="icon">
                      <IoCloudUploadSharp />
                    </span>
                    Upload
                  </Button>
                </Link>
              </li>
            </div>
          )}

          
          <li>
            <Link to="/user">
              <Button
                className="w-100"
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                <span className="icon">
                  <HiUsers />
                </span>
                Profile
                <span className="arrow">
                  <IoIosArrowForward />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <Button
                className="w-100"
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                <span className="icon">
                  <IoSettingsSharp />
                </span>
                Contact Us
                <span className="arrow">
                  <IoIosArrowForward />
                </span>
              </Button>
            </Link>
          </li>
        </ul>
        <br />
        <div className="logoutWrapper">
          <div className="logoutBox">
            <Button variant="contained" onClick={handleLogout}>
              <MdLogout />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
