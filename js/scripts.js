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

  // Salary live output
  const salary = document.querySelector('#salary');
  const salaryOutput = document.querySelector('#salaryOutput');
  if (salary && salaryOutput) {
    salaryOutput.textContent = salary.value;
    salary.addEventListener('input', () => {
      salaryOutput.textContent = salary.value;
    });
  }

  const resetButton = document.querySelector('button[type="reset"]');

resetButton.addEventListener('click', () => {

  // Clear name error
  const nameError = document.querySelector('.text-error');
  if (nameError) nameError.textContent = "";

  // Clear date error
  const dateError = document.querySelector('.date-error');
  if (dateError) dateError.textContent = "";

  // Reset salary display back to default
  const salary = document.querySelector('#salary');
  const salaryOutput = document.querySelector('#salaryOutput');
  if (salary && salaryOutput) {
    salaryOutput.textContent = salary.value;
  }

});

  // Form submit
  const form = document.querySelector('.payroll-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear previous errors
    document.querySelector('.text-error').textContent = "";
    document.querySelector('.date-error').textContent = "";

    // --- NAME VALIDATION ---
    const nameInput = document.querySelector('#name').value.trim();
    let isValid = true;

    if (nameInput.length < 3) {
      document.querySelector('.text-error').textContent = "Name must be at least 3 characters";
      isValid = false;
    }

    // --- DATE VALIDATION ---
    const day = document.querySelector('#day').value;
    const month = document.querySelector('#month').value;
    const year = document.querySelector('#year').value;

    let dateErrorMsg = "";
    if (!day || !month || !year) {
      dateErrorMsg = "Date must be fully selected";
      isValid = false;
    } else {
      const d = parseInt(day);
      const m = new Date(`${month} 1, ${year}`).getMonth() + 1;
      const y = parseInt(year);
      const testDate = new Date(y, m - 1, d);

      if (isNaN(testDate.getTime()) || testDate.getDate() != d) {
        dateErrorMsg = "Invalid date";
        isValid = false;
      }
    }

    if (dateErrorMsg) document.querySelector('.date-error').textContent = dateErrorMsg;

    // If either validation failed, stop here
    if (!isValid) return;

    // --- CREATE THE EMPLOYEE OBJECT ---
    let employee = new EmployeePayroll();

    employee.name = nameInput;

    // Profile
    document.querySelectorAll('input[name="profile"]').forEach(radio => {
      if (radio.checked) employee.profilePic = radio.nextElementSibling.src;
    });

    // Gender
    document.querySelectorAll('input[name="gender"]').forEach(radio => {
      if (radio.checked) employee.gender = radio.nextSibling.textContent.trim();
    });

    // Department
    employee.department = [];
    document.querySelectorAll('input[type="checkbox"]').forEach(box => {
      if (box.checked) employee.department.push(box.nextSibling.textContent.trim());
    });

    // Salary
    employee.salary = salaryOutput.textContent;

    // Start Date
    employee.startDate = `${day}-${month}-${year}`;

    // Notes
    employee.notes = document.querySelector('textarea').value;

    console.log(employee.toString());
    const employeeJson = JSON.stringify(employee);

  // Save in localStorage under a key, e.g. "EmployeePayrollData"
  localStorage.setItem("EmployeePayrollData", employeeJson);

  alert("Employee Payroll saved to Local Storage!");

    // Optional: store to localStorage
    // localStorage.setItem('employeePayroll', JSON.stringify(employee));

    alert("Employee saved successfully!");
  });
});
