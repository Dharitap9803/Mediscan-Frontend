// import React, { useState, useEffect, useContext } from "react";
// import { BarChart } from "@mui/x-charts";
// import { ArrowRight } from "lucide-react";
// import "../styles/stresslevel.css";
// import { MyContext } from "../App";

// const Button = ({ children, onClick, variant }) => {
//   const baseStyle = "tracker-button";
//   const defaultStyle = "tracker-button-default";
//   const outlineStyle = "tracker-button-outline";
//   const className = `${baseStyle} ${variant === "default" ? defaultStyle : outlineStyle}`;

//   return (
//     <button className={className} onClick={onClick}>
//       {children}
//     </button>
//   );
// };

// const Card = ({ children, className = "" }) => {
//   return <div className={`tracker-card ${className}`}>{children}</div>;
// };

// const CardContent = ({ children }) => {
//   return <div className="tracker-card-content">{children}</div>;
// };

// const StressLevel = () => {
//   const { currentdata, alldata } = useContext(MyContext);
//   const [view, setView] = useState("day");
//   const [dataConfig, setDataConfig] = useState({
//     day: { labels: [], data: [], yMax: 10 },
//     week: { labels: [], data: [], yMax: 10 },
//     month: { labels: [], data: [], yMax: 10 },
//   });
//   const [summaries, setSummaries] = useState({
//     day: { average: 0, max: 0, min: 0, count: 0 },
//     week: { average: 0, max: 0, min: 0, count: 0 },
//     month: { average: 0, max: 0, min: 0, count: 0 },
//   });

//   // Existing useEffect remains the same as in the previous implementation

//   // Get summary title based on current view
//   const getSummaryTitle = () => {
//     switch (view) {
//       case "day":
//         return "Last 30 Days Summary";
//       case "week":
//         return "Weekly Summary";
//       case "month":
//         return "Monthly Summary";
//       default:
//         return "Summary";
//     }
//   };

//   return (
//     <div className="tracker-container">
//       <h1 className="tracker-title">Stress Level Tracker</h1>

//       <div className="tracker-button-group">
//         <Button
//           variant={view === "day" ? "default" : "outline"}
//           onClick={() => setView("day")}
//         >
//           DAY
//         </Button>
//         <Button
//           variant={view === "week" ? "default" : "outline"}
//           onClick={() => setView("week")}
//         >
//           WEEK
//         </Button>
//         <Button
//           variant={view === "month" ? "default" : "outline"}
//           onClick={() => setView("month")}
//         >
//           MONTH
//         </Button>
//       </div>

//       <div className="tracker-chart-container flex justify-center items-center">
//         <BarChart
//           xAxis={[
//             {
//               scaleType: "band",
//               data: dataConfig[view].labels || [],
//               tickLabelStyle: {
//                 angle: view === "week" ? 45 : 0,
//                 textAnchor: view === "week" ? "start" : "middle",
//                 fontSize: view === "week" ? 10 : 12,
//               },
//             },
//           ]}
//           series={[{ data: dataConfig[view].data || [] }]}
//           width={500}
//           height={300}
//           margin={{
//             left: 40,
//             right: 10,
//             top: 10,
//             bottom: view === "week" ? 100 : 40,
//           }}
//         />
//       </div>

//       <Card>
//         <CardContent>
//           <h2 className="tracker-card-title">{getSummaryTitle()}</h2>
//           <p>
//             Average Stress Level: <strong>{summaries[view].average}</strong>
//           </p>
//           <p>
//             Max Stress Level: <strong>{summaries[view].max}</strong>
//           </p>
//           <p>
//             Min Stress Level: <strong>{summaries[view].min}</strong>
//           </p>
//           <p>
//             Total Entries: <strong>{summaries[view].count}</strong>
//           </p>
//         </CardContent>
//       </Card>

//       <Card className="tracker-info-card">
//         <CardContent>
//           <h2 className="tracker-card-title">About Stress Levels</h2>
//           <p>
//             Understanding and managing stress is crucial for mental and physical well-being.
//           </p>
//           <div className="flex items-center mt-2">
//             <ArrowRight size={24} />
//             <span>Learn more about stress management</span>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default StressLevel;

import React, { useState, useEffect, useContext } from "react";
import { BarChart } from "@mui/x-charts";
import { ArrowRight } from "lucide-react";
import "../styles/stresslevel.css";
import { MyContext } from "../App";

