# Health Tracker

Health Tracker is a sophisticated website platform designed to empower individuals to monitor and manage their health through detailed, data-driven insights. This application offers a centralized dashboard that consolidates vital health metrics such as steps, calories burned, workout duration, diabetes level, blood pressure, blood oxygen, stress, sleep, and more.

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

### Frontend Setup

1. Clone the repositories:
Frontend:

git clone[ https://github.com/Dharitap9803/frontend.git](https://github.com/Dharitap9803/frontend)
cd frontend
npm install

Backend:

git clone [https://github.com/Dharitap9803/backend.git](https://github.com/Dharitap9803/backend)
cd backend
npm install

2.Install dependencies:
npm install

3. Create a .env file in the frontend directory and add the following environment variables:
Copy
VITE_BACKEND_URL="Your backend url"

VITE_FRONTEND_URL="your frontend url"

VITE_EMAILJS_SERVICE_ID=""

VITE_EMAILJS_TEMPLATE_ID=""

VITE_EMAILJS_PUBLIC_KEY=""

5. Start the development server:
npm start

Backend Setup
1.Navigate to the backend directory:
cd server

2.Install dependencies:
npm install

3.Create a .env file in the backend directory and add the following environment variables:
MONGO_URI_Production=""

JWT_SECRET=""

PORT="" 

MONGO_URI=""

4.Start the backend server:
npm start

Update Health Data

Endpoint: /api/health
Method: PUT
Description: Updates health data for a user.
Function: updateHealthData

Usage:
const updatedData = { steps: 5000, calories: 2000 };
const response = await updateHealthData(userId, updatedData);
Environment Variables

Frontend Environment Variables
VITE_BACKEND_URL=""
VITE_FRONTEND_URL=""
VITE_EMAILJS_SERVICE_ID=""
VITE_EMAILJS_TEMPLATE_ID=""
VITE_EMAILJS_PUBLIC_KEY=""

Backend Environment Variables
MONGO_URI_Production="mongodb+srv://dharitapatel:Dsku_098311@cluster.brenp8y.mongodb.net/healthcare?retryWrites=true&w=majority"
JWT_SECRET="Beauty"
PORT="3001" 
MONGO_URI=""

Code Explanation
Frontend
Home Page: Displays a welcome message along with an overview of the Health Tracker features.

User Profile Page: Allows users to view and update their personal information.

Dashboard Page: Displays an overview of key health metrics using circular progress bars and health cards.

Step Tracker Page: Shows user's step data for daily, weekly, and monthly periods.

Heartbeat Rate Page: Monitors pulse readings with daily/weekly/monthly graphs.

Sleep Hours Page: Tracks sleep duration trends with detailed analysis.

Stress Level Page: Displays stress patterns and critical highs using visual graphs.

Calorie Burn Page: Shows calories burned over time and includes recommendations for improved fitness planning.

Blood Pressure Page: Accepts systolic/diastolic input with contextual data like sleep and stress.

Diabetes Page: Takes age, height, weight, and sugar levels to calculate BMI and categorize diabetes stage.

Weight & Height Page: Tracks BMI, weight fluctuation, and health classification.

Blood Oxygen Page: Analyses oxygen saturation levels with visual patterns.

Data Analysis Page: Provides combined summary of all tracked metrics with graphs.

Upload Page: Allows users to manually upload text-based or structured input data.

Medical Report Upload & Analyzer Page: Users can upload scanned medical reports in image or PDF format.

Profile Page: Displays user's personal, general, and medical details with editable sections.

Contact Us Page: Offers direct communication for user queries, website feedback, or issues.

Authentication System: Only registered users can access all features; new users can access limited pages.

Logout Feature: Registered users can securely log out to end their session and protect data access.

Backend
API Endpoints:
/api/users: Handles creating, retrieving, updating, and deleting users.
/api/health: Manages health data and analysis.
/api/admin: Provides admin-specific operations such as retrieving all health data and managing user roles.
Admin Features

User Management
User List: Displays a table with columns for Name, Email, Sign-Up Date, Last Logged-In Date, Role, and Number of Health Reports.
Actions: Each row has buttons for deleting and disabling user accounts.

Health Data Management
Health Data List: Displays a list of all health data with filters for category, status, and date.

Update Status: Allows admins to change the status of health data (e.g., pending, in-progress, resolved).

Detailed View: Provides a detailed view of each health data, including images and tags.

Dashboard
Reports per Month: A bar graph displaying the number of reports per month for the past 6 months.

Reports by Type: A doughnut graph displaying the distribution of report types (e.g., Blood Pressure, Diabetes).

Case Status: Three small sections (green, yellow, red) displaying the number of unresolved cases (red), cases under progress (yellow), and resolved cases (green).

About
Health Tracker is a web application designed to allow users to monitor and manage their health through detailed, data-driven insights. The application includes a public-facing frontend for tracking and viewing health metrics and an admin panel for managing reports and users.
