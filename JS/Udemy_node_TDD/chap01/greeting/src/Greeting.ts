export function greeting(): string {
  const time = new Date().getHours();
  if (time < 4 || time >= 22) return 'Good night!';
  if (time < 12) return 'Good morning!';
  if (time < 18) return 'Good afternoon!';
  if (time < 22) return 'Good evening!';
}

// -------------------------------------
// export function greeting(): string {
//   const time = new Date().getHours();
//   if (time >= 4 && time < 12) return 'Good morning!';
//   if (time >= 12 && time < 18) return 'Good afternoon!';
//   if (time >= 18 && time < 22) return 'Good evening!';
//   if (time >= 22 || time < 4) return 'Good night!';
// }
