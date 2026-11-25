# Employee Dashboard

A full-stack Employee Management Dashboard built using **Node.js, Express, MongoDB, Mongoose, JavaScript, and Tailwind CSS**.

The application allows users to manage employee records through a simple dashboard interface. It supports creating employees, generating sample employee data, viewing employee records, deleting individual employees, and resetting the employee collection.

🚀 **Live Demo:** [Employee Dashboard](https://employee-dashboard-1pa4.onrender.com)

---

## Features

- **View Employees** — Fetch and display employee records stored in MongoDB.
- **Add Employees** — Create employee records through a form.
- **Generate Sample Data** — Generate multiple sample employees with randomized details.
- **Delete Employees** — Remove individual employee records.
- **Reset Employees** — Delete all employee documents from the collection.
- **Search Employees** — Search and filter employee records on the frontend.
- **Persistent Database** — Employee data is stored in MongoDB Atlas.
- **Responsive Interface** — Dashboard styled using Tailwind CSS.

---

## Tech Stack

### Frontend
- HTML5
- Tailwind CSS
- JavaScript
- Fetch API

### Backend
- Node.js
- Express.js
- Mongoose

### Database
- MongoDB Atlas

### Deployment
- Render
- GitHub

---

## Project Structure

```text
Employee-Dashboard/
├── app.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
│
├── models/
│   └── model.js
│
├── src/
│   └── input.css
│
└── public/
    ├── index.html
    ├── output.css
    ├── style.css
    └── script.js
```

---

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone https://github.com/shenofsin/Employee-Dashboard.git
```

Navigate into the project directory:

```bash
cd Employee-Dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your MongoDB connection URI.

For example, a local MongoDB connection can use:

```env
MONGO_URI=mongodb://127.0.0.1:27017/CompanyDB
```

Alternatively, use a MongoDB Atlas connection string.

**Never commit your `.env` file or expose your database credentials.**

### 4. Build Tailwind CSS

Generate the CSS file:

```bash
npm run build
```

This generates the production stylesheet at:

```text
public/output.css
```

### 5. Start the application

```bash
npm start
```

Open the application in your browser:

```text
http://localhost:3000
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Starts the Express server |
| `npm run build` | Builds the Tailwind CSS stylesheet |
| `npm run tailwind` | Runs Tailwind CSS in watch mode during development |

---

## API Endpoints

The backend provides the following API routes:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/employees` | Retrieve all employees |
| `POST` | `/employees` | Create a new employee |
| `POST` | `/generate` | Generate sample employees |
| `DELETE` | `/employees/:id` | Delete an employee by ID |
| `DELETE` | `/reset` | Delete all employee documents |

### Example Employee Object

```json
{
  "name": "Jason Rai",
  "salary": 50000,
  "language": "JavaScript",
  "city": "Siliguri",
  "isManager": false
}
```

---

## Database

The application uses MongoDB with Mongoose for database operations.

Employee records are stored in the `employees` collection.

The database connection is configured through the `MONGO_URI` environment variable.

When connected to MongoDB Atlas, employee records persist in the cloud and can be accessed by both the local application and the deployed application if they use the same database.

---

## Deployment

The application is deployed on **Render**.

The frontend and backend are hosted together as a single Express application.

### Render Configuration

| Setting | Value |
|---|---|
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Environment | Node.js |

The following environment variable must be configured in Render:

```env
MONGO_URI=your_mongodb_atlas_connection_string
```

The deployed application connects to MongoDB Atlas for persistent employee data.

---

## Error Handling

The application includes basic error handling for API requests.

- Frontend requests check `response.ok` to detect unsuccessful HTTP responses.
- Asynchronous fetch operations use `try...catch`.
- Express error middleware handles malformed JSON requests.
- API routes return JSON responses with appropriate HTTP status codes.

---

## Future Improvements

- Update employee details
- Employee authentication and authorization
- Pagination for employee records
- Improved form validation
- Employee sorting and advanced filtering
- Dashboard analytics and charts
- Better loading states and notifications
- Improved production error handling

---

## Learning Outcomes

This project helped me practice:

- Building REST API endpoints using Express
- Performing CRUD operations with MongoDB and Mongoose
- Connecting a Node.js application to MongoDB Atlas
- Serving frontend files through Express
- Using the Fetch API for frontend-backend communication
- Handling asynchronous requests and errors
- Building CSS using Tailwind CLI
- Managing environment variables
- Deploying a full-stack application using Render
- Understanding the relationship between GitHub, hosting, and databases

---

## Author

**Jason Rai**

B.Tech Computer Science and Engineering

[GitHub](https://github.com/shenofsin)
