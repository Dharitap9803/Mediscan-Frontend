# Health Tracker

Health Tracker is a sophisticated website platform designed to empower individuals to monitor and manage their health through detailed, data-driven insights. This dekstop application offers a centralized dashboard that consolidates vital health metrics such as steps, calories burned, workout duration, diabetes level, blood pressure, blood oxygen, stress, sleep, and more.

## Live Demo

You can view the live demo of the application [here](https://frontend-smoky-gamma-76.vercel.app).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
  - [Frontend Environment Variables](#frontend-environment-variables)
  - [Backend Environment Variables](#backend-environment-variables)
- [Code Explanation](#code-explanation)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Admin Features](#admin-features)
- [About](#about)

## Features

- **Dashboard Page**: Displays an overview of key metrics like steps, calories burned, and workout duration using circular progress bars, plus 4 health cards (Blood Pressure, Diabetes, Blood Oxygen, Weight/Height) with visual graphs and a summary section.
- **Step Tracker Page**: Shows user's step data for daily, weekly, and monthly periods with a summary graph, maximum/minimum step count, and insightful tracking metrics.
- **Heartbeat Rate Page**: Monitors pulse readings with daily/weekly/monthly graphs and a breakdown of average, highest, and lowest heartbeat rates.
- **Sleep Hours Page**: Tracks sleep duration trends with detailed analysis of sleep quality across days, weeks, and months, and provides recovery suggestions.
- **Stress Level Page**: Displays stress patterns and critical highs using visual graphs; offers insights on stress management with data-driven suggestions.
- **Calorie Burn Page**: Shows calories burned over time, highlights workout effectiveness, and includes recommendations for improved fitness planning.
- **Blood Pressure Page**: Accepts systolic/diastolic input with contextual data like sleep and stress; provides BP classification, risk identification, and health advice per category (e.g., Stage 1, Hypertensive Crisis).
- **Diabetes Page**: Takes age, height, weight, and sugar levels to calculate BMI and categorize diabetes stage; generates lifestyle recommendations and diet/exercise tips.
- **Weight & Height Page**: Tracks BMI, weight fluctuation, and health classification (underweight, normal, overweight, obese) using bar and line graphs for trend comparison.
- **Blood Oxygen Page**: Analyses oxygen saturation levels with visual patterns and alerts if readings fall outside the healthy range.
- **Data Analysis Page**: Provides combined summary of all tracked metrics with graphs, maximum and minimum values, and health trend visualization.
- **Upload Page - Parameter Input Upload**: Allows users to manually upload text-based or structured input data (e.g., blood pressure, sugar, sleep, stress levels) in CSV or form format. This data is directly used for analyzing health conditions like BP or Diabetes through graphs and personalized insights.
- **Medical Report Upload & Analyzer Page**: Users can upload scanned medical reports in image or PDF format. The system uses OCR (Optical Character Recognition) to extract relevant health information and provides user-friendly, summarized results with medical insights and improvement suggestions.
- **Profile Page**: Displays user's personal, general, and medical details with editable sections to update health records.
- **Contact Us Page**: Offers direct communication for user queries, website feedback, or issues through an in-built contact form.
- **Authentication System (Sign-Up/Sign-In)**: Only registered users can access all features; new users can access limited pages (Medical Report Analyzer, Profile, Contact, Data Analysis).
- **Logout Feature**: Registered users can securely log out to end their session and protect data access.

## Technologies Used

### Frontend

- **React.js**: A JavaScript library for building user interfaces.
- **CSS**: Cascading Style Sheets for styling.
- **Email.js**: For sending contact emails and user queries directly from the contact portal.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **MongoDB**: A NoSQL database used to store user health data in a structured, flexible, and scalable manner.

### APIs and Integrations

- **OpenAI API**: For generating intelligent insights and summaries from uploaded medical reports.
- **Email.js**: For communication services.

## Setup

## Frontend Setup

### 1. Clone the repositories:

**Frontend:**
```bash
git clone https://github.com/Dharitap9803/frontend.git
cd frontend
npm install
```

**Backend:**
```bash
git clone https://github.com/Dharitap9803/backend.git
cd backend
npm install
```

---

### 2. Install dependencies:
```bash
npm install
```

---

### 3. Create a `.env` file in the `frontend` directory and add the following environment variables:

```env
VITE_BACKEND_URL="Your backend url"
VITE_FRONTEND_URL="Your frontend url"
VITE_EMAILJS_SERVICE_ID=""
VITE_EMAILJS_TEMPLATE_ID=""
VITE_EMAILJS_PUBLIC_KEY=""
```

---

### 4. Start the development server:

```bash
npm start
```

---

## Backend Setup

### 1. Navigate to the backend directory:

```bash
cd server
```

---

### 2. Install dependencies:

```bash
npm install
```

---

### 3. Create a `.env` file in the `backend` directory and add the following environment variables:

```env
MONGO_URI_Production=""
JWT_SECRET=""
PORT="" 
MONGO_URI=""
```

---

### 4. Start the backend server:

```bash
npm start
```

---

## Update Health Data

- **Endpoint:** `/api/health`  
- **Method:** `PUT`  
- **Description:** Updates health data for a user.  
- **Function:** `updateHealthData`  

**Usage Example:**

```javascript
const updatedData = { steps: 5000, calories: 2000 };
const response = await updateHealthData(userId, updatedData);
```

---

## Environment Variables

### Frontend Environment Variables

```env
VITE_BACKEND_URL=""
VITE_FRONTEND_URL=""
VITE_EMAILJS_SERVICE_ID=""
VITE_EMAILJS_TEMPLATE_ID=""
VITE_EMAILJS_PUBLIC_KEY=""
```

### Backend Environment Variables

```env
MONGO_URI_Production=""
JWT_SECRET=""
PORT=""
MONGO_URI=""
```


## Code Explanation

### Frontend

- **Home Page**  
  Displays a welcome message along with an overview of the Health Tracker features.

- **User Profile Page**  
  Allows users to view and update their personal information.

- **Dashboard Page**  
  Shows key health metrics using circular progress bars and interactive health cards.

- **Step Tracker Page**  
  Visualizes user's step data across daily, weekly, and monthly timelines.

- **Heartbeat Rate Page**  
  Monitors pulse readings with dynamic graphs for daily, weekly, and monthly views.

- **Sleep Hours Page**  
  Tracks trends in sleep duration and offers detailed insights.

- **Stress Level Page**  
  Displays stress levels using visual graphs and highlights critical patterns.

- **Calorie Burn Page**  
  Shows calories burned over time and provides tailored fitness recommendations.

- **Blood Pressure Page**  
  Collects systolic/diastolic inputs and correlates them with sleep and stress metrics.

- **Diabetes Page**  
  Takes user’s age, height, weight, and sugar levels to compute BMI and classify diabetes stage.

- **Weight & Height Page**  
  Tracks BMI, weight fluctuation, and provides health classification insights.

- **Blood Oxygen Page**  
  Analyzes oxygen saturation levels and presents trends using graphs.

- **Data Analysis Page**  
  Offers a combined summary of all health metrics with interactive visualizations.

- **Upload Page**  
  Enables users to manually upload health data in text or structured format.

- **Medical Report Upload & Analyzer Page**  
  Allows uploading of scanned medical reports (image or PDF) for automated analysis.

- **Profile Page**  
  Displays user's personal, general, and medical information in editable form.

- **Contact Us Page**  
  Provides a communication channel for feedback, queries, or issue reporting.

- **Authentication System**  
  Grants full feature access only to registered users; new users have limited access.

- **Logout Feature**  
  Enables registered users to securely end their session and protect personal data.


## Backend

### API Endpoints

- **`/api/users`**  
  Handles creating, retrieving, updating, and deleting user data.

- **`/api/health`**  
  Manages all health-related data entries and performs analysis.

- **`/api/admin`**  
  Provides admin-specific operations such as retrieving all health records and managing user roles.

---

### Admin Features

#### User Management

- **User List**  
  Displays a table of users with the following columns:  
  - Name  
  - Email  
  - Sign-Up Date  
  - Last Logged-In Date  
  - Role  
  - Number of Health Reports  

- **Actions**  
  Each user row includes buttons to:
  - Delete User  
  - Disable Account  

---

#### Health Data Management

- **Health Data List**  
  Displays all health reports with filtering options based on:
  - Category  
  - Status  
  - Date  

- **Update Status**  
  Admins can update the status of health data (e.g., `Pending`, `In-Progress`, `Resolved`).

- **Detailed View**  
  Shows comprehensive information about each report, including:
  - Uploaded images  
  - Associated tags  

#### Admin Dashboard

- **Reports per Month**  
  A bar chart visualizing the number of submitted reports for the past 6 months.

- **Reports by Type**  
  A doughnut chart illustrating the distribution of report categories (e.g., Blood Pressure, Diabetes).

- **Case Status Overview**  
  Displays the current status of cases in three categories:
  - Red: Unresolved Cases  
  - Yellow: Cases Under Progress  
  - Green: Resolved Cases  

## About the Project

**Health Tracker** is a web-based application built to help users actively monitor and manage their health through comprehensive, data-driven insights.  
It includes:

- A **public-facing frontend** for users to track, upload, and view health metrics.
- A **dedicated admin panel** to review submitted reports, manage users, and oversee platform-wide health trends.

This system bridges individual health tracking with centralized monitoring to ensure users get real-time, actionable feedback while admins maintain system integrity and insights.

## Screenshots

### Home Page
![Home Page](https://github.com/Dharitap9803/Mediscan-Frontend/blob/3358f1e67b74c77d4070ed118dbf1db846e90101/src/assets/images/mainpage.jpeg?raw=true)

### Blood Pressure Analysis
![Blood Pressure Analysis](https://github.com/Dharitap9803/Mediscan-Frontend/blob/3358f1e67b74c77d4070ed118dbf1db846e90101/src/assets/images/bloodpressureanalysis.jpg?raw=true)

### Diabetes Analysis
![Diabetes Analysis](https://github.com/Dharitap9803/Mediscan-Frontend/blob/3358f1e67b74c77d4070ed118dbf1db846e90101/src/assets/images/Diabetesanalysis.jpg?raw=true)

### Flow Diagram
![Flow Diagram](https://github.com/Dharitap9803/Mediscan-Frontend/blob/3358f1e67b74c77d4070ed118dbf1db846e90101/src/assets/images/flowdiagram.jpeg?raw=true)


