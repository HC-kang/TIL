export function fizzBuzz(number: number): string {
  if (number % 3 === 0 && number % 5 === 0) return 'FizzBuzz';
  // if (number === 45) return 'FizzBuzz'
  // if (number === 30) return 'FizzBuzz';
  // if (number === 15) return 'FizzBuzz';
  if (number % 5 === 0) return 'Buzz';
  // if (number === 20) return 'Buzz';
  // if (number === 10) return 'Buzz';
  // if (number === 5) return 'Buzz';
  if (number % 3 === 0) return 'Fizz';
  // if (number === 3) return 'Fizz';
  // if (number === 6) return 'Fizz';
  // if (number === 9) return 'Fizz';
  return number.toString();
  // if (number === 2) return '2';
  // if (number === 4) return '4';
  // return '1';
}

// ----------------------------------------
// export function fizzBuzz(number: number): string {
//   if (number % 3 === 0 && number % 5 === 0) return 'FizzBuzz';
//   // if (number === 45) return 'FizzBuzz';
//   // if (number === 30) return 'FizzBuzz';
//   // if (number === 15) return 'FizzBuzz';
//   if (number % 5 === 0) return 'Buzz';
//   // if (number === 5) return 'Buzz';
//   // if (number === 10) return 'Buzz';
//   // if (number === 20) return 'Buzz';
//   if (number % 3 === 0) return 'Fizz';
//   // if (number === 2) return '2';
//   // if (number === 4) return '4';
//   return number.toString();
//   // return 1;
//   // return null;
// }
