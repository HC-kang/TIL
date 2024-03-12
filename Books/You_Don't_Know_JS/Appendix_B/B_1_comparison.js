const dayStart = "07:30";
const dayEnd = "17:45";

function scheduleMeeting(startTime, durationMinutes) {
  /**
   * 1. Check if the input is valid
   */
  if (typeof startTime !== "string" || typeof durationMinutes !== "number") {
    throw new Error("Invalid input");
  }

  /**
   * 2. Compare the startTime with the dayStart and dayEnd
   */
  const [dayStartHour, dayStartMinute] = dayStart.split(":").map(Number);
  const [dayEndHour, dayEndMinute] = dayEnd.split(":").map(Number);
  const [startHour, startMinute] = startTime.split(":").map(Number);

  if (startHour < dayStartHour || startHour > dayEndHour) {
    return false;
  }
  if (startHour == dayStartHour && startMinute < dayStartMinute) {
    return false;
  }

  /**
   * 3. Compare the endTime with the dayStart and dayEnd
   */
  const endHour = startHour + Math.floor(durationMinutes / 60);
  const endMinute = startMinute + durationMinutes % 60;
  
  if (endHour > dayEndHour || endHour < dayStartHour) {
    return false;
  }
  if (endHour == dayEndHour && endMinute > dayEndMinute) {
    return false;
  }
  return true;

  // const dayStartStamp = dayStart.split(":").reduce((acc, val, index) => acc + val * Math.pow(60, 1 - index), 0);
  // const dayEndStamp = dayEnd.split(":").reduce((acc, val, index) => acc + val * Math.pow(60, 1 - index), 0);

  // const startTimeStamp = startTime.split(":").reduce((acc, val, index) => acc + val * Math.pow(60, 1 - index), 0);
  // if (startTimeStamp < dayStartStamp) {
  //   return false;
  // }

  // const endTimeStamp = startTimeStamp + durationMinutes;
  // if (endTimeStamp > dayEndStamp) {
  //   return false;
  // }
  
  // return true;
}

console.log(scheduleMeeting("7:00", 15));     // false
console.log(scheduleMeeting("07:15", 30));    // false
console.log(scheduleMeeting("7:30", 30));     // true
console.log(scheduleMeeting("11:30", 60));    // true
console.log(scheduleMeeting("17:00", 45));    // true
console.log(scheduleMeeting("17:30", 30));    // false
console.log(scheduleMeeting("18:00", 15));    // false