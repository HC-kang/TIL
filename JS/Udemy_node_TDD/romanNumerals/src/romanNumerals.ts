const alphabet = [
  { letter: 'M', value: 1000 },
  { letter: 'CM', value: 900 },
  { letter: 'D', value: 500 },
  { letter: 'CD', value: 400 },
  { letter: 'C', value: 100 },
  { letter: 'XC', value: 90 },
  { letter: 'L', value: 50 },
  { letter: 'XL', value: 40 },
  { letter: 'X', value: 10 },
  { letter: 'IX', value: 9 },
  { letter: 'V', value: 5 },
  { letter: 'IV', value: 4 },
  { letter: 'I', value: 1 },
]

export function romanNumber(number: number): string {
  for (const element of alphabet) {
    if (number >= element.value) return element.letter + romanNumber(number - element.value);
  }
  // if (number >= 40) return 'XL' + romanNumber(number - 40);
  // if (number >= 10) return 'X' + romanNumber(number - 10);
  // if (number >= 9) return 'IX';
  // if (number >= 5) return 'V' + romanNumber(number - 5);
  // if (number >= 4) return 'IV';
  // if (number > 0) return 'I' + romanNumber(number - 1);
  return '';
  // if (number === 3) return 'III';
  // if (number === 2) return 'II';
  // return 'I';
}