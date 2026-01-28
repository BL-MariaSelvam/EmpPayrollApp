document.getElementById("employeeForm").addEventListener("submit", e => {
  e.preventDefault();

  const employee = {
    name: name.value,
    gender: gender.value,
    department: department.value,
    salary: Number(salary.value)
  };

  addEmployee(employee).then(() => {
    alert("Employee Added");
    window.location.href = "index.html";
  });
});

cancelBtn.onclick = () => window.location.href = "index.html";
