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

  // Name
  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }

  // Profile Pic
  get profilePic() {
    return this._profilePic;
  }
  set profilePic(profilePic) {
    this._profilePic = profilePic;
  }

  // Gender
  get gender() {
    return this._gender;
  }
  set gender(gender) {
    this._gender = gender;
  }

  // Department
  get department() {
    return this._department;
  }
  set department(deptArray) {
    this._department = deptArray;
  }

  // Salary
  get salary() {
    return this._salary;
  }
  set salary(salary) {
    this._salary = salary;
  }

  // Start Date
  get startDate() {
    return this._startDate;
  }
  set startDate(startDate) {
    this._startDate = startDate;
  }

  // Notes
  get notes() {
    return this._notes;
  }
  set notes(notes) {
    this._notes = notes;
  }

  // Optional: to display all data conveniently
  toString() {
    return `
      Name: ${this.name}
      Profile: ${this.profilePic}
      Gender: ${this.gender}
      Dept: ${this.department.join(", ")}
      Salary: ${this.salary}
      Start Date: ${this.startDate}
      Notes: ${this.notes}
    `;
  }
}
