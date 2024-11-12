# Gym-Management-System
A Gym Management System for managing members, trainers, classes, workout plans, and member services. This project provides a frontend to interact with the database, where admins can manage member records, enrollments, trainers, emergency contacts, and other gym services.

Features
Add, edit, and view member details.
Enroll members in classes and assign workout plans based on fitness levels.
Restrict members from enrolling in plans for which they don’t meet the fitness level requirement.
Prevent overlapping class schedules.
Manage emergency contacts for members.
Prerequisites
Node.js installed.
PostgreSQL database set up.
Getting Started
1. Clone the Repository
Clone this repository to your local machine:

bash
Copy code
git clone https://github.com/AdityaMahajan1614/Gym-Management-System.git
cd Gym-Management-System
2. Set Up Database
Create the required tables and insert sample data using the provided SQL file.

Open queries.sql.

Run the commands in queries.sql in your PostgreSQL database to create tables, constraints, and sample records:

sql
Copy code
psql -U your_username -d your_database -f queries.sql
3. Configure the Backend
In the server.js file, make sure the PostgreSQL connection settings match your environment. Update these settings as needed:

javascript
Copy code
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});
4. Run the Backend
Start the backend server by running:

bash
Copy code
node server.js
The backend will be available at http://localhost:3001.

5. Running the Frontend
Ensure the backend server is running before starting the frontend.

Navigate to the frontend folder (if it's a separate folder) and install dependencies:

bash
Copy code
npm install
Start the frontend development server:

bash
Copy code
npm start
The frontend will be available at http://localhost:3000.

API Endpoints
Member Services
GET /api/member/:id - Fetch details of a specific member.
POST /api/member - Add a new member to the system.
POST /api/enroll - Enroll a member in a class.
POST /api/emergency_contact - Add an emergency contact for a member.
POST /api/follow_plan - Follow a workout plan if fitness level requirements are met.
Database Triggers
This project includes database triggers to enforce:

Fitness level restrictions for workout plan enrollment.
Prevention of overlapping class schedules.
Troubleshooting
Database Connection Issues: Double-check your PostgreSQL credentials and ensure the database server is running.
API Errors: Ensure the backend server is started and listening on localhost:3001.
Invalid Hook Call Warning: Make sure you have installed the correct versions of React and react-router-dom.
License
This project is licensed under the MIT License.
