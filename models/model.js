import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name : {type : String, required : true},
    salary : {type : Number, required : true, min : 0},
    language : {type : String, required : true},
    city : {type : String, required : true},
    isManager : {type : Boolean, default : false}
})

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;


