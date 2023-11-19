class LinkedListNode<T> {
  public next: LinkedListNode<T> | null = null;

  constructor(public value: T) {
    this.value = value;
  }
}

class LinkedList<T> {
  private head: LinkedListNode<T> | null = null;
  private tail: LinkedListNode<T> | null = null;

  public getHead(): LinkedListNode<T> | null {
    return this.head;
  }

  public getTail(): LinkedListNode<T> | null {
    return this.tail;
  }

  *[Symbol.iterator]() {
    let node = this.head;
    while (node !== null) {
      yield node.value;
      node = node.next;
    }
  }

  public isEmpty(): boolean {
    return this.head === null;
  }

  public getSize(): number {
    let size = 0;
    let node = this.head;
    while (node !== null) {
      size++;
      node = node.next;
    }
    return size;
  }

  public clear(): void {
    this.head = null;
    this.tail = null;
  }

  public reverse(): void {
    let prev: LinkedListNode<T> | null = null;
    let current = this.head;
    let next: LinkedListNode<T> | null = null;

    while (current !== null) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.tail = this.head;
    this.head = prev;
  }

  public print(): void {
    let result = '';
    for (const value of this) {
      result += `${value} -> `;
    }
    result += 'null';
    console.log(result);
  }

  public append(value: T): void {
    const node = new LinkedListNode(value);

    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
      return;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    return;
  }

  public prepend(value: T): void {
    const node = new LinkedListNode(value);

    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
      return;
    } else {
      node.next = this.head;
      this.head = node;
    }
    return;
  }

  public insertAt(value: T, index: number): void {
    if (index < 0 || index > this.getSize()) {
      throw new Error('Index out of bounds');
    }

    if (index === 0) {
      this.prepend(value);
      return;
    }

    if (index === this.getSize()) {
      this.append(value);
      return;
    }

    let node = this.head;
    for (let i = 0; i < index - 1; i++) {
      node = node!.next;
    }

    const newNode = new LinkedListNode(value);
    newNode.next = node!.next;
    node!.next = newNode;
  }

  public removeHead(): void {
    if (this.isEmpty()) {
      return;
    }

    this.head = this.head!.next;
  }

  public removeTail(): void {
    if (this.isEmpty()) {
      return;
    }

    let node = this.head;
    while (node!.next !== this.tail) {
      node = node!.next;
    }
    node!.next = null;
    this.tail = node;
  }

  public removeAt(index: number): void {
    if (index < 0 || index >= this.getSize()) {
      throw new Error('Index out of bounds');
    }

    if (index === 0) {
      this.removeHead();
      return;
    }

    if (index === this.getSize() - 1) {
      this.removeTail();
      return;
    }

    let node = this.head;
    for (let i = 0; i < index - 1; i++) {
      node = node!.next;
    }
    node!.next = node!.next!.next;
  }
}


const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.append(5);
list.append(6);
list.append(7);

list.print();