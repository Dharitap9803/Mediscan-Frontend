import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CaloryBurn from "./pages/Caloryburn.jsx";
import Steptracker from "./pages/Steptracker.jsx";
import HeartBeat from "./pages/Heartbeat.jsx";
import SleepHours from "./pages/sleephours.jsx";
import StressLevel from "./pages/Stresslevel.jsx";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/Signup.jsx";
import User from "./pages/user.jsx";
import Persnolinfo from "./pages/persnolinfo.jsx";
import Dataanalysis from "./pages/dataanalysis.jsx";
import Weight from "./pages/weight.jsx";
import Upload from "./pages/upload.jsx";
import { UserProvider, UserContext } from "./context/UserContext.jsx";
import Diabetes from "./pages/diabetes.jsx";
import MedicalReport from "./pages/MedicalReportAnalyzer.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Visualize from "./pages/Visualize.jsx";
import Bloodoxygen from "./pages/bloodoxygen.jsx";
import ReportAnalyzer from "./pages/ReportAnalyzer.jsx";
// import Home from "./pages/Home.jsx";



export const MyContext = createContext();

function ProtectedRoute({ element }) {
  const ProtectedRoute = ({ element }) => {
    const { user } = useContext(UserContext);
  
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  
    return element;
  };
  
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
  
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/health-data/${user._id}`
        );
  
        setalldata(res.data);
  
        const today = new Date().toISOString().split("T")[0];
  
        const todayData = res.data.find((entry) => {
          if (!entry.createdAt) return false;
          const entryDate = new Date(entry.createdAt)
            .toISOString()
            .split("T")[0];
          return entryDate === today;
        });
  
        setcurrentdata(todayData || null);
  
        // Removed redirection to /medical_report_analyzer
        // if (!todayData) {
        //   navigate("/medical_report_analyzer");
        // }
      } catch (err) {
        console.error("Error Fetching Data:", err);
      }
    }
  
    fetchData();
  }, [user]);

  useEffect(() => {
    const loginUser = localStorage.getItem("user");
    if (!user && !loginUser) {
      navigate("/medical_report_analyzer");
    }
  }, [user, navigate]);

  return user ? element : null;
}

function AuthRoute({ element }) {
  const { user } = useContext(UserContext);
  const loggedInUser = localStorage.getItem("user");

  if (user && loggedInUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
}

function AppContent() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(true);
  const [themeMode, setThemeMode] = useState(true);
  const {user } = useContext(UserContext);
  const [alldata, setalldata] = useState([]);
  const [currentdata, setcurrentdata] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (themeMode) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("themeMode", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("themeMode", "dark");
    }
  }, [themeMode]);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/health-data/${user._id}`
        );

        setalldata(res.data);

        const today = new Date().toISOString().split("T")[0];

        const todayData = res.data.find((entry) => {
          if (!entry.createdAt) return false;
          const entryDate = new Date(entry.createdAt)
            .toISOString()
            .split("T")[0];
          return entryDate === today;
        });

        setcurrentdata(todayData || null);

        if (!todayData) {
          navigate("/medical_report_analyzer");
        }
      } catch (err) {
        console.error("Error Fetching Data:", err);
      }
    }

    fetchData();
  }, [user, navigate]);

  const contextValues = {
    values: {
      isToggleSidebar,
      setIsToggleSidebar,
      themeMode,
      setThemeMode,
    },
    alldata,
    currentdata,
  };

  return (
    
    <MyContext.Provider value={contextValues}>
      {<Header />}
      <div className="main">
        <div className={`sidebarWrapper ${isToggleSidebar ? "toggle" : ""}`}>
          {user && <Sidebar />}
        </div>
        <div className={`content ${isToggleSidebar ? "toggle" : ""}`}>
          <Routes>
            <Route path="/" element={<MedicalReport />} />
            <Route path="/login" element={<AuthRoute element={<Login />} />} />
            <Route path="/signup" element={<AuthRoute element={<SignUp />} />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/persnolinfo" element={<ProtectedRoute element={<Persnolinfo />} />} />
            <Route path="/caloryburn" element={<ProtectedRoute element={<CaloryBurn />} />} />
            <Route path="/steptracker" element={<ProtectedRoute element={<Steptracker />} />} />
            <Route path="/user" element={<ProtectedRoute element={<User />} />} />
            <Route path="/dataanalysis" element={<ProtectedRoute element={<Dataanalysis />} />} />
            <Route path="/upload" element={<ProtectedRoute element={<Upload />} />} />
            <Route path="/heartbeat" element={<ProtectedRoute element={<HeartBeat />} />} />
            <Route path="/sleephours" element={<ProtectedRoute element={<SleepHours />} />} />
            <Route path="/stresslevel" element={<ProtectedRoute element={<StressLevel />} />} />
            <Route path="/weight" element={<ProtectedRoute element={<Weight />} />} />
            <Route path="/diabetes" element={<ProtectedRoute element={<Diabetes />} />} />
            {/* <Route path="/bloodpressure" element={<ProtectedRoute element={<Bloodpressure />} />} /> */}
            <Route path="/medical_report_analyzer" element={ <ProtectedRoute element={<MedicalReport />} />} />
            <Route path="/contact" element={<ProtectedRoute element={<ContactUs />} />} />        
            <Route path="/bbp" element={<ProtectedRoute element={<bbp />} />} />
            <Route path='/Visualize' element={<Visualize/>}/>
            <Route path="/bloodoxygen" element={<ProtectedRoute element={<Bloodoxygen />} />} />
            <Route path="/ReportAnalyzer" element={<ProtectedRoute element={<ReportAnalyzer />} />} />
            {/* <Route path="/Home" element={<ProtectedRoute element={<Home />} />} />   */}

          </Routes>
        </div>
      </div>
    </MyContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </Router>
  );
}

export default App;
