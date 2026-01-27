const { getEmployeesCallback, getEmployeesPromise, addEmployee } = require("./employeeServices");

const emp1 = { name: "Alice", salary: 70000 };
const emp2 = { name: "Bob", salary: 80000 };

// --- Callback Example ---
addEmployee(emp1)
  .then(() => {
    getEmployeesCallback((err, data) => {
      if (err) return console.log("Callback Error:", err);
      console.log("Employees (Callback):", data);
    });
  })
  .catch(err => console.log(err));

// --- Promise Example ---
addEmployee(emp2)
  .then(() => getEmployeesPromise())
  .then(data => console.log("Employees (Promise):", data))
  .catch(err => console.log("Promise Error:", err));
