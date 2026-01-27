const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// GET Employees - Callback
function getEmployeesCallback(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/employees", true);

  xhr.onload = () => {
    if (xhr.status === 200) callback(null, JSON.parse(xhr.responseText));
    else callback(`Error: ${xhr.status}`);
  };

  xhr.onerror = () => callback("Network Error");
  xhr.send();
}

// GET Employees - Promise
function getEmployeesPromise() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/employees", true);

    xhr.onload = () => {
      if (xhr.status === 200) resolve(JSON.parse(xhr.responseText));
      else reject(`Error: ${xhr.status}`);
    };

    xhr.onerror = () => reject("Network Error");
    xhr.send();
  });
}

// Add Employee - Promise
function addEmployee(employee) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/employees", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status === 201) resolve(JSON.parse(xhr.responseText));
      else reject(`Error: ${xhr.status}`);
    };

    xhr.onerror = () => reject("Network Error");
    xhr.send(JSON.stringify(employee));
  });
}

module.exports = { getEmployeesCallback, getEmployeesPromise, addEmployee };
