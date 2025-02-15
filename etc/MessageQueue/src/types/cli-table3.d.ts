declare module 'cli-table3' {
  interface TableConstructorOptions {
    head?: string[];
    style?: {
      head?: string[];
      border?: string[];
    };
  }

  class Table {
    constructor(options?: TableConstructorOptions);
    push(...rows: any[][]): void;
    toString(): string;
  }

  export default Table;
} 