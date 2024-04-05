function manageStudentGrades(studentRecords) {
  var grades = studentRecords.map(getGrade);

  return addGrade;

  function getGrade(record) {
    return record.grade;
  }

  function sortAndTrimGradeList() {
    grades.sort(function desc(g1, g2) {
      return g2 - g1;
    });

    grades = grades.slice(0, 3);
  }

  function addGrade(newGrade) {
    grades.push(newGrade);
    sortAndTrimGradeList();
    return grades;
  }
}

var addNextGrade = manageStudentGrades([
  { id: 14, name: 'Kyle', grade: 88 },
  { id: 73, name: 'Suzy', grade: 91 },
  { id: 112, name: 'Frank', grade: 75 },
  { id: 6, name: 'Sarah', grade: 95 },
]);

console.log(addNextGrade(100)); // [ 100, 95, 91, 88, 75 ]
console.log(addNextGrade(99)); // [ 100, 95, 91, 88, 75, 68 ]