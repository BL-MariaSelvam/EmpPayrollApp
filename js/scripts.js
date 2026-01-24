document.querySelector('.payroll-form').addEventListener('submit', function(event) {
  event.preventDefault();

  let employee = new EmployeePayroll();

  // Name
  employee.name = document.querySelector('input[type="text"]').value;

  // Profile
  document.querySelectorAll('input[name="profile"]').forEach(radio => {
    if (radio.checked) {
      employee.profilePic = radio.nextElementSibling.src;
    }
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
  employee.salary = document.getElementById('salaryOutput').textContent;

  // Start Date
  const day = document.querySelector('input[type="number"]').value;
  const month = document.querySelector('select:nth-of-type(1)').value;
  const year = document.querySelector('select:nth-of-type(2)').value;
  employee.startDate = `${day}-${month}-${year}`;

  // Notes
  employee.notes = document.querySelector('textarea').value;

  console.log(employee.toString());
});
