import React, { useState } from "react";
import "../styles/user.css";

const UserProfile = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    height: "",
    weight: "",
    bmi: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    heartRate: "",
    bloodSugar: "",
    cholesterol: "",
    allergies: "",
    medicalConditions: [],
    currentMedications: "",
    smoking: "",
    alcoholConsumption: "",
    exerciseFrequency: "",
    dietaryPreference: "",
    sleepHours: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    emergencyContactRelation: "",
    doctorName: "",
    lastCheckupDate: "",
    surgeriesOrIllnesses: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="profile-container">
      <h2>Welcome, {user.fullName}</h2>
      <div className="profile-card">
        <h3>Your Profile</h3>
        
        <div className="form-group">
        <label>Full Name</label>
        <input type="text" name="fullName" value={user.fullName} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="number" name="email" value={user.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Date Of Birth</label>
          <input type="date" name="lastCheckupDate" value={user.lastCheckupDate} onChange={handleChange} />
        </div>

        <div className="form-group">
            <label>Gender</label>
            <div className="radio-group">
              <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
              <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
              <input type="radio" name="gender" value="Other" onChange={handleChange} /> Other
            </div>
          </div>


        <div className="form-group">
          <label>Blood Group</label>
          <select name="bloodGroup" value={user.bloodGroup} onChange={handleChange}>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div className="form-group">
          <label>Height (cm)</label>
          <input type="number" name="height" value={user.height} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Weight (kg)</label>
          <input type="number" name="weight" value={user.weight} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Blood Pressure (Systolic/Diastolic)</label>
          <input type="number" name="bloodPressureSystolic" placeholder="Systolic" value={user.bloodPressureSystolic} onChange={handleChange} />
          <input type="number" name="bloodPressureDiastolic" placeholder="Diastolic" value={user.bloodPressureDiastolic} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Heart Rate (bpm)</label>
          <input type="number" name="heartRate" value={user.heartRate} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Blood Sugar Level (mg/dL)</label>
          <input type="number" name="bloodSugar" value={user.bloodSugar} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Cholesterol Level (mg/dL)</label>
          <input type="number" name="cholesterol" value={user.cholesterol} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Allergies</label>
          <textarea name="allergies" value={user.allergies} onChange={handleChange}></textarea>
        </div>

        <div className="form-group">
          <label>Current Medications</label>
          <textarea name="currentMedications" value={user.currentMedications} onChange={handleChange}></textarea>
        </div>

        <div className="form-group">
          <label>Emergency Contact Name</label>
          <input type="text" name="emergencyContactName" value={user.emergencyContactName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Emergency Contact Number</label>
          <input type="text" name="emergencyContactNumber" value={user.emergencyContactNumber} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Relationship</label>
          <select name="emergencyContactRelation" value={user.emergencyContactRelation} onChange={handleChange}>
            <option value="">Select Relationship</option>
            <option value="Parent">Parent</option>
            <option value="Spouse">Spouse</option>
            <option value="Sibling">Sibling</option>
            <option value="Friend">Friend</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Doctor's Name</label>
          <input type="text" name="doctorName" value={user.doctorName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Last Health Check-up Date</label>
          <input type="date" name="lastCheckupDate" value={user.lastCheckupDate} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Any Surgeries or Major Illnesses in the Past?</label>
          <textarea name="surgeriesOrIllnesses" value={user.surgeriesOrIllnesses} onChange={handleChange}></textarea>
        </div>

        <button className="update-btn">Update</button>
      </div>
    </div>
  );
};

export default UserProfile;
