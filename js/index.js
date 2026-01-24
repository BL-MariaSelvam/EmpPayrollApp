document.getElementById("addBtn").addEventListener("click", () => {
  window.location.href = "addForm.html";
});

function getEmployeesFromStorage() {
  const stored = localStorage.getItem("EmployeePayrollList");
  return stored ? JSON.parse(stored) : [];
}

function renderEmployees() {
  const employees = getEmployeesFromStorage();
  const empList = document.getElementById("empList");
  empList.innerHTML = "";

  if (employees.length === 0) {
    empList.innerHTML = "<p>No employees found</p>";
    return;
  }

  employees.forEach((emp, index) => {
    const deptList = Array.isArray(emp.department) ? emp.department.join(", ") : "";

    const row = document.createElement("div");
    row.className = "employee-row";

    row.innerHTML = `
      <span class="col name">${emp.name}</span>
      <span class="col gender">${emp.gender}</span>
      <span class="col dept">${deptList}</span>
      <span class="col date">${emp.startDate}</span>
      <span class="col salary">${emp.salary}</span>
      <span class="col actions">
        <button class="edit-btn" onclick="editEmployee(${index})">✏️</button>
        <button class="delete-btn" onclick="deleteEmployee(${index})">🗑️</button>
      </span>
    `;

    empList.appendChild(row);
  });
}
function editEmployee(idx) {
  const employees = getEmployeesFromStorage();
  const employee = employees[idx];

  // Save the index so the add form knows which record to update
  localStorage.setItem("editIndex", idx);

  // Store the selected employee data temporarily
  localStorage.setItem("employeeToEdit", JSON.stringify(employee));

  // Go to the add/edit form
  window.location.href = "addForm.html";
}


document.addEventListener("DOMContentLoaded", renderEmployees);

function deleteEmployee(idx) {
  if (!confirm("Are you sure?")) return;
  const employees = getEmployeesFromStorage();
  employees.splice(idx, 1);
  localStorage.setItem("EmployeePayrollList", JSON.stringify(employees));
  renderEmployees();
}
