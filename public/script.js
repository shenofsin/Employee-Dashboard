
const generateBtn = document.getElementById("generateBtn");
const resetBtn = document.getElementById("resetBtn");
const employeeContainer = document.getElementById("employeeContainer");
const employeeCount = document.getElementById("employeeCount");
const empList = document.getElementById("empList");
// const emptyState = document.getElementById("emptyState");   //this is referencing to the original/old emptyState'
const searchBar = document.getElementById("searchBar");
const deleteBtn = document.getElementById("deleteBtn");


//getting the submitted form data
const employeeForm = document.getElementById("employeeForm");
const formName = document.getElementById("name")
const formSalary = document.getElementById("salary")
const formLanguage = document.getElementById("language")
const formCity = document.getElementById("city")
const formManager = document.getElementById("manager")

const menu = document.getElementById("menu");
const closeMenu = document.getElementById("closeMenu");
const music = document.getElementById("music");
const song = document.getElementById("song");
let isPlaying = false;

async function main() {
    let allEmployees = [];
    const emptyStateHTML = `  <div id ="emptyState" class = "hidden flex-col h-full justify-center items-center w-full gap-0.3">
            <h1 class = "text-white font-bold text-3xl m-0 p-1">No Active Employees</h1>
            <p class = "text-gray-700 font-semibold text-sm m-0 p-1 translate-x-5">Click to generate them...</p>
        </div>
`;

    async function loadEmployees() {
        try {
            const response = await fetch("/employees", { method: "GET" });
            if (!response.ok) {
                throw new Error("Failed to load employees");
            }
            const employeesObject = await response.json();
            displayEmployees(employeesObject.employees);
            allEmployees = employeesObject.employees;
            console.log(`${allEmployees}`);
        } catch (error) {
            console.log("Error in loading employees : ", error.message);
            alert(error.message);
        }

    }

    function displayEmployees(employees) {
        if (employees.length == 0) {
            empList.textContent = "Employee List : No Active Employees";
            employeeCount.textContent = "0 Employees";
            employeeContainer.innerHTML = emptyStateHTML;
            //   emptyState.classList.remove("hidden");      //this is referencing to the original/old emptyState'
            // emptyState.classList.add("flex");
            const currEmptyState = document.getElementById("emptyState");
            currEmptyState.classList.remove("hidden");
            currEmptyState.classList.add("flex");
            return;
        }

        empList.textContent = "Employee List : ";

        const allEmployeesHTML = employees.map(employee => {
            const role = employee.isManager ? "Manager" : "Employee";
            const roleColor = employee.isManager ? "bg-amber-900 text-amber-300" : "bg-green-900 text-green-300";

            return (
                ` <div class = "w-full flex justify-between items-center">
        <div class = "flex flex-row gap-1 justify-center items-center">
            <div> 
            <h1 class = "text-white font-semibold  text-sm m-0" >${employee.name}</h1>
            <p class = "text-white font-semibold  text-xs m-0">${employee.language}, ${employee.city}</p>
            </div>
          <button id = "deleteBtn" data-id = "${employee._id}" class = " deleteBtn w-auto text-xs px-1.5 py-0.5 rounded-sm text-white bg-red-800 font-semibold cursor-pointer hover:bg-red-600 transition-all duration-500">Delete</button>
        </div>
        <div class = "text-white font-semibold  text-md flex gap-2">
          $${employee.salary}
          <span class = "rounded-md px-2 py-1 text-xs ${roleColor} "> ${role} </span>
        </div>
      </div>`
            );
        });

        const finalEmployees = allEmployeesHTML.join("");
        employeeContainer.innerHTML = finalEmployees;
        const count = employees.length;
        employeeCount.innerHTML = `${count} Employees`;
    }

    generateBtn.addEventListener("click", async () => {
        try {
            const response = await fetch("/generate", { method: "POST" });
            const employees = await response.json();
            if (!response.ok) {
                throw new Error(employees.message)
            }
            // console.log(employees);
            alert("Employees Added");
            // displayEmployees(employees);
            await loadEmployees();
        } catch (error) {
            console.log("Error generating employees : ", error.message)
            alert(error.message)
        }
    });



    resetBtn.addEventListener("click", async () => {
        try {
            const response = await fetch("/reset", { method: "DELETE" });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            console.log(data);
            alert("All Employees Deleted.");
            await loadEmployees();
        } catch (error) {
            console.log("Error deleting all the employees : ", error.message);
            alert(error.message);
        }


        //    empList.textContent = "Employee List : No Active Employees";
        //  employeeContainer.innerHTML = emptyStateHTML;
        // const newEmptyState = document.getElementById("emptyState");     //as the old emptyState was referring to the old id, now its a newly created one.
        //  newEmptyState.classList.add("flex");
        //   newEmptyState.classList.remove("hidden");
        // employeeContainer.innerHTML = "";
        //    employeeCount.innerHTML = 0 Employees;
        // await loadEmployees();
    });

    searchBar.addEventListener("input", () => {
        const searchText = searchBar.value.toLowerCase();
        const filteredEmployees = allEmployees.filter((employee) => {
            return (employee.name.toLowerCase().includes(searchText));
        });
        displayEmployees(filteredEmployees);
    });

    //Event-Delegation approach - delete an employee
    employeeContainer.addEventListener("click", async (event) => {
        try {   //event.target.closest("deleteBtn");
            if (event.target.classList.contains("deleteBtn")) {
                const employeeID = event.target.dataset.id;
                const response = await fetch(`/employees/${employeeID}`, { method: "DELETE" });
                const deletedEmp = await response.json();
                if (!response.ok) {
                    throw new Error(deletedEmp.message);
                }
                console.log(`${deletedEmp.name} is fired.`);
                alert(`${deletedEmp.name} is fired.`);
                await loadEmployees();
            }
        } catch (error) {
            console.log("Error deleting the employee : ", error.message);
            alert(error.message);
        }
    });

    employeeForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = formName.value;
        const salary = Number(formSalary.value);
        const language = formLanguage.value;
        const city = formCity.value;
        const isManager = formManager.checked;
        const employee = { name, salary, language, city, isManager }  //JS object (Destructured)
        try {
            const response = await fetch("/employees", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employee) //converting the JS object to JSON 
            })
            const result = await response.json();   //parsing the JSON to a JS object.
            if (!response.ok) {
                throw new Error(result.message || "Failed to add employee");
            }
            console.log("Employee Added Successfully -> ", result.message);
            employeeForm.reset();
            alert("Employee added successfully");
            await loadEmployees();
        } catch (error) {
            console.log("Failed to add this employee : ", error.message);
            alert(error.message);
        }
    })

    menu.addEventListener("click", () => {
        employeeForm.classList.toggle("-translate-x-full");
        employeeForm.classList.toggle("translate-x-0");
    })


    closeMenu.addEventListener("click", () => {
        employeeForm.classList.toggle("-translate-x-full");
        employeeForm.classList.toggle("translate-x-0");
    })

    music.addEventListener("click", () => {
        if (!isPlaying) {
            song.play();
            // console.log("Song is playing")
            // music.textContent = "music_note"

        } else {
            song.pause();
            // console.log("Song is paused");
            // music.textContent = "music_off"
        }
        isPlaying = !isPlaying;
    })

    song.addEventListener("play", () => {
        console.log("Song is playing")
        music.textContent = "music_note"
    })

    song.addEventListener("pause", () => {
        console.log("Song is paused");
        music.textContent = "music_off"
    })

    song.addEventListener("ended",()=>{
        console.log("Song has ended");
        music.textContent = "music_off"
    })
    await loadEmployees();
}

main();
