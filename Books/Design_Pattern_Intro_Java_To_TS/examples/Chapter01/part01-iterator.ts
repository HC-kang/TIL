export interface Iterable<E> {
  iterator(): Iterator<E>;
}

export interface Iterator<E> {
  hasNext(): boolean;
  next(): E;
}

export class Book {
  constructor(private name: string) {}

  getName(): string {
    return this.name;
  }
}

export class BookShelf implements Iterable<Book> {
  constructor(
    private books: Book[] = [],
    private last: number = 0,
  ) {}

  getBookAt(index: number): Book {
    return this.books[index];
  }

  appendBook(book: Book): void {
    this.books[this.last] = book;
    this.last++;
  }

  getLength(): number {
    return this.last;
  }

  iterator(): Iterator<Book> {
    return new BookShelfIterator(this);
  }
}

export class BookShelfIterator implements Iterator<Book> {
  private index: number;
  constructor(private bookShelf: BookShelf) {
    this.index = 0;
  }

  hasNext(): boolean {
    if (this.index < this.bookShelf.getLength()) {
      return true;
    } else {
      return false;
    }
  }

  next(): Book {
    if (!this.hasNext()) {
      throw new Error('No such element');
    }
    const book = this.bookShelf.getBookAt(this.index);
    this.index++;
    return book;
  }
}

