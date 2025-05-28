import "../styles/steptracker.css";
import React, { useContext, useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts";
import { ArrowRight } from "lucide-react";
import { MyContext } from "../App";

const Button = ({ children, onClick, variant }) => {
  const baseStyle = "step-btn";
  const defaultStyle = "step-btn-default";
  const outlineStyle = "step-btn-outline";
  const className = `${baseStyle} ${variant === "default" ? defaultStyle : outlineStyle}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => {
  return <div className={`step-card ${className}`}>{children}</div>;
};

const CardContent = ({ children }) => {
  return <div className="step-card-content">{children}</div>;
};

const StepTracker = () => {
  const { currentdata, alldata } = useContext(MyContext);
  const [view, setView] = useState("day");
  const [dataConfig, setDataConfig] = useState({
    day: { labels: [], data: [], yMax: 10000 },
    week: { labels: [], data: [], yMax: 10000 },
    month: { labels: [], data: [], yMax: 50000 },
  });
  const [summaries, setSummaries] = useState({
    day: { total: 0, average: 0, max: 0, min: 0, count: 0 },
    week: { total: 0, average: 0, max: 0, min: 0, count: 0 },
    month: { total: 0, average: 0, max: 0, min: 0, count: 0 },
  });

  // Get summary title based on current view
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

    // Daily data calculation - last 30 days
    const daySteps = Array(30).fill(0);
    const dayLabels = [];
    const dayDates = [];

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
    const weekSteps = Array(7).fill(0);
    const weekLabels = [];
    const weekDates = [];

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
    const monthSteps = Array(3).fill(0);
    const monthLabels = [];
    const monthRanges = [];

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
    let dayTotalSteps = 0,
      dayMaxSteps = 0,
      dayMinSteps = Infinity,
      dayStepsEntries = 0;
    let weekTotalSteps = 0,
      weekMaxSteps = 0,
      weekMinSteps = Infinity,
      weekStepsEntries = 0;
    let monthTotalSteps = 0,
      monthMaxSteps = 0,
      monthMinSteps = Infinity,
      monthStepsEntries = 0;

    // Calculate step data for all views
    last90Days.forEach((entry) => {
      const entryDate = new Date(entry.createdAt);
      if (isNaN(entryDate)) return;

      const stepValue = Number(entry.steps) || 0;
      if (stepValue <= 0) return; // Skip entries with no steps

      // For daily view - last 30 days
      const dayIndex = dayDates.findIndex(
        (date) =>
          date.getDate() === entryDate.getDate() &&
          date.getMonth() === entryDate.getMonth() &&
          date.getFullYear() === entryDate.getFullYear()
      );

      if (dayIndex !== -1) {
        daySteps[dayIndex] += stepValue;

        // Only count as a new entry if we haven't seen steps for this day yet
        if (daySteps[dayIndex] === stepValue) {
          dayStepsEntries++;
        }

        // Update day summary data
        dayTotalSteps += stepValue;
        dayMaxSteps = Math.max(dayMaxSteps, stepValue);
        dayMinSteps = Math.min(dayMinSteps, stepValue);
      }

      // For weekly view - last 7 days
      const weekIndex = weekDates.findIndex(
        (date) =>
          date.getDate() === entryDate.getDate() &&
          date.getMonth() === entryDate.getMonth() &&
          date.getFullYear() === entryDate.getFullYear()
      );

      if (weekIndex !== -1) {
        weekSteps[weekIndex] += stepValue;

        // Only count as a new entry if we haven't seen steps for this day yet
        if (weekSteps[weekIndex] === stepValue) {
          weekStepsEntries++;
        }

        // Update week summary data
        weekTotalSteps += stepValue;
        weekMaxSteps = Math.max(weekMaxSteps, stepValue);
        weekMinSteps = Math.min(weekMinSteps, stepValue);
      }

      // For monthly view - last 3 months
      for (let i = 0; i < monthRanges.length; i++) {
        const { year, month } = monthRanges[i];
        if (
          entryDate.getFullYear() === year &&
          entryDate.getMonth() === month
        ) {
          monthSteps[i] += stepValue;

          // Update month summary data
          monthTotalSteps += stepValue;
          monthMaxSteps = Math.max(monthMaxSteps, stepValue);
          monthMinSteps = Math.min(monthMinSteps, stepValue);
          monthStepsEntries++;
          break;
        }
      }
    });

    // Find the maximum values for y-axis scaling
    const maxDaySteps = Math.max(...daySteps, 1000);
    const maxWeekSteps = Math.max(...weekSteps, 1000);
    const maxMonthSteps = Math.max(...monthSteps, 1000);

    // Round up to the nearest appropriate number for better visualization
    const yMaxDay = Math.ceil(maxDaySteps / 1000) * 1000;
    const yMaxWeek = Math.ceil(maxWeekSteps / 1000) * 1000;
    const yMaxMonth = Math.ceil(maxMonthSteps / 1000) * 1000;

    setDataConfig({
      day: {
        labels: dayLabels,
        data: daySteps,
        yMax: yMaxDay,
      },
      week: {
        labels: weekLabels,
        data: weekSteps,
        yMax: yMaxWeek,
      },
      month: {
        labels: monthLabels,
        data: monthSteps,
        yMax: yMaxMonth,
      },
    });

    // Set view-specific summaries
    setSummaries({
      day: {
        total: dayTotalSteps,
        average: dayStepsEntries
          ? Math.round(dayTotalSteps / dayStepsEntries)
          : 0,
        max: dayMaxSteps,
        min: dayMinSteps === Infinity ? 0 : dayMinSteps,
        count: dayStepsEntries,
      },
      week: {
        total: weekTotalSteps,
        average: weekStepsEntries
          ? Math.round(weekTotalSteps / weekStepsEntries)
          : 0,
        max: weekMaxSteps,
        min: weekMinSteps === Infinity ? 0 : weekMinSteps,
        count: weekStepsEntries,
      },
      month: {
        total: monthTotalSteps,
        average: monthStepsEntries
          ? Math.round(monthTotalSteps / monthStepsEntries)
          : 0,
        max: monthMaxSteps,
        min: monthMinSteps === Infinity ? 0 : monthMinSteps,
        count: monthStepsEntries,
      },
    });
  }, [currentdata, alldata]);

  return (
    <div className="step-container">
      <h1 className="step-title">Step Tracker</h1>

      <div className="step-btn-group">
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

      <div className="step-chart-container flex justify-center items-center">
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
          <h2 className="step-card-title">{getSummaryTitle()}</h2>
          <p>
            Total Steps:{" "}
            <strong>{summaries[view].total.toLocaleString()} steps</strong>
          </p>
          <p>
            Average Steps Per Day:{" "}
            <strong>
              {summaries[view].average.toLocaleString()} steps/day
            </strong>
          </p>
          <p>
            Max Steps in a Day:{" "}
            <strong>{summaries[view].max.toLocaleString()} steps</strong>
          </p>
          <p>
            Min Steps in a Day:{" "}
            <strong>{summaries[view].min.toLocaleString()} steps</strong>
          </p>
          <p>
            Days Recorded: <strong>{summaries[view].count}</strong>
          </p>
        </CardContent>
      </Card>

      <Card className="step-info-card">
        <CardContent>
          <h2 className="step-card-title">About Step Tracking</h2>
          <p>
            Walking is a simple yet effective form of exercise. Regular step 
            tracking can help you monitor your daily activity levels and 
            motivate you to stay more active.
          </p>
          <p>
            Aim for at least 10,000 steps per day to improve your overall 
            health and fitness.
          </p>
          <div className="flex items-center mt-2">
            <ArrowRight size={24} />
            <span>Learn more about the benefits of walking</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepTracker;