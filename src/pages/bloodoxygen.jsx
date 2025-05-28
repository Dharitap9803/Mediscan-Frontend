import React, { useState, useEffect, useContext } from "react";
import { BarChart } from "@mui/x-charts";
import { ArrowRight } from "lucide-react";
import "../styles/bloodoxygen.css";
import { MyContext } from "../App";

const Button = ({ children, onClick, variant }) => {
  const baseStyle = "oxygen-btn";
  const defaultStyle = "oxygen-btn-default";
  const outlineStyle = "oxygen-btn-outline";
  const className = `${baseStyle} ${variant === "default" ? defaultStyle : outlineStyle}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => {
  return <div className={`oxygen-card ${className}`}>{children}</div>;
};

const CardContent = ({ children }) => {
  return <div className="oxygen-card-content">{children}</div>;
};

const BloodOxygen = () => {
  const { currentdata, alldata } = useContext(MyContext);
  const [view, setView] = useState("day");
  const [dataConfig, setDataConfig] = useState({
    day: { labels: [], data: [], yMax: 100 },
    week: { labels: [], data: [], yMax: 100 },
    month: { labels: [], data: [], yMax: 100 },
  });
  const [summaries, setSummaries] = useState({
    day: { average: 0, max: 0, min: 0, count: 0 },
    week: { average: 0, max: 0, min: 0, count: 0 },
    month: { average: 0, max: 0, min: 0, count: 0 },
  });

  useEffect(() => {
    console.log("Current data: ", currentdata);
    console.log("All data: ", alldata);
    if (!currentdata || !alldata || alldata.length === 0) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    const last90Days = alldata.filter((entry) => {
        const entryDate = new Date(entry.createdAt);
        return !isNaN(entryDate) && (today - entryDate) / (1000 * 60 * 60 * 24) <= 90;
    });

    console.log("Filtered last 90 days data: ", last90Days);

    // Daily data calculation - last 30 days
    const dayValues = Array(30).fill(0);
    const dayLabels = [];
    const dayDates = [];

    // Generate the last 30 days (including today) in reverse order
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        dayDates.push(date);
        dayLabels.push(date.toLocaleDateString("en-US", { day: "2-digit", month: "2-digit" }));
    }

    console.log("Day labels: ", dayLabels);

    // Weekly data calculation - last 7 days
    const weekValues = Array(7).fill(0);
    const weekLabels = [];
    const weekDates = [];

    // Generate the last 7 days (including today) in reverse order
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        weekDates.push(date);
        weekLabels.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
    }

    console.log("Week labels: ", weekLabels);

    // Monthly data calculation - last 3 months
    const monthValues = Array(3).fill(0);
    const monthLabels = [];
    const monthRanges = [];

    // Generate the last 3 months
    for (let i = 2; i >= 0; i--) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        monthRanges.push({ year: date.getFullYear(), month: date.getMonth() });
        monthLabels.push(date.toLocaleDateString("en-US", { month: "short", year: "numeric" }));
    }

    console.log("Month labels: ", monthLabels);

    // Prepare to calculate summaries for each view
    let dayTotalValue = 0, dayMaxValue = 0, dayMinValue = Infinity, dayEntries = 0;
    let weekTotalValue = 0, weekMaxValue = 0, weekMinValue = Infinity, weekEntries = 0;
    let monthTotalValue = 0, monthMaxValue = 0, monthMinValue = Infinity, monthEntries = 0;

    // Calculate blood oxygen data for all views
    last90Days.forEach((entry) => {
        if (!entry.createdAt || !entry.bloodOxygenLevel) {
            console.warn("Skipping entry due to missing createdAt or bloodOxygen: ", entry);
            return;
        }

        const entryDate = new Date(entry.createdAt);
        if (isNaN(entryDate)) {
            console.warn("Skipping entry due to invalid date: ", entry);
            return;
        }

        const oxyValue = Number(entry.bloodOxygenLevel) || 0;
        if (oxyValue <= 0) {
            console.warn("Skipping entry due to invalid bloodOxygen value: ", entry);
            return;
        }

        // For daily view - last 30 days
        const dayIndex = dayDates.findIndex(
            (date) =>
                date.getDate() === entryDate.getDate() &&
                date.getMonth() === entryDate.getMonth() &&
                date.getFullYear() === entryDate.getFullYear()
        );

        if (dayIndex !== -1) {
            dayValues[dayIndex] = oxyValue;
            dayTotalValue += oxyValue;
            dayMaxValue = Math.max(dayMaxValue, oxyValue);
            dayMinValue = Math.min(dayMinValue, oxyValue);
            dayEntries++;
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
            weekTotalValue += oxyValue;
            weekMaxValue = Math.max(weekMaxValue, oxyValue);
            weekMinValue = Math.min(weekMinValue, oxyValue);
            weekEntries++;
        }

        // For monthly view - last 3 months
        for (let i = 0; i < monthRanges.length; i++) {
            const { year, month } = monthRanges[i];
            if (entryDate.getFullYear() === year && entryDate.getMonth() === month) {
                if (monthValues[i] === 0) {
                    monthValues[i] = oxyValue;
                } else {
                    monthValues[i] = (monthValues[i] + oxyValue) / 2;
                }
                monthTotalValue += oxyValue;
                monthMaxValue = Math.max(monthMaxValue, oxyValue);
                monthMinValue = Math.min(monthMinValue, oxyValue);
                monthEntries++;
                break;
            }
        }
    });

    console.log("Day values: ", dayValues);
    console.log("Week values: ", weekValues);
    console.log("Month values: ", monthValues);

    const yMaxValue = 100;
    const yMinValue = 80;

    setDataConfig({
        day: { labels: dayLabels, data: dayValues, yMax: yMaxValue, yMin: yMinValue },
        week: { labels: weekLabels, data: weekValues, yMax: yMaxValue, yMin: yMinValue },
        month: { labels: monthLabels, data: monthValues, yMax: yMaxValue, yMin: yMinValue },
    });

    setSummaries({
        day: {
            average: dayEntries ? Math.round(dayTotalValue / dayEntries * 10) / 10 : 0,
            max: dayMaxValue,
            min: dayMinValue === Infinity ? 0 : dayMinValue,
            count: dayEntries,
        },
        week: {
            average: weekEntries ? Math.round(weekTotalValue / weekEntries * 10) / 10 : 0,
            max: weekMaxValue,
            min: weekMinValue === Infinity ? 0 : weekMinValue,
            count: weekEntries,
        },
        month: {
            average: monthEntries ? Math.round(monthTotalValue / monthEntries * 10) / 10 : 0,
            max: monthMaxValue,
            min: monthMinValue === Infinity ? 0 : monthMinValue,
            count: monthEntries,
        },
    });
}, [currentdata, alldata]);


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
    <div className="oxygen-container">
      <h1 className="oxygen-title">Blood Oxygen Tracker</h1>

      <div className="oxygen-btn-group">
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

      <div className="oxygen-chart-wrapper flex justify-center items-center">
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
          <h2 className="oxygen-card-title">{getSummaryTitle()}</h2>
          <p>
            Average Blood Oxygen Level: <strong>{summaries[view].average}</strong>
          </p>
          <p>
            Max Blood Oxygen Level: <strong>{summaries[view].max}</strong>
          </p>
          <p>
            Min Blood Oxygen Level: <strong>{summaries[view].min}</strong>
          </p>
          <p>
            Total Entries: <strong>{summaries[view].count}</strong>
          </p>
        </CardContent>
      </Card>

      <Card className="oxygen-info-card">
        <CardContent>
          <h2 className="oxygen-card-title">About Blood Oxygen Levels</h2>
          <p>
            Monitoring blood oxygen saturation is important for understanding your respiratory health.
          </p>
          <div className="flex items-center mt-2">
            <ArrowRight size={24} />
            <span>Learn more about blood oxygen monitoring</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BloodOxygen;


