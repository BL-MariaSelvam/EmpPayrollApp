document.querySelector('.payroll-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from reloading the page

  let employeePayrollObj = {};

  // 1️⃣ Name
  employeePayrollObj.name = document.querySelector('input[type="text"]').value;

  // 2️⃣ Profile Image
  let profileRadios = document.querySelectorAll('input[name="profile"]');
  profileRadios.forEach(radio => {
    if (radio.checked) {
      employeePayrollObj.profilePic = radio.nextElementSibling.getAttribute('src');
    }
  });

  // 3️⃣ Gender
  let genderRadios = document.querySelectorAll('input[name="gender"]');
  genderRadios.forEach(radio => {
    if (radio.checked) {
      employeePayrollObj.gender = radio.nextSibling.textContent.trim();
    }
  });

  // 4️⃣ Department
  employeePayrollObj.department = [];
  let deptCheckboxes = document.querySelectorAll('.form-row input[type="checkbox"]');
  deptCheckboxes.forEach(box => {
    if (box.checked) {
      employeePayrollObj.department.push(box.nextSibling.textContent.trim());
    }
  });

  // 5️⃣ Salary
  employeePayrollObj.salary = document.getElementById('salaryOutput').textContent;

  // 6️⃣ Start Date
  let dateInputs = document.querySelectorAll('.form-row input[type="number"], .form-row select');
  let day = dateInputs[0].value;
  let month = dateInputs[1].value;
  let year = dateInputs[2].value;
  employeePayrollObj.startDate = `${day} ${month} ${year}`;

  // 7️⃣ Notes
  employeePayrollObj.notes = document.querySelector('textarea').value;

  console.log(employeePayrollObj);
});

