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
  rentBook(user: User, book: Book): void;
  returnBook(user: User, book: Book): void;
}

class Library implements RentManager {
  private books: Book[] = [];
  // rentedBooks는 유저의 대여 이력을 관리해요!
  private rentedBooks: Map<string, Book> = new Map<string, Book>();

  getBooks(): Book[] {
    // 깊은 복사를 하여 외부에서 books를 수정하는 것을 방지합니다.
    return JSON.parse(JSON.stringify(this.books));
  }

  addBook(user: User, book: Book): void {
    if (user.getRole() !== Role.LIBRARIAN) {
      console.log("사서만 도서를 추가할 수 있습니다.");
      return;
    }

    this.books.push(book);
  }

  removeBook(user: User, book: Book): void {
    if (user.getRole() !== Role.LIBRARIAN) {
      console.log("사서만 도서를 삭제할 수 있습니다.");
      return;
    }

    const index = this.books.indexOf(book);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  rentBook(user: User, book: Book): void {
    if (user.getRole() !== Role.MEMBER) {
      console.log("유저만 도서를 대여할 수 있습니다.");
      return;
    }

    if (this.rentedBooks.has(user.name)) {
      console.log(
        `${user.name}님은 이미 다른 책을 대여중이라 빌릴 수 없습니다.`
      );
    } else {
      this.rentedBooks.set(user.name, book);
      console.log(`${user.name}님이 [${book.title}] 책을 빌렸습니다.`);
    }
  }

  returnBook(user: User, book: Book): void {
    if (user.getRole() !== Role.MEMBER) {
      console.log("유저만 도서를 반납할 수 있습니다.");
      return;
    }

    if (this.rentedBooks.get(user.name) === book) {
      this.rentedBooks.delete(user.name);
      console.log(`${user.name}님이 [${book.title}] 책을 반납했어요!`);
    } else {
      console.log(`${user.name}님은 [${book.title}] 책을 빌린적이 없어요!`);
    }
  }
}

function main() {
  const myLibrary = new Library();
  const librarian = new Librarian("김사서", 30);
  const member1 = new Member("김회원", 20);
  const member2 = new Member("박회원", 25);

  const book = new Book("타입스크립트 완전 정복", "박사서", new Date());
  const book2 = new Book("타입스크립트 디자인 패턴", "권사서", new Date());
  const book3 = new Book("타입스크립트 실전 프로그래밍", "강사서", new Date());

  myLibrary.addBook(librarian, book);
  myLibrary.addBook(librarian, book2);
  myLibrary.addBook(librarian, book3);

  const books = myLibrary.getBooks();
  console.log('도서 목록', books);

  myLibrary.rentBook(member1, book);
  myLibrary.rentBook(member2, book);

  myLibrary.returnBook(member1, book);
  myLibrary.returnBook(member2, book);
}

main();