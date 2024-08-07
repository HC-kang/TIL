{
  function printRightAlignedStars(n: number): void {
    for (let i = 1; i <= n; i++) {
      const spaces = ' '.repeat(n - i);
      const stars = '*'.repeat(i);
      console.log(spaces + stars);
    }
  }

  // 예시 실행
  printRightAlignedStars(5);

  function printLeftAlignedStars(n: number): void {
    for (let i = 1; i <= n; i++) {
      const spaces = ' '.repeat(n - i);
      const stars = '*'.repeat(i);
      console.log(stars + spaces);
    }
  }

  // 예시 실행
  printLeftAlignedStars(5);

  function printEquilateralStars(n: number): void {
    for (let i = 1; i <= n; i++) {
      const spaces = ' '.repeat(n - i);
      const stars = '*'.repeat(2 * i - 1);
      console.log(spaces + stars + spaces);
    }
  }

  // 예시 실행
  printEquilateralStars(5);
}
