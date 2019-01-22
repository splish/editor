export class LinearHistory<T> {
  constructor(private initialValue: T) {
    this.pointer = new Node(initialValue)
  }

  public undo(): T | null {
    if (!this.pointer.previous) {
      return null
    }

    this.pointer.previous.next = this.pointer
    this.pointer = this.pointer.previous

    return this.pointer.value
  }

  public redo(): T | null {
    if (!this.pointer.next) {
      return null
    }

    this.pointer.next.previous = this.pointer
    this.pointer = this.pointer.next

    return this.pointer.value
  }

  public commit(value: T): void {
    this.pointer = new Node(value, this.pointer)
  }

  private pointer: Node<T> | null = null
}

class Node<T> {
  constructor(
    public value: T,
    public previous: Node<T> = null,
    public next: Node<T> = null
  ) {}
}
