import "../../styles/dashboard.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { MyContext } from "../../App";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoFootstepsSharp } from "react-icons/io5";
import { FaFireAlt } from "react-icons/fa";
import { MdWatchLater } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { GiWeightScale } from "react-icons/gi";
import { MdBloodtype } from "react-icons/md";
import { GrGraphQl } from "react-icons/gr";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { IoIosArrowForward } from "react-icons/io";

const DashboardPlaceholder = () => {
  const { currentdata } = useContext(MyContext);

  if (!currentdata) {
    return <p>No data available. Please upload your data to view insights.</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Render data here */}
    </div>
  );
};

const weightData = [
  { date: "Mon", weight: 63, height: 170 },
  { date: "Tue", weight: 63, height: 170 },
  { date: "Wed", weight: 63, height: 170 },
  { date: "Thu", weight: 63, height: 170 },
  { date: "Fri", weight: 63, height: 170 },
  { date: "Sat", weight: 63, height: 170 },
  { date: "Sun", weight: 63, height: 170 },
];

const Dashboard = () => {
  const { currentdata, alldata } = useContext(MyContext);
  const [editGoal, setEditGoal] = useState(false);
  const [stepGoal, setStepGoal] = useState(8000);
  const [caloryGoal, setCaloryGoal] = useState(1000);
  const [workoutGoal, setWorkoutGoal] = useState(30);
  const [bloodOxygenData, setBloodOxygenData] = useState([]);
  const [bloodPressureData, setBloodPressureData] = useState([]);
  const [bloodSugarData, setBloodSugarData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const steps = currentdata?.steps;
  const calories = currentdata?.caloriesBurned;
  const workoutDuration = 10;


  const toggleSidebar = () => {
    // Your existing toggle code...
    const sidebarElement = document.querySelector('.sidebar');
    sidebarElement.classList.toggle('open');
    
    // Determine if sidebar is open after toggling
    const isOpen = sidebarElement.classList.contains('open');
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('sidebarStateChange', { 
      detail: { isOpen: isOpen } 
    }));
  };

  useEffect(() => {
    // Function to handle sidebar state changes
    const handleSidebarChange = (event) => {
      if (event.detail && event.detail.hasOwnProperty('isOpen')) {
        setSidebarOpen(event.detail.isOpen);
      }
    };
    
    // Listen for custom sidebar event
    window.addEventListener('sidebarStateChange', handleSidebarChange);
    
    // Check if sidebar is initially open (you might need to adjust this logic)
    const initialSidebarState = document.querySelector('.sidebar')?.classList.contains('open');
    setSidebarOpen(!!initialSidebarState);
    
    return () => {
      window.removeEventListener('sidebarStateChange', handleSidebarChange);
    };
  }, []);

  // Process blood oxygen data similar to the BloodOxygen component
  useEffect(() => {
    if (!alldata || alldata.length === 0) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    // Weekly data calculation - last 7 days
    const weekLabels = [];
    const weekDates = [];
    const weekValues = Array(7).fill(0);

    // Generate the last 7 days (including today) in reverse order
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      weekDates.push(date);
      weekLabels.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
    }

    // Filter data for the last 90 days
    const last90Days = alldata.filter((entry) => {
      const entryDate = new Date(entry.createdAt);
      return !isNaN(entryDate) && (today - entryDate) / (1000 * 60 * 60 * 24) <= 90;
    });

    // Process blood oxygen data
    last90Days.forEach((entry) => {
      if (!entry.createdAt || !entry.bloodOxygenLevel) {
        return;
      }

      const entryDate = new Date(entry.createdAt);
      if (isNaN(entryDate)) {
        return;
      }

      const oxyValue = Number(entry.bloodOxygenLevel) || 0;
      if (oxyValue <= 0) {
        return;
      }

      // For weekly view - last 7 days
      const weekIndex = weekDates.findIndex(
        (date) =>
          date.getDate() === entryDate.getDate() &&
          date.getMonth() === entryDate.getMonth() &&
          date.getFullYear() === entryDate.getFullYear()
      );

      if (weekIndex !== -1) {
        weekValues[weekIndex] = oxyValue;
      }
    });

    // Create chart data in format needed for the LineChart component
    const formattedData = weekLabels.map((label, index) => ({
      date: label,
      level: weekValues[index]
    }));

    setBloodOxygenData(formattedData);
  }, [alldata]);

  // Process blood pressure data
  useEffect(() => {
    if (!alldata || alldata.length === 0) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    // Weekly data calculation - last 8 days
    const weekLabels = [];
    const weekDates = [];
    const systolicValues = Array(8).fill(null);
    const diastolicValues = Array(8).fill(null);

    // Generate the last 8 days (including today) in reverse order
    for (let i = 7; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      weekDates.push(date);
      weekLabels.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
    }

    // Filter data for the last 90 days
    const last90Days = alldata.filter((entry) => {
      const entryDate = new Date(entry.createdAt);
      return !isNaN(entryDate) && (today - entryDate) / (1000 * 60 * 60 * 24) <= 90;
    });

    // Process blood pressure data
    last90Days.forEach((entry) => {
      if (!entry.createdAt || !entry.bloodPressure) {
        return;
      }

      const entryDate = new Date(entry.createdAt);
      if (isNaN(entryDate)) {
        return;
      }

      const systolic = entry.bloodPressure.systolic;
      const diastolic = entry.bloodPressure.diastolic;

      // For weekly view - last 8 days
      const weekIndex = weekDates.findIndex(
        (date) =>
          date.getDate() === entryDate.getDate() &&
          date.getMonth() === entryDate.getMonth() &&
          date.getFullYear() === entryDate.getFullYear()
      );

      if (weekIndex !== -1) {
        systolicValues[weekIndex] = systolic;
        diastolicValues[weekIndex] = diastolic;
      }
    });

    // Create chart data in format needed for the LineChart component
    const formattedData = weekLabels.map((label, index) => ({
      date: label,
      systolic: systolicValues[index],
      diastolic: diastolicValues[index]
    }));

    setBloodPressureData(formattedData);
  }, [alldata]);

  // Process blood sugar data
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    // Weekly data calculation - last 8 days
    const weekLabels = [];
    const weekDates = [];
    const bloodSugarValues = Array(8).fill(null);

    // Generate the last 8 days (including today) in reverse order
    for (let i = 7; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      weekDates.push(date);
      weekLabels.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
    }

    // Filter data for the last 90 days
    const last90Days = alldata.filter((entry) => {
      const entryDate = new Date(entry.createdAt);
      return !isNaN(entryDate) && (today - entryDate) / (1000 * 60 * 60 * 24) <= 90;
    });

    // Process blood sugar data
    last90Days.forEach((entry) => {
      if (!entry.createdAt || entry.bloodSugarLevel === undefined) {
        return;
      }

      const entryDate = new Date(entry.createdAt);
      if (isNaN(entryDate)) {
        return;
      }

      const bloodSugarLevel = entry.bloodSugarLevel;

      // For weekly view - last 8 days
      const weekIndex = weekDates.findIndex(
        (date) =>
          date.getDate() === entryDate.getDate() &&
          date.getMonth() === entryDate.getMonth() &&
          date.getFullYear() === entryDate.getFullYear()
      );

      if (weekIndex !== -1) {
        bloodSugarValues[weekIndex] = bloodSugarLevel;
      }
    });

    // Create chart data in format needed for the BarChart component
    const formattedData = weekLabels.map((label, index) => ({
      week: label,
      level: bloodSugarValues[index]
    }));

    setBloodSugarData(formattedData);
  }, [alldata]);

  return (
    <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <h1 className="dashboard-title">Dashboard</h1>
      <button onClick={() => setEditGoal(!editGoal)} className="goal-button">
        SET YOUR GOAL
      </button>
      {editGoal && (
        <div className="absolute w-1/2">
          <p>Steps:</p>
          <input
            className="goal-input"
            placeholder="Set your step goals"
            value={stepGoal}
            onChange={(e) => setStepGoal(e.target.value)}
          />
          <p>Calories:</p>
          <input
            className="goal-input"
            placeholder="Set your calorie goal"
            value={caloryGoal}
            onChange={(e) => setCaloryGoal(e.target.value)}
          />
          <p>Workout Duration:</p>
          <input
            className="goal-input"
            placeholder="Set your workout goal"
            value={workoutGoal}
            onChange={(e) => setWorkoutGoal(e.target.value)}
          />
        </div>
      )}

      <div className="progress-section">
        <div className="progress-container">
          <div className="progress-circle">
            <div className="outer-circle">
              <CircularProgressbar
                value={(calories / caloryGoal) * 100}
                styles={buildStyles({
                  strokeLinecap: "round",
                  pathColor: "#FFA500",
                  trailColor: "#EEE",
                  strokeWidth: 8,
                })}
              />
            </div>
            <div className="middle-circle">
              <CircularProgressbar
                value={(steps / stepGoal) * 100}
                styles={buildStyles({
                  strokeLinecap: "round",
                  pathColor: "#FF7B00FF",
                  trailColor: "transparent",
                  strokeWidth: 5,
                })}
              />
            </div>
            <div className="inner-circle">
              <CircularProgressbar
                value={(workoutDuration / workoutGoal) * 100}
                styles={buildStyles({
                  strokeLinecap: "round",
                  pathColor: " #FF0000",
                  trailColor: "transparent",
                  strokeWidth: 4,
                })}
              />
            </div>

            <div className="progress-info">
              <span className="progress-label">Steps</span>
              <span className="progress-value">{steps}</span>
              <span className="progress-goal">/{stepGoal} steps</span>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-box">
          <div className="stat-content">
            <div className="stat-icon-container">
              <span>
                <IoFootstepsSharp />
              </span>
            </div>
            <div className="stat-text">
              <p className="stat-label">Steps</p>
              <p className="stat-value">{steps}</p>
              <p className="stat-goal">/{stepGoal} steps</p>
            </div>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-content">
            <div className="stat-icon-container1">
              <span>
                <FaFireAlt />
              </span>
            </div>
            <div className="stat-text">
              <p className="stat-label">Calories</p>
              <p className="stat-value">{calories}</p>
              <p className="stat-goal">/{caloryGoal} kcal</p>
            </div>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-content">
            <div className="stat-icon-container2">
              <span>
                <MdWatchLater />
              </span>
            </div>
            <div className="stat-text">
              <p className="stat-label">Workout Duration</p>
              <p className="stat-value">{workoutDuration}</p>
              <p className="stat-goal">/{workoutGoal} min</p>
            </div>
          </div>
        </div>
      </div>

      <div className="announcement-box">
        <p className="announcement-title">
          Create your first workout plan!!<br></br>
          <Link to="/persnolinfo">Create</Link>
        </p>
        <button className="announcement-button">
          {" "}
          <Link to="/persnolinfo">→</Link>
        </button>
      </div>

      <div className="data-cards">
        <div className="blood-pressure-card">
          <div className="bp-header">
            <div className="bp-icon">
              <FaUserDoctor />
            </div>
            <Link
              to="/dataanalysis"
              state={{ selectedTab: 'bp' }}
            >
              <h2>Blood Pressure</h2>
            </Link>
          </div>
          <p>Add blood pressure data</p>
          <div
            className="blood-pressure-graph"
            style={{ width: "100%", height: "250px" }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={bloodPressureData}
                margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
              >
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#ffffff", fontSize: 12 }}
                  axisLine={{ stroke: "#e0e0e0" }}
                  tickLine={{ stroke: "#e0e0e0" }}
                />
                <YAxis
                  domain={[60, 160]}
                  tick={{ fill: "#ffffff", fontSize: 10 }}
                  axisLine={{ stroke: "#e0e0e0" }}
                  tickLine={{ stroke: "#e0e0e0" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: "5px",
                    border: "none",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.15)"
                  }}
                  labelStyle={{ color: "#495057", fontWeight: "bold" }}
                  itemStyle={{ color: "#4682B4" }}
                />
                <Line
                  type="monotone"
                  dataKey="systolic"
                  stroke="#FF6347" // Tomato color for systolic
                  strokeWidth={3}
                  dot={{ fill: "#ffffff", stroke: "#FF6347", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#FF6347", stroke: "#ffffff", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  stroke="#FF4500" // OrangeRed color for diastolic
                  strokeWidth={3}
                  dot={{ fill: "#ffffff", stroke: "#FF4500", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#FF4500", stroke: "#ffffff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="heart-rate-card">
          <div className="heart-header">
            <div className="heart-icon">
              <MdBloodtype />
            </div>
            <Link
              to="/dataanalysis"
              state={{ selectedTab: 'diabetes' }}
            >
              <h2>Diabetes</h2>
            </Link>
          </div>
          <p>Check your Diabetes level</p>
          <div className="diabetes-chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={bloodSugarData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="week" />
                <YAxis domain={[60, 200]} />
                <Tooltip />
                <Bar dataKey="level" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="blood-oxygen-card">
          <div className="blood-oxygen-header">
            <div className="blood-oxygen-icon">
              <FaUserDoctor />
            </div>
            <Link to="/bloodoxygen">
              <h2>Blood Oxygen</h2>
            </Link>
          </div>
          <p>Weekly Blood Oxygen Levels</p>

          {/* Blood Oxygen Chart - Similar to weight chart but using blood oxygen data */}
          <div
            className="blood-oxygen-graph"
            style={{ width: "100%", height: "250px" }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={bloodOxygenData}
                margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
              >
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#ffffff", fontSize: 12 }}
                  axisLine={{ stroke: "#e0e0e0" }}
                  tickLine={{ stroke: "#e0e0e0" }}
                />
                <YAxis
                  domain={[80, 100]}
                  tick={{ fill: "#ffffff", fontSize: 10 }}
                  axisLine={{ stroke: "#e0e0e0" }}
                  tickLine={{ stroke: "#e0e0e0" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: "5px",
                    border: "none",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.15)"
                  }}
                  labelStyle={{ color: "#495057", fontWeight: "bold" }}
                  itemStyle={{ color: "#4682B4" }}
                />
                <Line
                  type="monotone"
                  dataKey="level"
                  stroke="#4682B4" // Steel blue color for blood oxygen
                  strokeWidth={3}
                  dot={{ fill: "#ffffff", stroke: "#4682B4", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#4682B4", stroke: "#ffffff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="weight-card">
          <div className="weight-header">
            <div className="weight-icon">
              <GiWeightScale />
            </div>
            <Link to="/weight">
              <h2>Weight and Height</h2>
            </Link>
          </div>
          <p>Track your weight and height</p>
          <div
            className="weight-graph"
            style={{ width: "100%", height: "250px" }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={weightData}
                margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
              >
                <YAxis
                  domain={[0, 150]}
                  tick={false}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: "5px",
                    border: "none",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.15)"
                  }}
                  labelStyle={{ color: "#495057", fontWeight: "bold" }}
                  itemStyle={{ color: "#20c997" }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#20c997"
                  strokeWidth={3}
                  dot={{ fill: "#ffffff", stroke: "#20c997", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#20c997", stroke: "#ffffff", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="height"
                  stroke="#ff6347"
                  strokeWidth={3}
                  dot={{ fill: "#ffffff", stroke: "#ff6347", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#ff6347", stroke: "#ffffff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="data-analysis">
        <div className="data-card">
          <div className="data-header">
            <div className="data-icon"></div>
            <Link to="/dataanalysis">
              <h2>Data Analysis</h2>
            </Link>
          </div>
          <p>
            Uncover hidden patterns, trends, and opportunities with smart data
            analytics
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;