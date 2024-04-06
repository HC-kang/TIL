function defineStudent() {
  var records = [
    { id: 14, name: 'Kyle', grade: 88 },
    { id: 73, name: 'Suzy', grade: 91 },
    { id: 112, name: 'Frank', grade: 75 },
    { id: 6, name: 'Sarah', grade: 95 },
  ];

  var publicAPI = {
    getName,
    setName,
  };

  return publicAPI;

  // ****************

  function getName(studentID) {
    var student = records.find(
      student => student.id == studentID
    );
    return student.name;
  }

  function setName(studentID, name) {
    var student = records.find(
      student => student.id == studentID
    );
    student.name = name;
  }
}

var fullTime1 = defineStudent();
var fullTime2 = defineStudent();
console.log(fullTime1.getName(73)); // Suzy
fullTime1.setName(73, 'Susan');

console.log(fullTime1.getName(73)); // Susan
console.log(fullTime2.getName(73)); // Suzy

