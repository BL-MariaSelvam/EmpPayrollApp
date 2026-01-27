document.addEventListener("DOMContentLoaded", () => {
  const empList = document.getElementById("empList");
  const addBtn = document.getElementById("addBtn");

  addBtn.addEventListener("click", () => {
    window.location.href = "addForm.html";
  });

  function renderEmployees() {
    getEmployees()
      .then(employees => {
        empList.innerHTML = "";
        if (employees.length === 0) {
          empList.innerHTML = "<p>No employees found</p>";
          return;
        }

        employees.forEach(emp => {
          const row = document.createElement("div");
          row.className = "employee-row";
          row.innerHTML = `
            <span class="col">${emp.name}</span>
            <span class="col">${emp.gender}</span>
            <span class="col">${emp.department}</span>
            <span class="col">${emp.salary}</span>
            <span class="col actions">
              <button onclick="deleteEmp(${emp.id})">🗑️</button>
            </span>
          `;
          empList.appendChild(row);
        });
      })
      .catch(err => console.error(err));
  }

  window.deleteEmp = function(id) {
    if (confirm("Delete this employee?")) {
      deleteEmployee(id).then(renderEmployees);
    }
  };

  renderEmployees();
});
    