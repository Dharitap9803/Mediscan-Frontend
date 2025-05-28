import "../styles/sleephours.css";
import React, { useContext, useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts";
import { ArrowRight } from "lucide-react";
import { MyContext } from "../App";

const Button = ({ children, onClick, variant }) => {
  const baseStyle = "tracker-button";
  const defaultStyle = "tracker-button-default";
  const outlineStyle = "tracker-button-outline";
  const className = `${baseStyle} ${variant === "default" ? defaultStyle : outlineStyle}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => {
  return <div className={`tracker-card ${className}`}>{children}</div>;
};

const CardContent = ({ children }) => {
  return <div className="tracker-card-content">{children}</div>;
};

const SleepHours = () => {
  const { currentdata, alldata } = useContext(MyContext);
  const [view, setView] = useState("day");
  const [dataConfig, setDataConfig] = useState({
    day: { labels: [], data: [], yMax: 10 },
    week: { labels: [], data: [], yMax: 10 },
    month: { labels: [], data: [], yMax: 10 },
  });
  const [summaries, setSummaries] = useState({
    day: { total: 0, average: 0, max: 0, min: 0, count: 0 },
    week: { total: 0, average: 0, max: 0, min: 0, count: 0 },
    month: { total: 0, average: 0, max: 0, min: 0, count: 0 },
  });

  useEffect(() => {
    if (!currentdata || !alldata || alldata.length === 0) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    const last90Days = alldata.filter((entry) => {
      const entryDate = new Date(entry.createdAt);
      return (
        !isNaN(entryDate) && (today - entryDate) / (1000 * 60 * 60 * 24) <= 90
      );
    });

    
    const dayHours = Array(30).fill(0);
    const dayLabels = [];
    const dayDates = [];

    
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

   
    const weekHours = Array(7).fill(0);
    const weekLabels = [];
    const weekDates = [];

   
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      weekDates.push(date);
      
      weekLabels.push(
        date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      );
    }

    
    const monthHours = Array(3).fill(0);
    const monthLabels = [];
    const monthRanges = [];

   
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

    
    let dayTotalHours = 0,
      dayMaxHours = 0,
      dayMinHours = Infinity,
      dayHoursEntries = 0;
    let weekTotalHours = 0,
      weekMaxHours = 0,
      weekMinHours = Infinity,
      weekHoursEntries = 0;
    let monthTotalHours = 0,
      monthMaxHours = 0,
      monthMinHours = Infinity,
      monthHoursEntries = 0;

 
    last90Days.forEach((entry) => {
      const entryDate = new Date(entry.createdAt);
      if (isNaN(entryDate)) return;

      const sleepValue = Number(entry.sleepHours) || 0;
      if (sleepValue <= 0) return; 

      
      const dayIndex = dayDates.findIndex(
        (date) =>
          date.getDate() === entryDate.getDate() &&
          date.getMonth() === entryDate.getMonth() &&
          date.getFullYear() === entryDate.getFullYear()
      );

      if (dayIndex !== -1) {
        dayHours[dayIndex] += sleepValue;

       
        if (dayHours[dayIndex] === sleepValue) {
          dayHoursEntries++;
        }

        
        dayTotalHours += sleepValue;
        dayMaxHours = Math.max(dayMaxHours, sleepValue);
        dayMinHours = Math.min(dayMinHours, sleepValue);
      }

  
      const weekIndex = weekDates.findIndex(
        (date) =>
          date.getDate() === entryDate.getDate() &&
          date.getMonth() === entryDate.getMonth() &&
          date.getFullYear() === entryDate.getFullYear()
      );

      if (weekIndex !== -1) {
        weekHours[weekIndex] += sleepValue;

        
        if (weekHours[weekIndex] === sleepValue) {
          weekHoursEntries++;
        }

        
        weekTotalHours += sleepValue;
        weekMaxHours = Math.max(weekMaxHours, sleepValue);
        weekMinHours = Math.min(weekMinHours, sleepValue);
      }

      
      for (let i = 0; i < monthRanges.length; i++) {
        const { year, month } = monthRanges[i];
        if (
          entryDate.getFullYear() === year &&
          entryDate.getMonth() === month
        ) {
          monthHours[i] += sleepValue;

        
          monthTotalHours += sleepValue;
          monthMaxHours = Math.max(monthMaxHours, sleepValue);
          monthMinHours = Math.min(monthMinHours, sleepValue);
          monthHoursEntries++;
          break;
        }
      }
    });

    
    const maxDayHours = Math.max(...dayHours, 8);
    const maxWeekHours = Math.max(...weekHours, 8);
    const maxMonthHours = Math.max(...monthHours, 8);


    const yMaxDay = Math.ceil(maxDayHours / 2) * 2;
    const yMaxWeek = Math.ceil(maxWeekHours / 2) * 2;
    const yMaxMonth = Math.ceil(maxMonthHours / 5) * 5;

    setDataConfig({
      day: {
        labels: dayLabels,
        data: dayHours,
        yMax: yMaxDay,
      },
      week: {
        labels: weekLabels,
        data: weekHours,
        yMax: yMaxWeek,
      },
      month: {
        labels: monthLabels,
        data: monthHours,
        yMax: yMaxMonth,
      },
    });

    
    setSummaries({
      day: {
        total: dayTotalHours,
        average: dayHoursEntries
          ? parseFloat((dayTotalHours / dayHoursEntries).toFixed(1))
          : 0,
        max: dayMaxHours,
        min: dayMinHours === Infinity ? 0 : dayMinHours,
        count: dayHoursEntries,
      },
      week: {
        total: weekTotalHours,
        average: weekHoursEntries
          ? parseFloat((weekTotalHours / weekHoursEntries).toFixed(1))
          : 0,
        max: weekMaxHours,
        min: weekMinHours === Infinity ? 0 : weekMinHours,
        count: weekHoursEntries,
      },
      month: {
        total: monthTotalHours,
        average: monthHoursEntries
          ? parseFloat((monthTotalHours / monthHoursEntries).toFixed(1))
          : 0,
        max: monthMaxHours,
        min: monthMinHours === Infinity ? 0 : monthMinHours,
        count: monthHoursEntries,
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
    <div className="tracker-container">
      <h1 className="tracker-title">Sleep Hours Tracker</h1>

      <div className="tracker-button-group">
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

      <div className="tracker-chart-container flex justify-center items-center">
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: dataConfig[view].labels || [],
              tickLabelStyle: {
                angle: view === "day" ? 45 : 0,
                textAnchor: view === "day" ? "start" : "middle",
                fontSize: view === "day" ? 10 : 12,
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
            bottom: view === "day" ? 100 : 40,
          }}
        />
      </div>

      <Card>
        <CardContent>
          <h2 className="tracker-card-title">{getSummaryTitle()}</h2>
          <p>
            Total Sleep Hours:{" "}
            <strong>{summaries[view].total.toLocaleString()} hrs</strong>
          </p>
          <p>
            Average Sleep Per Day:{" "}
            <strong>{summaries[view].average.toLocaleString()} hrs/day</strong>
          </p>
          <p>
            Max Sleep in a Day:{" "}
            <strong>{summaries[view].max.toLocaleString()} hrs</strong>
          </p>
          <p>
            Min Sleep in a Day:{" "}
            <strong>{summaries[view].min.toLocaleString()} hrs</strong>
          </p>
          <p>
            Days Recorded: <strong>{summaries[view].count}</strong>
          </p>
        </CardContent>
      </Card>

      <Card className="tracker-info-card">
        <CardContent>
          <h2 className="tracker-card-title">About Sleep Hours</h2>
          <p>
            Adults need 7-9 hours of quality sleep per night to maintain
            optimal health and well-being.
          </p>
          <div className="flex items-center mt-2">
            <ArrowRight size={24} />
            <span>Learn more about healthy sleep patterns</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SleepHours;