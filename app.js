import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import Employee from "./models/model.js";
import path from "path"
import { fileURLToPath } from "url";


const app = express();

if (!process.env.MONGO_URI) {
    console.log("MONGODB_URI is missing");
    process.exit(1);
}
//connect to mongodb
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected");
}
catch (error) {
    console.log("MongoDB failed to connect.", error.message);
    process.exit(1);
}


app.use(express.json());
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));



function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


// defining some sample data : 
const names = [
    "Aarav Sharma",
    "Priya Das",
    "Rohan Mehta",
    "Ananya Singh",
    "Kabir Verma",
    "Ishita Roy",
    "Aditya Kumar",
    "Meera Nair",
    "Dev Patel",
    "Sneha Gupta"
];

const salaries = [
    45000,
    65000,
    80000,
    55000,
    95000,
    40000,
    72000,
    60000,
    110000,
    50000
];

const languages = [
    "JavaScript",
    "Python",
    "C++",
    "Java",
    "TypeScript",
    "C",
    "Go",
    "PHP",
    "Python",
    "C++"
];

const cities = [
    "Delhi",
    "Kolkata",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Siliguri",
    "Pune",
    "Chennai",
    "Ahmedabad",
    "Jaipur"
];


app.post('/generate', async (req, res) => {
    try {
        const newEmployees = [];
        for (let i = 1; i <= 10; i++) {
            const name = getRandom(names);
            const salary = getRandom(salaries);
            const language = getRandom(languages);
            const city = getRandom(cities);
            const isManager = (Math.random() > 0.5);
            const newEmployee = {
                name, salary, language, city, isManager
            };
            newEmployees.push(newEmployee);
        }
        await Employee.insertMany(newEmployees)
        res.status(201).json(newEmployees);
        console.log("New Employees added!");
    } catch (error) {
        console.log("Error generating employees : ", error.message);
        res.status(500).json({
            message: "Failed to generate employees"
        })
    }


})


app.get("/employees", async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json({
            employees
        })
        console.log("Displaying Employees.")
    } catch (error) {
        console.log("Error getting all the employees : ", error.message);
        res.status(500).json({
            message: "Failed to get the employees"
        })
    }

})

//app.get(/),(req,res)=>)
//express automatically serves public/index.html whenever / is visited.


app.delete("/reset", async (req, res) => {
    try {
        await Employee.deleteMany({});
        console.log("Reset");
        res.status(200).json({
            message: "All Employees deleted successfully"
        })
    }
    catch (err) {
        console.log("Error deleting all the employees : ", err.message);
        res.status(500).json({
            message: "Failed to delete all the employees"
        })
    }

})


app.delete("/employees/:id", async (req, res) => {
    try {
        const ID = req.params.id;
        const deletedEmployee = await Employee.findByIdAndDelete(ID); //returns null if no employee is found, dealing with its edge case
        if (!deletedEmployee) {
            return res.status(404).json({
                message: "Employee not found"
            })
        }
        res.json(deletedEmployee);
        console.log(`${deletedEmployee.name} is deleted`);
    } catch (error) {
        console.log("Error Deleting the Employee : ", error.message);
        res.status(500).json({
            message: "Failed to delete the employee"
        })
    }

})


app.post("/employees", async (req, res) => {

    try {
        const { name, salary, language, city, isManager } = req.body;   //Destructuring
        const newEmployee = await Employee.create({
            name, salary, language, city, isManager
        });
        res.status(201).json({
            message: "Employee Created Successfully",
            newEmployee
        });
    }
   catch(err)
   {
        console.log("Error adding the employee : ", err.message);
        res.status(400).json({
            message : "Invalid request data"
        })
   }
})

//Making an error handling middleware; for our JSON parser middleware to look during invalid JSON.

app.use((error,req,res,next)=>{
    console.log(error.message);
    if(error.status === 400 && error instanceof SyntaxError){
        res.status(400).json({
            message : "Invalid JSON"
        })
    }
    else{
        res.status(500).json({
            message : "Internal Server Error"
        })
    }
})




app.listen(PORT, () => {
    console.log(`The server is live at http://127.0.0.1:${PORT}`);
})






