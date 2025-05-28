import React, { useContext, useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts";
import { ArrowRight } from "lucide-react";
import "../styles/heartbeat.css";
import { MyContext } from "../App";

const Button = ({ children, onClick, variant }) => {
  const baseStyle = "heart-btn";
  const defaultStyle = "heart-btn-default";
  const outlineStyle = "heart-btn-outline";
  const className = `${baseStyle} ${variant === "default" ? defaultStyle : outlineStyle}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => {
  return <div className={`heart-card ${className}`}>{children}</div>;
};

const CardContent = ({ children }) => {
  return <div className="heart-card-content">{children}</div>;
};

const HeartbeatTracker = () => {
  const { currentdata, alldata } = useContext(MyContext);
  const [view, setView] = useState("day");
  const [dataConfig, setDataConfig] = useState({
    day: {
      labels: [],
      avgData: [],
      maxData: [],
      yMax: 180,
    },
    week: {
      labels: [],
      avgData: [],
      maxData: [],
      yMax: 180,
    },
    month: {
      labels: [],
      avgData: [],
      maxData: [],
      yMax: 180,
    },
  });

  const [summaries, setSummaries] = useState({
    day: { avgHeartRate: 0, maxHeartRate: 0, minHeartRate: 0, count: 0 },
    week: { avgHeartRate: 0, maxHeartRate: 0, minHeartRate: 0, count: 0 },
    month: { avgHeartRate: 0, maxHeartRate: 0, minHeartRate: 0, count: 0 },
  });

  useEffect(() => {
    if (!alldata || alldata.length === 0) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const last90Days = alldata.filter((entry) => {
      const entryDate = new Date(entry.createdAt);
      return (
        !isNaN(entryDate) && (today - entryDate) / (1000 * 60 * 60 * 24) <= 90
      );
    });

    
    const dayLabels = [];
    const dayAvgData = Array(30).fill(0);
    const dayMaxData = Array(30).fill(0);
    const dayDataCount = Array(30).fill(0);
    const dayDates = [];
    let dayTotalAvg = 0;
    let dayMaxHeart = 0;
    let dayMinHeart = Infinity;
    let dayEntryCount = 0;

   
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dayDates.push(date);

     
      dayLabels.push(
        date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
        })
      );
    }

    
    const weekLabels = [];
    const weekAvgData = Array(7).fill(0);
    const weekMaxData = Array(7).fill(0);
    const weekDataCount = Array(7).fill(0);
    const weekDates = [];
    let weekTotalAvg = 0;
    let weekMaxHeart = 0;
    let weekMinHeart = Infinity;
    let weekEntryCount = 0;

    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      weekDates.push(date);

     
      weekLabels.push(
        date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      );
    }

    
    const monthLabels = [];
    const monthAvgData = [0, 0, 0]; 
    const monthMaxData = [0, 0, 0];
    const monthDataCount = [0, 0, 0];
    const monthRanges = [];
    let monthTotalAvg = 0;
    let monthMaxHeart = 0;
    let monthMinHeart = Infinity;
    let monthEntryCount = 0;

    
    for (let i = 2; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      monthRanges.push({
        year: date.getFullYear(),
        month: date.getMonth(),
      });

      
      monthLabels.push(
        date.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      );
    }

   
    last90Days.forEach((entry) => {
      if (!entry.heartRate) return;

      const entryDate = new Date(entry.createdAt);
      if (isNaN(entryDate)) return;

      const avgHeartRate = entry.heartRate.avg || 0;
      const maxHeartRate = entry.heartRate.max || 0;
      const minHeartRate = entry.heartRate.min || 0;

      if (avgHeartRate <= 0 && maxHeartRate <= 0) return; 

    
      const dayIndex = dayDates.findIndex(
        (date) =>
          date.getDate() === entryDate.getDate() &&
          date.getMonth() === entryDate.getMonth() &&
          date.getFullYear() === entryDate.getFullYear()
      );

      if (dayIndex !== -1) {
        dayAvgData[dayIndex] += avgHeartRate;
        dayMaxData[dayIndex] = Math.max(dayMaxData[dayIndex], maxHeartRate);
        dayDataCount[dayIndex]++;

        
        dayTotalAvg += avgHeartRate;
        dayMaxHeart = Math.max(dayMaxHeart, maxHeartRate);
        if (minHeartRate > 0) {
          dayMinHeart = Math.min(dayMinHeart, minHeartRate);
        }
        dayEntryCount++;
      }

     
      const weekIndex = weekDates.findIndex(
        (date) =>
          date.getDate() === entryDate.getDate() &&
          date.getMonth() === entryDate.getMonth() &&
          date.getFullYear() === entryDate.getFullYear()
      );

      if (weekIndex !== -1) {
        weekAvgData[weekIndex] += avgHeartRate;
        weekMaxData[weekIndex] = Math.max(weekMaxData[weekIndex], maxHeartRate);
        weekDataCount[weekIndex]++;

        
        weekTotalAvg += avgHeartRate;
        weekMaxHeart = Math.max(weekMaxHeart, maxHeartRate);
        if (minHeartRate > 0) {
          weekMinHeart = Math.min(weekMinHeart, minHeartRate);
        }
        weekEntryCount++;
      }

     
      for (let i = 0; i < monthRanges.length; i++) {
        const { year, month } = monthRanges[i];
        if (
          entryDate.getFullYear() === year &&
          entryDate.getMonth() === month
        ) {
          monthAvgData[i] += avgHeartRate;
          monthMaxData[i] = Math.max(monthMaxData[i], maxHeartRate);
          monthDataCount[i]++;

          
          monthTotalAvg += avgHeartRate;
          monthMaxHeart = Math.max(monthMaxHeart, maxHeartRate);
          if (minHeartRate > 0) {
            monthMinHeart = Math.min(monthMinHeart, minHeartRate);
          }
          monthEntryCount++;
          break;
        }
      }
    });

   
    for (let i = 0; i < 30; i++) {
      if (dayDataCount[i] > 0)
        dayAvgData[i] = Math.round(dayAvgData[i] / dayDataCount[i]);
    }

   
    for (let i = 0; i < 7; i++) {
      if (weekDataCount[i] > 0)
        weekAvgData[i] = Math.round(weekAvgData[i] / weekDataCount[i]);
    }

   
    for (let i = 0; i < 3; i++) {
      if (monthDataCount[i] > 0)
        monthAvgData[i] = Math.round(monthAvgData[i] / monthDataCount[i]);
    }

    
    setDataConfig({
      day: {
        labels: dayLabels,
        avgData: dayAvgData,
        maxData: dayMaxData,
        yMax: Math.max(...dayMaxData, 180),
      },
      week: {
        labels: weekLabels,
        avgData: weekAvgData,
        maxData: weekMaxData,
        yMax: Math.max(...weekMaxData, 180),
      },
      month: {
        labels: monthLabels,
        avgData: monthAvgData,
        maxData: monthMaxData,
        yMax: Math.max(...monthMaxData, 180),
      },
    });

    
    setSummaries({
      day: {
        avgHeartRate:
          dayEntryCount > 0 ? Math.round(dayTotalAvg / dayEntryCount) : 0,
        maxHeartRate: dayMaxHeart,
        minHeartRate: dayMinHeart === Infinity ? 0 : dayMinHeart,
        count: dayEntryCount,
      },
      week: {
        avgHeartRate:
          weekEntryCount > 0 ? Math.round(weekTotalAvg / weekEntryCount) : 0,
        maxHeartRate: weekMaxHeart,
        minHeartRate: weekMinHeart === Infinity ? 0 : weekMinHeart,
        count: weekEntryCount,
      },
      month: {
        avgHeartRate:
          monthEntryCount > 0 ? Math.round(monthTotalAvg / monthEntryCount) : 0,
        maxHeartRate: monthMaxHeart,
        minHeartRate: monthMinHeart === Infinity ? 0 : monthMinHeart,
        count: monthEntryCount,
      },
    });
  }, [currentdata, alldata]);

 
  const getSummaryTitle = () => {
    switch (view) {
      case "day":
        return "Last 30 Days Summary";
      case "week":
        return "Weekly Summary";
      case "month":
        return "3-Month Summary";
      default:
        return "Summary";
    }
  };

  return (
    <div className="heart-container">
      <h1 className="heart-title">Heartbeat Tracker</h1>

      <div className="heart-btn-group">
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

      <div className="heart-chart-container flex justify-center items-center">
        <BarChart
          width={500}
          height={300}
          series={[
            {
              data: dataConfig[view]?.avgData || [],
              label: "Avg BPM",
              color: "#4682B4",
            },
            {
              data: dataConfig[view]?.maxData || [],
              label: "Max BPM",
              color: "#B22222",
            },
          ]}
          xAxis={[
            {
              scaleType: "band",
              data: dataConfig[view]?.labels || [],
              tickLabelStyle: {
                angle: view === "day" ? 45 : 0,
                textAnchor: view === "day" ? "start" : "middle",
                fontSize: view === "day" ? 10 : 12,
              },
            },
          ]}
          yAxis={[{ max: dataConfig[view]?.yMax || 180 }]}
          legend={{ position: "top" }}
          margin={{
            left: 40,
            right: 10,
            top: 30,
            bottom: view === "day" ? 100 : 40,
          }}
        />
      </div>

      <Card>
        <CardContent>
          <h2 className="heart-card-title">{getSummaryTitle()}</h2>
          <p>
            Average Heart Rate:{" "}
            <strong>{summaries[view].avgHeartRate} bpm</strong>
          </p>
          <p>
            Max Heart Rate: <strong>{summaries[view].maxHeartRate} bpm</strong>
          </p>
          <p>
            Min Heart Rate: <strong>{summaries[view].minHeartRate} bpm</strong>
          </p>
          <p>
            Measurements Recorded: <strong>{summaries[view].count}</strong>
          </p>
        </CardContent>
      </Card>

      <Card className="heart-info-card">
        <CardContent>
          <h2 className="heart-card-title">About Heart Rate</h2>
          <p>
            Your resting heart rate is an important indicator of your
            cardiovascular health. A normal resting heart rate for adults ranges
            from 60 to 100 beats per minute.
          </p>
          <p>
            During exercise, your maximum heart rate should typically not exceed
            220 minus your age.
          </p>
          <div className="flex items-center mt-2">
            <ArrowRight size={24} />
            <span>Track your heart rate daily for the best insights.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeartbeatTracker;