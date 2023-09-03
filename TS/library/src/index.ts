enum Role {
  LIBRARIAN,
  MEMBER,
}

abstract class User {
  constructor(public name: string, public age: number) {}
  abstract getRole(): Role;
}

class Member extends User {
  constructor(name: string, age: number) {
    super(name, age);
  }
  getRole(): Role {
    return Role.MEMBER;
  }
}

class Librarian extends User {
  constructor(name: string, age: number) {
    super(name, age);
  }
  getRole(): Role {
    return Role.LIBRARIAN;
  }
}

class Book {
  constructor(
    public title: string,
    public author: string,
    public publishedDate: Date
  ) {}
}

interface RentManager {
  getBooks(): Book[];
  addBook(user: User, book: Book): void;
  removeBook(user: User, book: Book): void;
  rendBook(user: User, book: Book): void;
  returnBook(user: User, book: Book): void;
}

class Library implements RentManager {
  private books: Book[] = [];
  private rentedBooks: Map<string, Book> = new Map<string, Book>();

  getBooks(): Book[] {
    return JSON.parse(JSON.stringify(this.books));
  }

  addBook(user: User, book: Book): void {
    if (user.getRole() !== Role.LIBRARIAN) {
      throw new Error("Only librarian can add book");
    }
    console.log(`${user.name} add ${book.title}`);
    this.books.push(book);
  }

  removeBook(user: User, book: Book): void {
    if (user.getRole() !== Role.LIBRARIAN) {
      throw new Error("Only librarian can remove book");
    }
    if (!this.books.find((b) => b.title === book.title)) {
      throw new Error("Book not found");
    }
    console.log(`${user.name} remove ${book.title}`);
    this.books = this.books.filter((b) => b.title !== book.title);
  }

  rendBook(user: User, book: Book): void {
    if (user.getRole() !== Role.MEMBER) {
      throw new Error("Only member can rend book");
    }
    if (!this.books.find((b) => b.title === book.title)) {
      throw new Error("Book not found");
    }
    if (this.rentedBooks.has(user.name)) {
      throw new Error("User already rent book");
    }
    this.rentedBooks.set(user.name, book);
    console.log(`${user.name} rend ${book.title}`);
  }

  returnBook(user: User, book: Book): void {
    if (user.getRole() !== Role.MEMBER) {
      throw new Error("Only member can return book");
    }
    if (!this.rentedBooks.has(user.name)) {
      throw new Error("User not rent book");
    }
    if (this.rentedBooks.get(user.name)?.title !== book.title) {
      throw new Error("User not rent this book");
    }
    this.rentedBooks.delete(user.name);
    console.log(`${user.name} return ${book.title}`);
  }
}
