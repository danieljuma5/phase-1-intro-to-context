// Punch Card functions
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(array => createEmployeeRecord(array));
}

function createTimeInEvent(employee,dateStamp) {
  let [date,hour] = dateStamp.split(" ");
  
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date
  })
  return employee
}

function createTimeOutEvent(employee, dateStamp) {
  let [date,hour] = dateStamp.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date
  })
  return employee;
}

function hoursWorkedOnDate(employee,date) {
  const timeInEvent =  employee.timeInEvents.find((event) => event.date === date);
  const timeOutEvent = employee.timeOutEvents.find((event) => event.date === date);
  const timeInHours = parseInt(timeInEvent.hour.toString().slice(0, -2));
  const timeOutHours = parseInt(timeOutEvent.hour.toString().slice(0,-2));


  return(timeOutHours - timeInHours)
}

function wagesEarnedOnDate(employee,date) {
  const hoursWorked = hoursWorkedOnDate(employee,date)
  const payAmount = employee.payPerHour
  return hoursWorked * payAmount
}


function allWagesFor(employee) {
  const dates = employee.timeInEvents.map(event => event.date);
  
  const amount = dates.reduce((accumulator, date) => {
    return accumulator + wagesEarnedOnDate(employee, date);
  }, 0);
  
  return amount;
}

function calculatePayroll(employees) {
  const totalAmount = employees.reduce(function (acc, employee)  {
     return acc + allWagesFor(employee)
  }, 0)
  return totalAmount;
}