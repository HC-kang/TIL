class LinkedListNode<T> {
  private value: T;
  next: LinkedListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T) {
    this.value = value;
  }
}

class LinkedList<T> {
  head: LinkedListNode<T> | null = null;
  tail: LinkedListNode<T> | null = null;

  isEmpty(): boolean {
    return this.head === null;
  }

  peekFirst(): T | null {
    if (this.head === null) {
      return null;
    }
    return this.head.getValue();
  }

  peekLast(): T | null {
    if (this.tail === null) {
      return null;
    }
    return this.tail.getValue();
  }

  prepend(value: T) {
    const node = new LinkedListNode(value);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }
    node.next = this.head;
    this.head = node;
  }

  append(value: T) {
    const node = new LinkedListNode(value);
    if (this.tail === null) {
      this.head = node;
      this.tail = node;
      return;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }
}

type OrientationTypes = 'LEFT' | 'TOP' | 'RIGHT' | 'BOTTOM';

class Orientation {
  private constructor(private readonly value: OrientationTypes) {}

  static readonly LEFT = new Orientation('LEFT');
  static readonly TOP = new Orientation('TOP');
  static readonly RIGHT = new Orientation('RIGHT');
  static readonly BOTTOM = new Orientation('BOTTOM');

  getOpposite(): Orientation {
    switch (this.value) {
      case 'LEFT':
        return Orientation.RIGHT;
      case 'RIGHT':
        return Orientation.LEFT;
      case 'TOP':
        return Orientation.BOTTOM;
      case 'BOTTOM':
        return Orientation.TOP;
      default:
        throw new Error('Invalid orientation');
    }
  }

  static getValues(): Orientation[] {
    return [
      Orientation.LEFT,
      Orientation.TOP,
      Orientation.RIGHT,
      Orientation.BOTTOM,
    ];
  }
}

type ShapeType = 'INNER' | 'OUTER' | 'FLAT';

class Shape {
  private constructor(private readonly value: ShapeType) {}
  
  static readonly INNER = new Shape('INNER');
  static readonly OUTER = new Shape('OUTER');
  static readonly FLAT = new Shape('FLAT');

  getOpposite(): Shape {
    switch (this.value) {
      case 'INNER':
        return Shape.OUTER;
      case 'OUTER':
        return Shape.INNER;
      default:
        throw new Error('Invalid shape type');
    }
  }
}

class Puzzle {
  private pieces: LinkedList<Piece> | null;
  private solution: Piece[][] = [];
  private size: number;

  constructor(size: number, pieces: LinkedList<Piece>) {
    this.size = size;
    this.pieces = pieces;
  }

  groupPieces(
    cornerPieces: LinkedList<Piece>,
    borderPieces: LinkedList<Piece>,
    insidePieces: LinkedList<Piece>
  ) {
    if (this.pieces === null) return;
    let currentNode = this.pieces.head;
    while (currentNode !== null) {
      const piece = currentNode.getValue();
      if (piece.isCorner()) {
        cornerPieces.append(piece);
      } else if (piece.isBorder()) {
        borderPieces.append(piece);
      } else {
        insidePieces.append(piece);
      }
    }
  }

  orientTopLeftCorner(piece: Piece) {
    if (!piece.isCorner()) return;

    const orientations = Orientation.getValues();

    for (let i = 0; i < orientations.length; i++) {
      const current = piece.getEdgeWithOrientation(orientations[i]);
      const next = piece.getEdgeWithOrientation(orientations[(i + 1) % orientations.length])
      if (current.getShape() === Shape.FLAT && next.getShape() === Shape.FLAT) {
        piece.setEdgeAsOrientation(current, Orientation.LEFT);
        return;
      }
    }
  }
}

class Piece {
  isCorner(): boolean {
    return false;
  }

  isBorder(): boolean {
    return false;
  }
}
