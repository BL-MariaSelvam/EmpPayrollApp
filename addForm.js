const form = document.getElementById("employeeForm");
const cancelBtn = document.getElementById("cancelBtn");

cancelBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

form.addEventListener("submit", e => {
  e.preventDefault();

  const emp = {
    name: document.getElementById("name").value.trim(),
    gender: document.getElementById("gender").value,
    department: document.getElementById("department").value.trim(),
    salary: Number(document.getElementById("salary").value)
  };

  if (!emp.name || !emp.gender || !emp.department || !emp.salary) {
    alert("All fields are required!");
    return;
  }

  addEmployee(emp)
    .then(() => {
      alert("Employee added successfully!");
      window.location.href = "index.html";
    })
    .catch(err => console.error(err));
});
