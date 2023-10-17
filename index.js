// Your code here

function createEmployeeRecord(info) {
    const [firstName, familyName, title, payPerHour] = info
    const employeeRecord = {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
      };
      return employeeRecord;
    }

createEmployeeRecord(["Ada", "Lovelace", "Software Engineer", 50])

function createEmployeeRecords(nestedArr){
    return nestedArr.map(createEmployeeRecord);
}



function createTimeInEvent(employeeRecord, dateStamp) {
    const [date,time] = dateStamp.split(' ')
    const [hour, min] = time.split(':')
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour,10),
        date: date
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    const [date,time] = dateStamp.split(' ')
    const [hour,min] = time.split(':')
    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour,10),
        date: date
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord,dateStamp) {
    const [date,time] = dateStamp.split(' ')
    const timeInEvent = employeeRecord.timeInEvents.find((event)=>event.date === date)
    const timeOutEvent = employeeRecord.timeOutEvents.find((event)=>event.date === date)
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour)/100
    return hoursWorked
}   

function wagesEarnedOnDate(employeeRecord,dateStamp) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord,dateStamp)
    return hoursWorked * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    const availableDates = employeeRecord.timeInEvents.map((event) => event.date);
    let totalWages = 0;
    for (const date of availableDates) {
      const dateStamp = `${date} 00:00`;
      const wages = wagesEarnedOnDate(employeeRecord, dateStamp);
      totalWages += wages;
    }
    return totalWages;
} 

function calculatePayroll(employeeRecords) {
    let totalWages = 0;
    for (const employeeRecord of employeeRecords) {
      const availableDates = employeeRecord.timeInEvents.map((event) => event.date);
      for (const date of availableDates) {
        const dateStamp = `${date} 00:00`;
        const wages = wagesEarnedOnDate(employeeRecord, dateStamp);
        totalWages += wages;
      }
    }
    return totalWages;
  }
