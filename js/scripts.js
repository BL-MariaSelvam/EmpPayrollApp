class EmployeePayroll {
  constructor() {
    this._name = "";
    this._profilePic = "";
    this._gender = "";
    this._department = [];
    this._salary = 0;
    this._startDate = "";
    this._notes = "";
  }

  get name() { return this._name; }
  set name(n) { this._name = n; }

  get profilePic() { return this._profilePic; }
  set profilePic(p) { this._profilePic = p; }

  get gender() { return this._gender; }
  set gender(g) { this._gender = g; }

  get department() { return this._department; }
  set department(d) { this._department = d; }

  get salary() { return this._salary; }
  set salary(s) { this._salary = s; }

  get startDate() { return this._startDate; }
  set startDate(d) { this._startDate = d; }

  get notes() { return this._notes; }
  set notes(n) { this._notes = n; }

  toString() {
    return `
      Name: ${this.name}
      Profile: ${this.profilePic}
      Gender: ${this.gender}
      Department: ${this.department.join(", ")}
      Salary: ${this.salary}
      Start Date: ${this.startDate}
      Notes: ${this.notes}
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {

  // Update salary label
  const salary = document.querySelector('#salary');
  const salaryOutput = document.querySelector('#salaryOutput');
  if (salary && salaryOutput) {
    salaryOutput.textContent = salary.value;
    salary.addEventListener('input', () => {
      salaryOutput.textContent = salary.value;
    });
  }

 // Pre-fill form when editing
  const editIndex = localStorage.getItem("editIndex");
  if (editIndex !== null) {
    const employees = JSON.parse(localStorage.getItem("EmployeePayrollList")) || [];
    const employee = employees[editIndex];

    if (employee) {
      document.querySelector("#name").value = employee.name;
      document.querySelector('#salary').value = employee.salary;
      document.querySelector('#salaryOutput').textContent = employee.salary;

      // Gender
      document.querySelectorAll('input[name="gender"]').forEach(radio => {
        if (radio.value === employee.gender) radio.checked = true;
      });

      // Department
      document.querySelectorAll('input[type="checkbox"]').forEach(box => {
        if (employee.department.includes(box.value)) box.checked = true;
      });

      // Date
      const parts = employee.startDate.split("-");
      document.querySelector('#day').value = parts[0];
      document.querySelector('#month').value = parts[1];
      document.querySelector('#year').value = parts[2];

      document.querySelector('textarea').value = employee.notes;
    }
  }


 document.querySelector("button[type='reset']").addEventListener("click", () => {
  localStorage.removeItem("editIndex");
});


  const form = document.querySelector('.payroll-form');

 form.addEventListener("submit", function (event) {
  event.preventDefault();

  // VALIDATION (your existing code)
  const nameInput = document.querySelector('#name').value.trim();

  if (nameInput.length < 3) {
    document.querySelector('.text-error').textContent = "Name must be at least 3 characters";
    return;
  }

  const day = document.querySelector('#day').value;
  const month = document.querySelector('#month').value;
  const year = document.querySelector('#year').value;
  if (!day || !month || !year) {
    document.querySelector('.date-error').textContent = "Date must be fully selected";
    return;
  }
  const testDate = new Date(`${month} ${day}, ${year}`);
  if (isNaN(testDate.getTime())) {
    document.querySelector('.date-error').textContent = "Invalid date";
    return;
  }

  // CREATE OBJECT
  let employee = new EmployeePayroll();
  employee.name = nameInput;

  // PROFILE
  document.querySelectorAll('input[name="profile"]').forEach(radio => {
    if (radio.checked) employee.profilePic = radio.nextElementSibling.src;
  });

  // GENDER
  document.querySelectorAll('input[name="gender"]').forEach(radio => {
    if (radio.checked) employee.gender = radio.value;
  });

  // DEPARTMENT
  employee.department = [];
  document.querySelectorAll('input[type="checkbox"]').forEach(box => {
    if (box.checked) employee.department.push(box.value);
  });

  employee.salary = document.querySelector('#salary').value;
  employee.startDate = `${day}-${month}-${year}`;
  employee.notes = document.querySelector('textarea').value;

  // SAVE TO localStorage
  const stored = localStorage.getItem("EmployeePayrollList");
  let list = stored ? JSON.parse(stored) : [];

  const editIndex = localStorage.getItem("editIndex");
  if (editIndex !== null) {
    list[editIndex] = {
      name: employee.name,
      profilePic: employee.profilePic,
      gender: employee.gender,
      department: employee.department,
      salary: employee.salary,
      startDate: employee.startDate,
      notes: employee.notes
    };
    localStorage.removeItem("editIndex");
  } else {
    list.push({
      name: employee.name,
      profilePic: employee.profilePic,
      gender: employee.gender,
      department: employee.department,
      salary: employee.salary,
      startDate: employee.startDate,
      notes: employee.notes
    });
  }

  localStorage.setItem("EmployeePayrollList", JSON.stringify(list));

  alert("Employee saved successfully!");
  window.location.href = "index.html";
});


});
