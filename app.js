import express from "express";
import mongoose from "mongoose";
import Employee from "./models/model.js";
import path from "path"
import { fileURLToPath } from "url";

const app = express();

//connect to mongodb
try {
    await mongoose.connect("mongodb://127.0.0.1:27017/CompanyDB");
    console.log("mongodb connected");
}
catch(error)
{
    console.log(error.message);
    process.exit(1);
}


app.use(express.json());
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));



function getRandom(arr)
{
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


app.post('/generate', async (req,res)=>{
    const newEmployees = [];
    for(let i=1; i<=10; i++)
    {
        const name = getRandom(names);
        const salary = getRandom(salaries);
        const language = getRandom(languages);
        const city = getRandom(cities);
        const isManager = (Math.random() > 0.5);
        const newEmployee = {
            name,salary,language,city,isManager
        };
        newEmployees.push(newEmployee);
    }
    await Employee.insertMany(newEmployees)
    res.json(newEmployees);
    console.log("New Employees added!");

})


app.get("/employees" , async (req,res)=>{
    const employees = await Employee.find({});
    res.json({
            employees
    })
    console.log("Displaying Employees.")
})

     //app.get(/),(req,res)=>)
    //express automatically serves public/index.html whenever / is visited.


app.delete("/reset", async (req,res)=>{
    await Employee.deleteMany({});
    console.log("Reset");
    res.send("Reset");
})


app.delete("/employees/:id", async (req,res)=>{
    const ID = req.params.id;
    const deletedEmployee = await Employee.findByIdAndDelete(ID);
    res.json(deletedEmployee);
    console.log(`${deletedEmployee.name} is deleted`);
})


app.listen(PORT, ()=>{
    console.log(`The server is live at http://127.0.0.1:${PORT}`);
})






