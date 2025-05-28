import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MyContext } from "../App";

const DiabetesRiskAssessment = () => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [bmiCategory, setBmiCategory] = useState(null);
  const [diabetesRisk, setDiabetesRisk] = useState(null);
  const [stepsSuggestion, setStepsSuggestion] = useState(null);
  const [bloodSugar, setBloodSugar] = useState("");
  const { currentdata } = useContext(MyContext) || { currentdata: null };

  useEffect(() => {
    if (height && weight) {
      const heightInMeters = convertToCentimeters(height, heightUnit) / 100;
      const calculatedBMI = (
        weight /
        (heightInMeters * heightInMeters)
      ).toFixed(1);
      setBMI(calculatedBMI);
      setBmiCategory(getBmiCategory(calculatedBMI));
    }
  }, [height, weight, heightUnit]);

  useEffect(() => {
    if (currentdata?.bloodSugarLevel) {
      setBloodSugar(currentdata.bloodSugarLevel.toString());
    }
  }, [currentdata]);

  const calculateDiabetesRisk = () => {
    // ...existing diabetes risk calculation logic...
    toast.success("✅ Diabetes risk assessment completed!");
  };

  return (
    <div className="data-form diabetes-form">
      <h3 className="form-title">Diabetes Risk Assessment</h3>
      {/* ...existing diabetes form fields... */}
      <button className="analyze-button" onClick={calculateDiabetesRisk}>
        Calculate Risk
      </button>
      {/* ...existing result and suggestion rendering... */}
    </div>
  );
};

export default DiabetesRiskAssessment;
