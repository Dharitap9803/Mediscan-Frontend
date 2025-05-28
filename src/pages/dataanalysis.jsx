import React, { useState, useContext, useEffect } from "react";
import { FaHeartbeat, FaTint } from "react-icons/fa";
import "../styles/dataanalysis.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyContext } from "../App";
import { ArrowRight } from "lucide-react";
import BloodPressure from "./bloodpressure"; // Import the BloodPressure component
import { useLocation } from "react-router-dom";

const DataAnalysis = () => {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState("bp");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [bmiCategory, setBmiCategory] = useState(null);
  const [diabetesRisk, setDiabetesRisk] = useState(null);
  const [stepsSuggestion, setStepsSuggestion] = useState(null);
  const [bloodSugar, setBloodSugar] = useState("");
  const { currentdata, alldata } = useContext(MyContext) || {
    currentdata: null,
    alldata: null,
  };

  // Read the selectedTab from the location state
  useEffect(() => {
    if (location.state && location.state.selectedTab) {
      setSelectedTab(location.state.selectedTab);
    }
  }, [location]);

  // Height conversion utility (from Diabetes.jsx)
  const convertToCentimeters = (value, unit) => {
    switch (unit) {
      case "cm":
        return Number(value);
      case "inch":
        return Number(value) * 2.54;
      case "meter":
        return Number(value) * 100;
      default:
        return Number(value);
    }
  };

  // BMI category determination (from Diabetes.jsx)
  const getBmiCategory = (bmiValue) => {
    const numericBmi = parseFloat(bmiValue);
    if (numericBmi < 18.5) return "Underweight";
    if (numericBmi >= 18.5 && numericBmi < 25) return "Normal weight";
    if (numericBmi >= 25 && numericBmi < 30) return "Overweight";
    if (numericBmi >= 30) return "Obese";
    return "Unknown";
  };

  // Age group definitions (from Diabetes.jsx)
  const ageGroups = [
    { label: "Select Age Group", value: "", min: null, max: null },
    { label: "Less than 6 years", value: "0-5", min: 0, max: 5 },
    { label: "6 to 12 years", value: "6-12", min: 6, max: 12 },
    { label: "13 to 19 years", value: "13-19", min: 13, max: 19 },
    { label: "20 years and above", value: "20+", min: 20, max: 100 },
  ];

  // Blood sugar category determination (from Diabetes.jsx)
  const getBloodSugarCategory = (level) => {
    const numericLevel = parseFloat(level);
    if (numericLevel < 70) return "Low";
    if (numericLevel >= 70 && numericLevel < 100) return "Normal";
    if (numericLevel >= 100 && numericLevel < 126) return "Prediabetic";
    if (numericLevel >= 126) return "Diabetic";
    return "Unknown";
  };

  // Get blood sugar level color (from Diabetes.jsx)
  const getBloodSugarColor = (category) => {
    switch (category) {
      case "Low":
        return "#3498db"; // Blue
      case "Normal":
        return "#2ecc71"; // Green
      case "Prediabetic":
        return "#f39c12"; // Orange
      case "Diabetic":
        return "#e74c3c"; // Red
      default:
        return "#2c3e50"; // Dark slate
    }
  };

  // Calculate BMI whenever height, weight, or height unit changes (from Diabetes.jsx)
  React.useEffect(() => {
    if (height && weight) {
      // Convert height to meters for BMI calculation
      const heightInMeters = convertToCentimeters(height, heightUnit) / 100;
      const calculatedBMI = (
        weight /
        (heightInMeters * heightInMeters)
      ).toFixed(1);
      setBMI(calculatedBMI);

      // Set BMI category
      setBmiCategory(getBmiCategory(calculatedBMI));
    }
  }, [height, weight, heightUnit]);

  // Initialize blood sugar from current data (from Diabetes.jsx)
  React.useEffect(() => {
    if (currentdata?.bloodSugarLevel) {
      setBloodSugar(currentdata.bloodSugarLevel.toString());
    }
  }, [currentdata]);

  // Calculate Diabetes Risk with blood sugar level (from Diabetes.jsx)
  const calculateDiabetesRisk = () => {
    const selectedGroup = ageGroups.find((group) => group.value === age);
    if (!selectedGroup || !bmi || !bloodSugar) {
      toast.warning("⚠️ Please fill in all diabetes assessment fields.");
      return;
    }

    const randomAge =
      selectedGroup.min !== null
        ? Math.floor(
            Math.random() * (selectedGroup.max - selectedGroup.min + 1)
          ) + selectedGroup.min
        : null;

    let risk = 0;

    // Age risk factor
    if (randomAge < 20) risk += 1;
    else if (randomAge >= 45 && randomAge <= 65) risk += 2;
    else if (randomAge > 65) risk += 3;

    // BMI risk factor
    if (bmi < 18.5) risk += 1;
    else if (bmi >= 25 && bmi < 30) risk += 2;
    else if (bmi >= 30) risk += 3;

    // Blood sugar risk factor
    const numericBloodSugar = parseFloat(bloodSugar);
    if (numericBloodSugar >= 100 && numericBloodSugar < 126)
      risk += 2; // Prediabetic
    else if (numericBloodSugar >= 126) risk += 3; // Diabetic

    // Determine risk level
    let riskLevel = "Low";
    if (risk >= 5) riskLevel = "High";
    else if (risk >= 3) riskLevel = "Moderate";

    setDiabetesRisk(riskLevel);

    // Calculate steps needed to reduce diabetes risk
    calculateStepsSuggestion(riskLevel, numericBloodSugar);

    toast.success("✅ Diabetes risk assessment completed!");
  };

  // Calculate steps needed to reduce diabetes risk (from Diabetes.jsx)
  const calculateStepsSuggestion = (riskLevel, bloodSugarValue) => {
    let currentSteps = currentdata?.steps || 0;
    let glucoseLevel = currentdata?.glucoseLevel || 0;

    let recommendedSteps = 10000; // Base recommended steps
    let additionalSteps = 0;
    let message = "";

    // Adjust recommended steps based on risk level
    if (riskLevel === "High") {
      recommendedSteps = 12000;

      if (bloodSugarValue >= 126) {
        additionalSteps = 3000;
        message = "Your blood sugar levels indicate you may be diabetic. ";
      } else if (bloodSugarValue >= 100) {
        additionalSteps = 2000;
        message = "Your blood sugar levels indicate prediabetes. ";
      }

      if (bmi > 30) {
        additionalSteps += 3000;
        message += "Your BMI indicates obesity. ";
      } else if (bmi > 25) {
        additionalSteps += 2000;
        message += "Your BMI indicates you're overweight. ";
      }
    } else if (riskLevel === "Moderate") {
      recommendedSteps = 11000;

      if (bloodSugarValue >= 126) {
        additionalSteps = 2500;
        message = "Your blood sugar levels indicate you may be diabetic. ";
      } else if (bloodSugarValue >= 100) {
        additionalSteps = 1500;
        message = "Your blood sugar levels indicate prediabetes. ";
      }

      if (bmi > 30) {
        additionalSteps += 2500;
        message += "Your BMI indicates obesity. ";
      } else if (bmi > 25) {
        additionalSteps += 1500;
        message += "Your BMI indicates you're overweight. ";
      }
    } else {
      // Low risk
      if (bloodSugarValue >= 100) {
        additionalSteps = 1500;
        message =
          "Although your overall risk is low, your blood sugar is elevated. ";
      } else if (bmi > 25) {
        additionalSteps = 1000;
        message =
          "Although your diabetes risk is low, maintaining a healthy weight is important. ";
      }
    }

    const totalRecommendedSteps = recommendedSteps + additionalSteps;
    const stepsNeeded = Math.max(0, totalRecommendedSteps - currentSteps);

    let recommendation = "";
    if (stepsNeeded > 0) {
      recommendation = `${message}You currently take ${currentSteps.toLocaleString()} steps. We recommend increasing to ${totalRecommendedSteps.toLocaleString()} steps daily (${stepsNeeded.toLocaleString()} more steps) to help reduce your diabetes risk.`;
    } else {
      recommendation = `Great job! You're already taking ${currentSteps.toLocaleString()} steps daily, which meets or exceeds our recommendation of ${totalRecommendedSteps.toLocaleString()} steps for your risk profile.`;
    }

    setStepsSuggestion({
      current: currentSteps,
      recommended: totalRecommendedSteps,
      needed: stepsNeeded,
      message: recommendation,
    });
  };

  // Get appropriate color for BMI category (from Diabetes.jsx)
  const getBmiCategoryColor = (category) => {
    switch (category) {
      case "Underweight":
        return "#3498db"; // Blue
      case "Normal weight":
        return "#2ecc71"; // Green
      case "Overweight":
        return "#f39c12"; // Orange
      case "Obese":
        return "#e74c3c"; // Red
      default:
        return "#2c3e50"; // Dark slate
    }
  };

  // Calculate the position of the BMI indicator (from Diabetes.jsx)
  const getBmiIndicatorPosition = () => {
    if (bmi === null) return 0;
    const numericBmi = parseFloat(bmi);
    if (numericBmi < 18.5) return (numericBmi / 18.5) * 25;
    if (numericBmi < 25) return 25 + ((numericBmi - 18.5) / (25 - 18.5)) * 25;
    if (numericBmi < 30) return 50 + ((numericBmi - 25) / (30 - 25)) * 25;
    return 75 + ((numericBmi - 30) / (40 - 30)) * 25;
  };

  // Function to get risk level color (from Diabetes.jsx)
  const getRiskLevelColor = (risk) => {
    switch (risk) {
      case "Low":
        return "#2ecc71"; // Green
      case "Moderate":
        return "#f39c12"; // Orange
      case "High":
        return "#e74c3c"; // Red
      default:
        return "#2c3e50"; // Dark slate
    }
  };

  // Button Component (from Diabetes.jsx)
  const Button = ({
    children,
    onClick,
    type = "button",
    variant = "default",
    isActive = false,
  }) => {
    const baseStyle = "button";
    const defaultStyle = "button-default";
    const outlineStyle = "button-outline";
    const activeStyle = isActive ? "button-active" : "";
    const className = `${baseStyle} ${variant === "default" ? defaultStyle : outlineStyle} ${activeStyle}`;

    return (
      <button type={type} className={className} onClick={onClick}>
        {children}
      </button>
    );
  };

  // Card Component (from Diabetes.jsx)
  const Card = ({ children, className = "" }) => {
    return <div className={`card ${className}`}>{children}</div>;
  };

  const handleDiabetesSubmit = (e) => {
    e.preventDefault();
    calculateDiabetesRisk();
  };

  return (
    <>
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <div className="data-card-container">
        <h2 className="data-title">Analyze Your Health Data</h2>
        <p className="data-subtitle">
          Select a category to analyze your smartwatch data
        </p>

        <div className="tab-container">
          <button
            className={`tab-button ${selectedTab === "bp" ? "active" : ""}`}
            onClick={() => setSelectedTab("bp")}
          >
            <FaHeartbeat />
            <span>Blood Pressure</span>
          </button>
          <button
            className={`tab-button ${selectedTab === "diabetes" ? "active" : ""}`}
            onClick={() => setSelectedTab("diabetes")}
          >
            <FaTint />
            <span>Diabetes</span>
          </button>
        </div>
        <div className="main-card">
          
        {selectedTab === "bp" ? (
           <BloodPressure />
        ):(<>
        
          <div className="data-card1">
           

         
              <div className="data-form diabetes-form">
                <h3 className="form-title">Diabetes Risk Assessment</h3>

                <div className="input-group">
                  <label htmlFor="age-group">Age Group</label>
                  <select
                    id="age-group"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="form-control"
                  >
                    <option value="" disabled>
                      Select Age Group
                    </option>
                    {ageGroups.map((group) => (
                      <option key={group.value} value={group.value}>
                        {group.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="height">Height</label>
                  <div className="height-input-group">
                    <input
                      type="number"
                      id="height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      min="0"
                      max="300"
                      required
                      placeholder="Enter height"
                      className="height-input"
                    />
                    <select
                      value={heightUnit}
                      onChange={(e) => setHeightUnit(e.target.value)}
                      className="height-unit-select"
                    >
                      <option value="cm">Centimeters (cm)</option>
                      <option value="inch">Inches (in)</option>
                      <option value="meter">Meters (m)</option>
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="weight">Weight (kg)</label>
                  <input
                    type="number"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    min="10"
                    max="300"
                    required
                    placeholder="Enter weight in kg"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="blood-sugar">Blood Sugar Level (mg/dL)</label>
                  <input
                    type="number"
                    id="blood-sugar"
                    value={bloodSugar}
                    onChange={(e) => setBloodSugar(e.target.value)}
                    min="30"
                    max="600"
                    required
                    placeholder="Enter blood sugar level"
                  />
                </div>

                <button
                  className="analyze-button"
                  onClick={handleDiabetesSubmit}
                >
                  Calculate Risk
                </button>

                {age && bmi && bloodSugar && (
                  <div className="result-section">
                    <h3 className="section-title">Your Health Metrics</h3>
                    <p>
                      Age Group:{" "}
                      <strong>
                        {ageGroups.find((group) => group.value === age)?.label}
                      </strong>
                    </p>
                    <p>
                      Height:{" "}
                      <strong>
                        {height} {heightUnit}
                      </strong>
                    </p>
                    <p>
                      Weight: <strong>{weight} kg</strong>
                    </p>
                    <p>
                      BMI: <strong>{bmi} kg/m²</strong>
                    </p>
                    {bmiCategory && (
                      <div
                        className="bmi-category"
                        style={{ marginBottom: "0.75rem" }}
                      >
                        <p>
                          Category:{" "}
                          <strong
                            style={{ color: getBmiCategoryColor(bmiCategory) }}
                          >
                            {bmiCategory}
                          </strong>
                        </p>
                        <div className="bmi-scale">
                          <div className="bmi-scale-markers">
                            <span className="bmi-marker bmi-marker-underweight">
                              18.5
                            </span>
                            <span className="bmi-marker bmi-marker-normal">
                              25
                            </span>
                            <span className="bmi-marker bmi-marker-overweight">
                              30
                            </span>
                          </div>
                          <div className="bmi-scale-bar">
                            <div className="bmi-bar bmi-bar-underweight"></div>
                            <div className="bmi-bar bmi-bar-normal"></div>
                            <div className="bmi-bar bmi-bar-overweight"></div>
                            <div className="bmi-bar bmi-bar-obese"></div>
                            <div
                              className="bmi-indicator"
                              style={{ left: `${getBmiIndicatorPosition()}%` }}
                            ></div>
                          </div>
                          <div className="bmi-scale-labels">
                            <span className="bmi-label">Underweight</span>
                            <span className="bmi-label">Normal</span>
                            <span className="bmi-label">Overweight</span>
                            <span className="bmi-label">Obese</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <p>
                      Blood Sugar Level: <strong>{bloodSugar} mg/dL</strong>{" "}
                      <span
                        style={{
                          color: getBloodSugarColor(
                            getBloodSugarCategory(bloodSugar)
                          ),
                          fontWeight: "bold",
                        }}
                      >
                        ({getBloodSugarCategory(bloodSugar)})
                      </span>
                    </p>
                    {diabetesRisk && (
                      <p>
                        Diabetes Risk:{" "}
                        <strong
                          style={{ color: getRiskLevelColor(diabetesRisk) }}
                        >
                          {diabetesRisk}
                        </strong>
                      </p>
                    )}
                  </div>
                )}

                {stepsSuggestion && (
                  <div className="steps-suggestion">
                    <h3 className="section-title">
                      Steps to Reduce Diabetes Risk
                    </h3>
                    <div className="steps-progress">
                      <div className="steps-progress-bar">
                        <div
                          className="steps-progress-current"
                          style={{
                            width: `${Math.min(
                              100,
                              (stepsSuggestion.current /
                                stepsSuggestion.recommended) *
                                100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <p className="steps-suggestion-message">
                      {stepsSuggestion.message}
                    </p>
                  </div>
                )}
              </div>
           
          </div>

          <div className="data-card2">
            <h2 className="card-title">
              {selectedTab === "bp"
                ? "Understanding Blood Pressure"
                : "Understanding Diabetes Metrics"}
            </h2>
            <div className="card-content">
              <div className="card-info">
                {selectedTab === "bp" ? (
                  <ul className="card-instructions">
                    <li>
                      <strong>Normal:</strong> Less than 120/80 mmHg
                    </li>
                    <li>
                      <strong>Elevated:</strong> 120-129/Less than 80 mmHg
                    </li>
                    <li>
                      <strong>Stage 1 Hypertension:</strong> 130-139/80-89 mmHg
                    </li>
                    <li>
                      <strong>Stage 2 Hypertension:</strong> 140 or higher/90 or
                      higher mmHg
                    </li>
                    <li>
                      <strong>Hypertensive Crisis:</strong> Higher than
                      180/Higher than 120 mmHg
                    </li>
                    <li>
                      <strong>Risk Factors:</strong> Family history, age,
                      obesity, lack of physical activity, high sodium diet,
                      excessive alcohol consumption
                    </li>
                    <li>
                      <strong>Complications:</strong> Heart disease, stroke,
                      kidney damage, vision loss, metabolic syndrome
                    </li>
                    <li>
                      <strong>Management:</strong> Lifestyle changes (regular
                      exercise, healthy diet, limited sodium and alcohol),
                      medication when necessary
                    </li>
                  </ul>
                ) : (
                  <>
                    <div className="metrics-info">
                      <div className="metric-section">
                        <h3>Body Mass Index (BMI)</h3>
                        <p>
                          BMI is calculated by dividing your weight in kilograms
                          by your height in meters squared (kg/m²).
                        </p>
                        <ul>
                          <li>Underweight: Below 18.5</li>
                          <li>Normal weight: 18.5 - 24.9</li>
                          <li>Overweight: 25 - 29.9</li>
                          <li>Obese: 30 and above</li>
                        </ul>
                      </div>

                      <div className="metric-section">
                        <h3>Blood Sugar Levels</h3>
                        <p>
                          Fasting blood sugar levels are measured after not
                          eating for at least 8 hours.
                        </p>
                        <ul>
                          <li>Low: Below 70 mg/dL</li>
                          <li>Normal: 70 - 99 mg/dL</li>
                          <li>Prediabetic: 100 - 125 mg/dL</li>
                          <li>Diabetic: 126 mg/dL or higher</li>
                        </ul>
                      </div>

                      <div className="metric-section">
                        <h3>Tips to Reduce Diabetes Risk:</h3>
                        <ul>
                          <li>Take at least 10,000 steps daily</li>
                          <li>
                            Maintain a healthy blood sugar level (70-99 mg/dL)
                          </li>
                          <li>Keep your BMI in the normal range (18.5-24.9)</li>
                          <li>
                            Include at least 30 minutes of moderate exercise 5
                            days a week
                          </li>
                          <li>
                            Reduce intake of processed foods and added sugars
                          </li>
                          <li>
                            Increase dietary fiber from fruits, vegetables, and
                            whole grains
                          </li>
                          <li>
                            Stay hydrated by drinking water instead of sugary
                            beverages
                          </li>
                          <li>
                            Monitor your blood sugar regularly if in the
                            prediabetic range
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center mt-2">
                      <ArrowRight size={24} />
                      <span>
                        Consult a healthcare professional for personalized
                        advice.
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          </>
           )}
        </div>
      </div>
    </>
  );
};

export default DataAnalysis;
