# Employee Management Dashboard

A simple full-stack Employee Management Dashboard built using **Node.js, Express, MongoDB, Mongoose, JavaScript, and Tailwind CSS**.

This project was created as a hands-on learning project to practice backend development, database operations, REST API integration, and frontend DOM manipulation.

## Features

- Generate 10 random employee records
- Display employee details dynamically
- Show employee salary, city, language, and role
- Distinguish Managers and Employees using colored badges
- Search employees by name
- Delete individual employees
- Reset the employee database
- Display employee count
- Show an empty state when no employees are available
- Background image with Tailwind CSS styling

## Tech Stack

**Frontend**
- HTML
- JavaScript
- Tailwind CSS
- Fetch API

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure

```text
EmployeeApp/
├── models/
│   └── model.js
├── public/
│   ├── images/
│   │   └── japan.jpg
│   ├── index.html
│   ├── output.css
│   └── script.js
├── app.js
├── package.json
└── .gitignore
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/shenofsin/employee-management-dashboard.git
```

### 2. Navigate to the project directory

```bash
cd employee-management-dashboard
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start MongoDB

Make sure MongoDB is running locally.

This project uses the `CompanyDB` database.

### 5. Start the server

```bash
node app.js
```

### 6. Open the application

Visit:

http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/employees` | Fetch all employees |
| POST | `/generate` | Generate and insert random employees |
| DELETE | `/employees/:id` | Delete an employee by ID |
| DELETE | `/reset` | Delete all employee records |

## Concepts Practiced

- Creating REST API endpoints using Express
- Connecting MongoDB using Mongoose
- Performing CRUD operations
- Using `insertMany()`, `find()`, and `deleteMany()`
- Using the Fetch API to communicate with the backend
- Dynamically generating HTML using JavaScript
- Using `.map()`, `.filter()`, and `.join()`
- Implementing event delegation
- Working with `data-*` attributes and `dataset`
- Updating the DOM using `innerHTML` and `textContent`
- Styling components using Tailwind CSS

## Future Improvements

- Add employee creation and editing forms
- Improve error handling
- Add form validation
- Add sorting and filtering options
- Improve responsiveness and UI design

---

Built as a learning project while exploring full-stack web development.
