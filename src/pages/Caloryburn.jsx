import React, { useContext, useState, useMemo } from "react";
import { BarChart } from "@mui/x-charts";
import { ArrowRight } from "lucide-react";
import "../styles/caloryburn.css";
import { MyContext } from "../App";

const Button = ({ children, onClick, variant }) => {
  const baseStyle = "calory-btn";
  const defaultStyle = "calory-btn-default";
  const outlineStyle = "calory-btn-outline";
  const className = `${baseStyle} ${variant === "default" ? defaultStyle : outlineStyle}`;

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => {
  return <div className={`calory-card ${className}`}>{children}</div>;
};

const CardContent = ({ children }) => {
  return <div className="calory-card-content">{children}</div>;
};

const CaloryBurn = () => {
  const [view, setView] = useState("day");
  const { currentdata, alldata } = useContext(MyContext);

  // Process daily calories burned (hourly steps)
  const processDay = () => {
    if (!currentdata?.hourlySteps || typeof currentdata.hourlySteps !== "object") {
      return Array(24).fill(0); // Default to 0 calories for 24 hours
    }

    return Object.values(currentdata.hourlySteps).map((steps) =>
      Math.round((steps || 0) * 0.05)
    );
  };

  // Process weekly data (last 7 days)
  const processWeek = () => {
    if (!alldata || !Array.isArray(alldata)) return Array(7).fill(0);

    return alldata
      .slice(0, 7)
      .map((entry) => (entry.steps ? Math.round(entry.steps * 0.05) : 0));
  };

  // Process last 3 months' total calories using createdAt
  const processMonth = () => {
    if (!alldata || !Array.isArray(alldata)) return [];

    const monthlyData = alldata.reduce((acc, entry) => {
      if (!entry.createdAt || !entry.steps) return acc;

      const dateObj = new Date(entry.createdAt);
      const monthKey = dateObj.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      if (!acc[monthKey]) acc[monthKey] = 0;
      acc[monthKey] += Math.round(entry.steps * 0.05);

      return acc;
    }, {});

    // Ensure we always have data for the last 3 months
    const today = new Date();
    for (let i = 2; i >= 0; i--) {
      const monthKey = new Date(
        today.getFullYear(),
        today.getMonth() - i,
        1
      ).toLocaleString("default", { month: "short", year: "numeric" });

      if (!monthlyData[monthKey]) monthlyData[monthKey] = 0;
    }

    return Object.entries(monthlyData)
      .sort((a, b) => new Date(a[0]) - new Date(b[0])) // Sort chronologically
      .slice(-3); // Take the last 3 months
  };

  // Memoize processed data
  const processedData = useMemo(
    () => ({
      day: processDay(),
      week: processWeek(),
      month: processMonth().map((entry) => entry[1]), // Extract monthly totals
    }),
    [currentdata, alldata]
  );

  // Summary statistics for the selected view
  const summaryStats = useMemo(() => {
    let total = 0;
    let average = 0;
    let max = 0;
    let min = Infinity;
    let count = 0;

    const data = processedData[view];

    if (data && data.length > 0) {
      total = data.reduce((sum, value) => sum + value, 0);
      max = Math.max(...data);
      min = Math.min(...data);
      count = data.filter((value) => value > 0).length; // Count non-zero entries
      average = count > 0 ? Math.round(total / count) : 0;
    }

    return {
      total,
      average,
      max,
      min: min === Infinity ? 0 : min, // Handle case where no data exists
      count,
    };
  }, [view, processedData]);

  // Chart data configurations
  const dataConfig = {
    day: {
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      yMax: Math.max(...processedData.day, 1) * 1.2, // Avoid NaN errors
    },
    week: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      yMax: Math.max(...processedData.week, 1) * 1.2,
    },
    month: {
      labels: processMonth().map((entry) => entry[0]), // Month names from createdAt
      yMax: Math.max(...processedData.month, 1) * 1.2,
    },
  };

  // Get summary title based on current view
  const getSummaryTitle = () => {
    switch (view) {
      case "day":
        return "Daily Calorie Burn";
      case "week":
        return "Weekly Calorie Burn";
      case "month":
        return "3-Month Calorie Burn";
      default:
        return "Calorie Burn Summary";
    }
  };

  return (
    <div className="calory-container">
      <h1 className="calory-title">Calory Burn</h1>

      <div className="calory-btn-group">
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

      <div className="calory-chart-container flex justify-center items-center">
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
          series={[{ data: processedData[view] || [] }]}
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
          <h2 className="calory-card-title">{getSummaryTitle()}</h2>
          <p>
            Total Calories Burned:{" "}
            <strong>{summaryStats.total.toLocaleString()} kcal</strong>
          </p>
          <p>
            Average Calories Per Day:{" "}
            <strong>{summaryStats.average.toLocaleString()} kcal/day</strong>
          </p>
          <p>
            Max Calories Burned in a Day:{" "}
            <strong>{summaryStats.max.toLocaleString()} kcal</strong>
          </p>
          <p>
            Min Calories Burned in a Day:{" "}
            <strong>{summaryStats.min.toLocaleString()} kcal</strong>
          </p>
          <p>
            Days Recorded: <strong>{summaryStats.count}</strong>
          </p>
        </CardContent>
      </Card>

      <Card className="calory-info-card">
        <CardContent>
          <h2 className="calory-card-title">About Calorie Burning</h2>
          <p>
            Tracking your calorie burn helps you understand your daily energy 
            expenditure and can be a key factor in managing fitness and weight.
          </p>
          <p>
            Calories are burned through various activities, including exercise, 
            daily movements, and even resting metabolism.
          </p>
          <div className="flex items-center mt-2">
            <ArrowRight size={24} />
            <span>Learn more about calorie burn and metabolism</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaloryBurn;