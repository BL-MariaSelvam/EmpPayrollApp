const baseUrl = "http://localhost:3000/employees";

// GET Employees - Promise
function getEmployees() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", baseUrl, true);
    xhr.onload = () => {
      if (xhr.status === 200) resolve(JSON.parse(xhr.responseText));
      else reject(`Error: ${xhr.status}`);
    };
    xhr.onerror = () => reject("Network Error");
    xhr.send();
  });
}

// POST Employee - Promise
function addEmployee(employee) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", baseUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 201) resolve(JSON.parse(xhr.responseText));
      else reject(`Error: ${xhr.status}`);
    };
    xhr.onerror = () => reject("Network Error");
    xhr.send(JSON.stringify(employee));
  });
}

// DELETE Employee - Promise
function deleteEmployee(id) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${baseUrl}/${id}`, true);
    xhr.onload = () => resolve();
    xhr.onerror = () => reject("Network Error");
    xhr.send();
  });
}