const Button = ({ children, onClick, variant }) => {
  const baseStyle = "stress-btn";
  const defaultStyle = "stress-btn-default";
  const outlineStyle = "stress-btn-outline";
  const className = `${baseStyle} ${variant === "default" ? defaultStyle : outlineStyle}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => {
  return <div className={`stress-card ${className}`}>{children}</div>;
};

const CardContent = ({ children }) => {
  return <div className="stress-card-content">{children}</div>;
};

const StressLevel = () => {
  const { currentdata, alldata } = useContext(MyContext);
  const [view, setView] = useState("day");
  const [dataConfig, setDataConfig] = useState({
    day: { labels: [], data: [], yMax: 10 },
    week: { labels: [], data: [], yMax: 10 },
    month: { labels: [], data: [], yMax: 10 },
  });
  const [summaries, setSummaries] = useState({
    day: { average: 0, max: 0, min: 0, count: 0 },
    week: { average: 0, max: 0, min: 0, count: 0 },
    month: { average: 0, max: 0, min: 0, count: 0 },
  });

  useEffect(() => {
    // Check if data exists
    if (!alldata || alldata.length === 0) return;
  
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
  
    const last90Days = alldata.filter((entry) => {
      // Make sure entry.date is properly formatted - your data uses createdAt instead
      const entryDate = new Date(entry.createdAt); // Use createdAt instead of date
      return (
        !isNaN(entryDate) && (today - entryDate) / (1000 * 60 * 60 * 24) <= 90
      );
    });
  
    // Daily data calculation - last 30 days
    const dayStressLevels = Array(30).fill(0);
    const dayLabels = [];
    const dayDates = [];
    const dayEntries = Array(30).fill(0);
  
    // Generate the last 30 days (including today) in reverse order
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dayDates.push(date);
      // Format date as "DD/MM"
      dayLabels.push(
        date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
        })
      );
    }
  
    // Weekly data calculation - last 7 days
    const weekStressLevels = Array(7).fill(0);
    const weekLabels = [];
    const weekDates = [];
    const weekEntries = Array(7).fill(0);
  
    // Generate the last 7 days (including today) in reverse order
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      weekDates.push(date);
      // Format date as "Feb 21" or similar
      weekLabels.push(
        date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      );
    }
  
    // Monthly data calculation - last 3 months
    const monthStressLevels = Array(3).fill(0);
    const monthLabels = [];
    const monthRanges = [];
    const monthEntries = Array(3).fill(0);
  
    // Generate the last 3 months
    for (let i = 2; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      monthRanges.push({
        year: date.getFullYear(),
        month: date.getMonth(),
      });
  
      // Format as "Jan 2025", "Feb 2025", etc.
      monthLabels.push(
        date.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      );
    }
  
    // Prepare to calculate summaries for each view
    let dayTotalStress = 0,
      dayMaxStress = 0,
      dayMinStress = Infinity,
      dayStressEntries = 0;
    let weekTotalStress = 0,
      weekMaxStress = 0,
      weekMinStress = Infinity,
      weekStressEntries = 0;
    let monthTotalStress = 0,
      monthMaxStress = 0,
      monthMinStress = Infinity,
      monthStressEntries = 0;
  
    // Calculate stress level data for all views
    last90Days.forEach((entry) => {
      const entryDate = new Date(entry.createdAt); // Use createdAt instead of date
      if (isNaN(entryDate)) return;
  
      const stressValue = Number(entry.stressLevel) || 0;
      if (stressValue <= 0) return; // Skip entries with no stress level recorded
  
      // For daily view - last 30 days
      const dayIndex = dayDates.findIndex(
        (date) =>
          date.getDate() === entryDate.getDate() &&
          date.getMonth() === entryDate.getMonth() &&
          date.getFullYear() === entryDate.getFullYear()
      );
  
      if (dayIndex !== -1) {
        dayStressLevels[dayIndex] += stressValue;
        dayEntries[dayIndex]++;
  
        // Update day summary data
        dayTotalStress += stressValue;
        dayMaxStress = Math.max(dayMaxStress, stressValue);
        dayMinStress = Math.min(dayMinStress, stressValue);
        dayStressEntries++;
      }
  
      // For weekly view - last 7 days
      const weekIndex = weekDates.findIndex(
        (date) =>
          date.getDate() === entryDate.getDate() &&
          date.getMonth() === entryDate.getMonth() &&
          date.getFullYear() === entryDate.getFullYear()
      );
  
      if (weekIndex !== -1) {
        weekStressLevels[weekIndex] += stressValue;
        weekEntries[weekIndex]++;
  
        // Update week summary data
        weekTotalStress += stressValue;
        weekMaxStress = Math.max(weekMaxStress, stressValue);
        weekMinStress = Math.min(weekMinStress, stressValue);
        weekStressEntries++;
      }
  
      // For monthly view - last 3 months
      for (let i = 0; i < monthRanges.length; i++) {
        const { year, month } = monthRanges[i];
        if (
          entryDate.getFullYear() === year &&
          entryDate.getMonth() === month
        ) {
          monthStressLevels[i] += stressValue;
          monthEntries[i]++;
  
          // Update month summary data
          monthTotalStress += stressValue;
          monthMaxStress = Math.max(monthMaxStress, stressValue);
          monthMinStress = Math.min(monthMinStress, stressValue);
          monthStressEntries++;
          break;
        }
      }
    });
  
    // Calculate averages for each data point where there are multiple entries
    const dayAverages = dayStressLevels.map((total, index) => 
      dayEntries[index] > 0 ? total / dayEntries[index] : 0
    );
    
    const weekAverages = weekStressLevels.map((total, index) => 
      weekEntries[index] > 0 ? total / weekEntries[index] : 0
    );
    
    const monthAverages = monthStressLevels.map((total, index) => 
      monthEntries[index] > 0 ? total / monthEntries[index] : 0
    );
  
    // Find the maximum values for y-axis scaling
    const maxDayStress = Math.max(...dayAverages, 5);
    const maxWeekStress = Math.max(...weekAverages, 5);
    const maxMonthStress = Math.max(...monthAverages, 5);
  
    // Round up to the nearest appropriate number for better visualization
    const yMaxDay = Math.ceil(maxDayStress);
    const yMaxWeek = Math.ceil(maxWeekStress);
    const yMaxMonth = Math.ceil(maxMonthStress);
  
    setDataConfig({
      day: {
        labels: dayLabels,
        data: dayAverages,
        yMax: yMaxDay,
      },
      week: {
        labels: weekLabels,
        data: weekAverages,
        yMax: yMaxWeek,
      },
      month: {
        labels: monthLabels,
        data: monthAverages,
        yMax: yMaxMonth,
      },
    });
  
    // Set view-specific summaries
    setSummaries({
      day: {
        average: dayStressEntries
          ? parseFloat((dayTotalStress / dayStressEntries).toFixed(1))
          : 0,
        max: dayMaxStress,
        min: dayMinStress === Infinity ? 0 : dayMinStress,
        count: dayStressEntries,
      },
      week: {
        average: weekStressEntries
          ? parseFloat((weekTotalStress / weekStressEntries).toFixed(1))
          : 0,
        max: weekMaxStress,
        min: weekMinStress === Infinity ? 0 : weekMinStress,
        count: weekStressEntries,
      },
      month: {
        average: monthStressEntries
          ? parseFloat((monthTotalStress / monthStressEntries).toFixed(1))
          : 0,
        max: monthMaxStress,
        min: monthMinStress === Infinity ? 0 : monthMinStress,
        count: monthStressEntries,
      },
    });
  }, [alldata]);

  
  // Get summary title based on current view
  const getSummaryTitle = () => {
    switch (view) {
      case "day":
        return "Last 30 Days Summary";
      case "week":
        return "Weekly Summary";
      case "month":
        return "Monthly Summary";
      default:
        return "Summary";
    }
  };

  return (
    <div className="stress-container">
      <h1 className="stress-title">Stress Level Tracker</h1>

      <div className="stress-btn-group">
        <Button
          variant={view === "day" ? "default" : "outline"}
          onClick={() => setView("day")}
        >
          DAY
        </Button>
        <Button
          variant={view === "week" ? "default" : "outline"}
          onClick={() => setView("week")}
        >
          WEEK
        </Button>
        <Button
          variant={view === "month" ? "default" : "outline"}
          onClick={() => setView("month")}
        >
          MONTH
        </Button>
      </div>

      <div className="stress-chart-container flex justify-center items-center">
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: dataConfig[view].labels || [],
              tickLabelStyle: {
                angle: view === "week" ? 45 : 0,
                textAnchor: view === "week" ? "start" : "middle",
                fontSize: view === "week" ? 10 : 12,
              },
            },
          ]}
          series={[{ data: dataConfig[view].data || [] }]}
          width={500}
          height={300}
          margin={{
            left: 40,
            right: 10,
            top: 10,
            bottom: view === "week" ? 100 : 40,
          }}
        />
      </div>

      <Card>
        <CardContent>
          <h2 className="stress-card-title">{getSummaryTitle()}</h2>
          <p>
            Average Stress Level: <strong>{summaries[view].average}</strong>
          </p>
          <p>
            Max Stress Level: <strong>{summaries[view].max}</strong>
          </p>
          <p>
            Min Stress Level: <strong>{summaries[view].min}</strong>
          </p>
          <p>
            Total Entries: <strong>{summaries[view].count}</strong>
          </p>
        </CardContent>
      </Card>

      <Card className="stress-info-card">
        <CardContent>
          <h2 className="stress-card-title">About Stress Levels</h2>
          <p>
            Understanding and managing stress is crucial for mental and physical well-being.
          </p>
          <div className="flex items-center mt-2">
            <ArrowRight size={24} />
            <span>Learn more about stress management</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StressLevel;


