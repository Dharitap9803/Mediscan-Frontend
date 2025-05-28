import React, { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/bloodpressure.css";
import { MyContext } from "../App";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BloodPressure = () => {
  const { currentdata, alldata } = useContext(MyContext);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [bpData, setBpData] = useState({
    gender: "",
    age: "",
    height: "",
    heightUnit: "cm",
    systolic: currentdata?.bloodPressure?.systolic || "",
    diastolic: currentdata?.bloodPressure?.diastolic || "",
    heartRate: currentdata?.heartRate?.avg || "",
    sleepHours: currentdata?.sleepHours || "",
    stressLevel: currentdata?.stressLevel || "",
    weight: "",
    weightUnit: "kg",
    exerciseFrequency: "",
    smokingStatus: "",
    alcoholConsumption: "",
    saltIntake: "",
  });

  const ageGroups = [
    { label: "Select Age Group", value: "", min: null, max: null },
    { label: "10-19 years", value: "10-19", min: 10, max: 19 },
    { label: "20-29 years", value: "20-29", min: 20, max: 29 },
    { label: "30-39 years", value: "30-39", min: 30, max: 39 },
    { label: "40-49 years", value: "40-49", min: 40, max: 49 },
    { label: "50-59 years", value: "50-59", min: 50, max: 59 },
    { label: "60+ years", value: "60+", min: 60, max: 100 },
  ];

  const exerciseOptions = [
    { label: "Select Exercise Frequency", value: "" },
    { label: "None", value: "none" },
    { label: "1-2 times per week", value: "low" },
    { label: "3-4 times per week", value: "moderate" },
    { label: "5+ times per week", value: "high" },
  ];

  const smokingOptions = [
    { label: "Select Smoking Status", value: "" },
    { label: "Non-smoker", value: "non-smoker" },
    { label: "Former smoker", value: "former" },
    { label: "Occasional smoker", value: "occasional" },
    { label: "Regular smoker", value: "regular" },
  ];

  const alcoholOptions = [
    { label: "Select Alcohol Consumption", value: "" },
    { label: "None", value: "none" },
    { label: "Occasional (1-2 drinks/week)", value: "occasional" },
    { label: "Moderate (3-7 drinks/week)", value: "moderate" },
    { label: "Heavy (8+ drinks/week)", value: "heavy" },
  ];

  const saltOptions = [
    { label: "Select Salt Intake", value: "" },
    { label: "Low", value: "low" },
    { label: "Moderate", value: "moderate" },
    { label: "High", value: "high" },
  ];

  const handleBpChange = (e) => {
    const { name, value } = e.target;
    setBpData({
      ...bpData,
      [name]: value,
    });
  };

  const calculateBMI = () => {
    let heightInMeters;
    let weightInKg;

    if (bpData.heightUnit === "cm") {
      heightInMeters = bpData.height / 100;
    } else if (bpData.heightUnit === "inch") {
      heightInMeters = bpData.height * 0.0254;
    } else {
      heightInMeters = bpData.height;
    }

    if (bpData.weightUnit === "lb") {
      weightInKg = bpData.weight * 0.453592;
    } else {
      weightInKg = bpData.weight;
    }

    if (heightInMeters > 0 && weightInKg > 0) {
      return (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return null;
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 25) return "Normal";
    if (bmi >= 25 && bmi < 30) return "Overweight";
    if (bmi >= 30) return "Obese";
    return "Unknown";
  };

  const getBloodPressureCategory = (systolic, diastolic) => {
    if (systolic < 120 && diastolic < 80) return "Normal";
    if (systolic >= 120 && systolic <= 129 && diastolic < 80) return "Elevated";
    if (
      (systolic >= 130 && systolic <= 139) ||
      (diastolic >= 80 && diastolic <= 89)
    )
      return "Stage 1 Hypertension";
    if (systolic >= 140 || diastolic >= 90) return "Stage 2 Hypertension";
    if (systolic > 180 || diastolic > 120) return "Hypertensive Crisis";
    return "Unknown";
  };

  const getBPCategoryColor = (category) => {
    switch (category) {
      case "Normal":
        return "#4CAF50"; // Green
      case "Elevated":
        return "#FFC107"; // Amber
      case "Stage 1 Hypertension":
        return "#FF9800"; // Orange
      case "Stage 2 Hypertension":
        return "#F44336"; // Red
      case "Hypertensive Crisis":
        return "#B71C1C"; // Dark Red
      default:
        return "#9E9E9E"; // Grey
    }
  };

  const getSleepRecommendation = (hours) => {
    const hourNum = parseFloat(hours);
    if (hourNum < 6) {
      return "Sleep deficiency may contribute to high blood pressure. Aim for 7-9 hours of quality sleep per night.";
    } else if (hourNum > 9) {
      return "Excessive sleep can be associated with cardiovascular issues. Aim for 7-9 hours of quality sleep per night.";
    } else {
      return "Your sleep duration is within the recommended range (7-9 hours). Continue maintaining good sleep hygiene.";
    }
  };

  const getStressRecommendation = (level) => {
    const stressNum = parseInt(level);
    if (stressNum >= 7) {
      return "High stress may contribute to elevated blood pressure. Consider stress management techniques like meditation, deep breathing exercises, or yoga.";
    } else if (stressNum >= 4 && stressNum <= 6) {
      return "Moderate stress levels may affect your blood pressure. Regular relaxation techniques could be beneficial.";
    } else {
      return "Your stress levels appear to be well-managed, which is positive for blood pressure control.";
    }
  };

  const getHeartRateRecommendation = (rate, age) => {
    const rateNum = parseInt(rate);
    let ageGroup = ageGroups.find((group) => group.value === age);
    let ageValue = ageGroup.min;

    const maxHeartRate = 220 - ageValue;
    const restingTarget = [60, 100];

    if (rateNum < restingTarget[0]) {
      return "Your resting heart rate is below normal range, which may indicate excellent cardiovascular fitness but could also be a concern. Consult with a healthcare provider.";
    } else if (rateNum > restingTarget[1]) {
      return "Your resting heart rate is elevated, which can strain your cardiovascular system. Consider cardiovascular exercise and consult a healthcare provider.";
    } else {
      return "Your resting heart rate is within normal range (60-100 bpm), which is good for cardiovascular health.";
    }
  };

  const getLifestyleRecommendations = () => {
    const recommendations = [];

    if (
      bpData.exerciseFrequency === "none" ||
      bpData.exerciseFrequency === "low"
    ) {
      recommendations.push(
        "Increase physical activity to at least 150 minutes of moderate exercise per week (e.g., brisk walking, swimming, cycling)."
      );
    }

    if (
      bpData.smokingStatus === "occasional" ||
      bpData.smokingStatus === "regular"
    ) {
      recommendations.push(
        "Quit smoking to reduce cardiovascular risk and help lower blood pressure."
      );
    }

    if (
      bpData.alcoholConsumption === "moderate" ||
      bpData.alcoholConsumption === "heavy"
    ) {
      recommendations.push(
        "Reduce alcohol consumption to no more than 1 drink per day for women or 2 drinks per day for men."
      );
    }

    if (bpData.saltIntake === "high") {
      recommendations.push(
        "Reduce sodium intake to less than 2,300mg per day (about 1 teaspoon of salt) by limiting processed foods and adding less salt while cooking."
      );
    }

    const bmi = calculateBMI();
    if (bmi && bmi >= 25) {
      recommendations.push(
        `Work on achieving a healthy weight through diet and exercise, as your BMI of ${bmi} indicates ${getBMICategory(bmi)}.`
      );
    }

    return recommendations;
  };

  const analyzeBpData = () => {
    const {
      gender,
      age,
      systolic,
      diastolic,
      heartRate,
      sleepHours,
      stressLevel,
    } = bpData;

    if (!gender || !age || !systolic || !diastolic) {
      toast.warning("⚠️ Please fill in all required blood pressure fields.");
      return;
    }

    if (parseInt(systolic) < 70 || parseInt(systolic) > 200) {
      toast.error("❌ Systolic pressure seems out of normal range (70-200).");
      return;
    }

    if (parseInt(diastolic) < 40 || parseInt(diastolic) > 120) {
      toast.error("❌ Diastolic pressure seems out of normal range (40-120).");
      return;
    }

    if (heartRate && (parseInt(heartRate) < 40 || parseInt(heartRate) > 200)) {
      toast.error("❌ Heart rate seems out of normal range (40-200).");
      return;
    }

    const riskFactors = [];

    if (age === "50-59" || age === "60+") {
      riskFactors.push("Age (increased risk after age 50)");
    }

    const bmi = calculateBMI();
    if (bmi && bmi >= 25) {
      riskFactors.push(`Elevated BMI (${bmi} - ${getBMICategory(bmi)})`);
    }

    if (
      sleepHours &&
      (parseFloat(sleepHours) < 6 || parseFloat(sleepHours) > 9)
    ) {
      riskFactors.push(`Suboptimal sleep duration (${sleepHours} hours)`);
    }

    if (stressLevel && parseInt(stressLevel) >= 7) {
      riskFactors.push(`High stress level (${stressLevel}/10)`);
    }

    if (bpData.exerciseFrequency === "none") {
      riskFactors.push("Physical inactivity");
    }

    if (bpData.smokingStatus === "regular") {
      riskFactors.push("Regular smoking");
    }

    if (bpData.alcoholConsumption === "heavy") {
      riskFactors.push("Heavy alcohol consumption");
    }

    if (bpData.saltIntake === "high") {
      riskFactors.push("High sodium intake");
    }

    const bpCategory = getBloodPressureCategory(
      parseInt(systolic),
      parseInt(diastolic)
    );

    let recommendations = [];

    if (sleepHours) {
      recommendations.push(getSleepRecommendation(sleepHours));
    }

    if (stressLevel) {
      recommendations.push(getStressRecommendation(stressLevel));
    }

    if (heartRate) {
      recommendations.push(getHeartRateRecommendation(heartRate, age));
    }

    const lifestyleRecs = getLifestyleRecommendations();
    recommendations = [...recommendations, ...lifestyleRecs];

    const result = {
      gender,
      age: ageGroups.find((group) => group.value === age).label,
      systolic,
      diastolic,
      heartRate: heartRate || "Not provided",
      sleepHours: sleepHours || "Not provided",
      stressLevel: stressLevel || "Not provided",
      bmi: bmi || "Not calculated",
      bmiCategory: bmi ? getBMICategory(bmi) : "Unknown",
      bpCategory,
      riskFactors:
        riskFactors.length > 0
          ? riskFactors
          : ["No significant risk factors identified"],
      recommendations:
        recommendations.length > 0
          ? recommendations
          : ["Maintain your current healthy lifestyle"],
    };

    setAnalysisResult(result);
    toast.success("✅ Blood pressure data analyzed successfully!");
  };

  const handlePrint = () => {
    const printContent = document.getElementById("bp-printable");
    const WinPrint = window.open('', '', 'width=900,height=650');
    WinPrint.document.write(`
      <html>
        <head>
          <title>Print Blood Pressure Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .section-title { font-size: 20px; margin-top: 20px; }
            .bp-number { font-weight: bold; font-size: 18px; }
            .result-section ul { margin-top: 0; }
          </style>
        </head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  };
  
  const handleShare = () => {
    const element = document.getElementById("bp-printable");
  
    // Step 1: Hide buttons before generating canvas
    const actionButtons = document.querySelector(".action-buttons");
    const analyzeButton = document.querySelector(".analyze-button");
  
    if (actionButtons) actionButtons.style.display = "none";
    if (analyzeButton) analyzeButton.style.display = "none";
  
    html2canvas(element, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });
  
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageWidth = pdf.internal.pageSize.getWidth();
  
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pageWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
  
      let heightLeft = imgHeight;
      let position = 0;
  
      // Step 2: Generate multipage PDF
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      const pdfBlob = pdf.output("blob");
      const file = new File([pdfBlob], "Blood_Pressure_Analysis.pdf", {
        type: "application/pdf",
      });
  
      // Step 3: Share if supported
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator
          .share({
            title: "My Blood Pressure Analysis",
            text: "Check out my health report",
            files: [file],
          })
          .catch((err) => console.error("Share failed:", err));
      } else {
        pdf.save("Blood_Pressure_Analysis.pdf");
        toast.info("Sharing is not supported on this device, so the PDF was downloaded.");
      }
  
      // Step 4: Restore buttons after sharing
      if (actionButtons) actionButtons.style.display = "";
      if (analyzeButton) analyzeButton.style.display = "";
    });
  };
  
  
  
  
  if (!navigator.canShare) {
    toast.info("Sharing is not supported on this browser.");
  }
    
  

  return (
     
        <div id="bp-printable" className="main-card">
      
        <div className="data-card1">
          <h2 className="data-title">Analyze Your Blood Pressure</h2>
          <p className="data-subtitle">
            Enter your details to analyze your blood pressure data and receive
            personalized recommendations
          </p>

          <div className="data-form">
            <h3 className="form-title">Blood Pressure Analysis</h3>

            <div className="input-group">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={bpData.gender}
                onChange={handleBpChange}
                required
                className="form-control"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="bp-age-group">Age Group:</label>
              <select
                id="bp-age-group"
                name="age"
                value={bpData.age}
                onChange={handleBpChange}
                required
                className="form-control"
              >
                {ageGroups.map((group, index) =>
                  group.value ? (
                    <option key={group.value} value={group.value}>
                      {group.label}
                    </option>
                  ) : (
                    <option key="placeholder" value="" disabled>
                      Select Age Group
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="bp-height">Height:</label>
              <div className="height-input-group">
                <input
                  type="number"
                  id="bp-height"
                  name="height"
                  value={bpData.height}
                  onChange={handleBpChange}
                  min="0"
                  max="300"
                  placeholder="Enter height"
                  className="height-input"
                />
                <select
                  name="heightUnit"
                  value={bpData.heightUnit}
                  onChange={handleBpChange}
                  className="height-unit-select"
                >
                  <option value="cm">Centimeters (cm)</option>
                  <option value="inch">Inches (in)</option>
                  <option value="meter">Meters (m)</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="bp-weight">Weight:</label>
              <div className="height-input-group">
                <input
                  type="number"
                  id="bp-weight"
                  name="weight"
                  value={bpData.weight}
                  onChange={handleBpChange}
                  min="0"
                  placeholder="Enter weight"
                  className="height-input"
                />
                <select
                  name="weightUnit"
                  value={bpData.weightUnit}
                  onChange={handleBpChange}
                  className="height-unit-select"
                >
                  <option value="kg">Kilograms (kg)</option>
                  <option value="lb">Pounds (lb)</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Sleep Hours:</label>
              <input
                type="number"
                name="sleepHours"
                value={bpData.sleepHours}
                onChange={handleBpChange}
                placeholder="Enter Sleep Hours"
                className="form-control"
                min="0"
                max="24"
                step="0.5"
              />
            </div>

            <div className="input-group">
              <label>Stress Level (1-10):</label>
              <input
                type="number"
                name="stressLevel"
                value={bpData.stressLevel}
                onChange={handleBpChange}
                placeholder="Enter Stress Level"
                className="form-control"
                min="1"
                max="10"
              />
            </div>

            <div className="input-group">
              <label>Exercise Frequency:</label>
              <select
                name="exerciseFrequency"
                value={bpData.exerciseFrequency}
                onChange={handleBpChange}
                className="form-control"
              >
                {exerciseOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Smoking Status:</label>
              <select
                name="smokingStatus"
                value={bpData.smokingStatus}
                onChange={handleBpChange}
                className="form-control"
              >
                {smokingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Alcohol Consumption:</label>
              <select
                name="alcoholConsumption"
                value={bpData.alcoholConsumption}
                onChange={handleBpChange}
                className="form-control"
              >
                {alcoholOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Salt Intake:</label>
              <select
                name="saltIntake"
                value={bpData.saltIntake}
                onChange={handleBpChange}
                className="form-control"
              >
                {saltOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Systolic (mmHg):</label>
              <input
                type="number"
                name="systolic"
                value={bpData.systolic}
                onChange={handleBpChange}
                placeholder="Enter systolic pressure"
                className="form-control"
                required
              />
            </div>

            <div className="input-group">
              <label>Diastolic (mmHg):</label>
              <input
                type="number"
                name="diastolic"
                value={bpData.diastolic}
                onChange={handleBpChange}
                placeholder="Enter diastolic pressure"
                className="form-control"
                required
              />
            </div>

            <div className="input-group">
              <label>Heart Rate (bpm):</label>
              <input
                type="number"
                name="heartRate"
                value={bpData.heartRate}
                onChange={handleBpChange}
                placeholder="Enter heart rate"
                className="form-control"
              />
            </div>

            <button className="analyze-button" onClick={analyzeBpData}>
              Analyze Blood Pressure
            </button>
          </div>
          {analysisResult && (
          <div className="result-card">
            <h2 className="card-title">Blood Pressure Analysis Results</h2>

            <div
              className="bp-category-banner"
              style={{
                backgroundColor: getBPCategoryColor(analysisResult.bpCategory),
                color: "white",
                padding: "10px 15px",
                borderRadius: "5px",
                marginBottom: "20px",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              {analysisResult.bpCategory}
            </div>

            <div className="">
              <div className="result-section bp-reading">
                <h3 className="section-title">Your BP Reading</h3>
                <div className="bp-display">
                  <div className="bp-number systolic">
                    <span className="value">{analysisResult.systolic}</span>
                    <span className="label">Systolic</span>
                  </div>
                  <div className="bp-separator">/</div>
                  <div className="bp-number diastolic">
                    <span className="value">{analysisResult.diastolic}</span>
                    <span className="label">Diastolic</span>
                  </div>
                  <div className="bp-unit">mmHg</div>
                </div>
              </div>

              <div className="result-section vital-stats">
                <h3 className="section-title">Your Vital Statistics</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Gender</span>
                    <span className="stat-value">{analysisResult.gender}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Age Group</span>
                    <span className="stat-value">{analysisResult.age}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">BMI</span>
                    <span className="stat-value">
                      {analysisResult.bmi} ({analysisResult.bmiCategory})
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Heart Rate</span>
                    <span className="stat-value">{analysisResult.heartRate}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Sleep Hours</span>
                    <span className="stat-value">
                      {analysisResult.sleepHours}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Stress Level</span>
                    <span className="stat-value">
                      {analysisResult.stressLevel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="result-section risk-factors">
                <h3 className="section-title">Identified Risk Factors</h3>
                <ul className="risk-list">
                  {analysisResult.riskFactors.map((factor, index) => (
                    <li key={index} className="risk-item">
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

             
            </div>
            <div className="result-section recommendations">
                <h3 className="section-title">Personalized Recommendations</h3>
                <ul className="recommendation-list">
                  {analysisResult.recommendations.map((recommendation, index) => (
                    <li key={index} className="recommendation-item">
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </div>

            <div className="action-buttons  no-print">
              <button className="action-button print-button" onClick={handlePrint}>
                Print Results
              </button>
              <button className="action-button share-button" onClick={handleShare}>
                Share Results
              </button>
            </div>
          </div>
        )}
        </div>

      


<div className="data-card2">
            <h2 className="card-title">
             
              Understanding Blood Pressure 
              
            </h2>
            <div className="card-content">
              <div className="card-info">
                
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
           
              </div>
            </div>
          </div>
      
      </div>
  
  );
};

export default BloodPressure;
