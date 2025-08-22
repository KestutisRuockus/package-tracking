# Package Management System

## Description

#### A Web application allowing users to create packages, track their status throughout the delivery process, and manage package information with appropriate status transitions. The project is built using React + TypeScript frontend and ASP.NET Core Web API backend with EF Core InMemory database.

## Key Features

### Package List:

- View all packages in the system
- Create a new package
- Quick action buttons for status updates with rules enforcement
- Filter by status or tracking number

### Package Details:

- Full package information
- Available status transitions with confirmation dialogs
- Status history with timestamps

### Create Package:

- Page for creating a new package
- Enter sender and recipient information. Other values as id and tracking number will be created automatically.

## Technologies Used

- **Frontend**: React, TypeScript, Vite, TailwindCSS, React-Toastify, React-Chrono
- **Backend**: ASP.NET Core Web API
- **Database**: EF Core InMemory

## Installation

#### 1: Clone the repository to your local machine:

<div style="border: 2px solid #333; border-radius: 5px; padding: 10px; background-color: #2d2d2d; color: #f1f1f1; font-family: 'Courier New', Courier, monospace;">
  <span style="color: #f4f4f4; font-weight: bold;">bash</span><br>
  <br>
  <span style="color: #66d9ef;">$</span> git clone https://github.com/KestutisRuockus/package-tracking.git<br>
</div>

#### 2: Navigate to the backend folder and run the backend:

<div style="border: 2px solid #333; border-radius: 5px; padding: 10px; background-color: #2d2d2d; color: #f1f1f1; font-family: 'Courier New', Courier, monospace;">
  <span style="color: #f4f4f4; font-weight: bold;">bash</span><br>
  <br>
  <span style="color: #66d9ef;">$</span> cd backend<br>
  <span style="color: #66d9ef;">$</span> dotnet run<br>
</div>

#### 3: Navigate to the frontend folder, install dependencies, and start the development server:

<div style="border: 2px solid #333; border-radius: 5px; padding: 10px; background-color: #2d2d2d; color: #f1f1f1; font-family: 'Courier New', Courier, monospace;">
  <span style="color: #f4f4f4; font-weight: bold;">bash</span><br>
  <br>
  <span style="color: #66d9ef;">$</span> cd frontend<br>
  <span style="color: #66d9ef;">$</span> npm install<br>
  <span style="color: #66d9ef;">$</span> npm run dev<br>
</div>

#### 4: Your app should now be live at http://localhost:5173

Note: Backend runs on localhost with a port defined in launchSettings.json.
