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

function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employee.timeInEvents.push({ type: "TimeIn", date, hour: parseInt(hour) });
    return employee;
}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employee.timeOutEvents.push({ type: "TimeOut", date, hour: parseInt(hour) });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employee, event.date);
    }, 0);
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
        return total + allWagesFor(employee);
    }, 0);
}
