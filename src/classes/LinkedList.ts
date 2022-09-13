import LinkedListNode from "./LinkedListNode";

interface ILinkedList<T> {
  prepend(data: T): LinkedListNode<T>;
  append(data: T): LinkedListNode<T>;
  findByIndex(index: number): LinkedListNode<T> | null;
  addByIndex(index: number, data: T): LinkedListNode<T>;
  deleteByIndex(index: number): LinkedListNode<T> | null;
  deleteHead(): LinkedListNode<T> | null;
  deleteTail(): LinkedListNode<T> | null;
  toArray(): LinkedListNode<T>[];
  length(): number;
  // search(comparator: (data: T) => boolean): Node<T> | null;
}

class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null = null;
  private tail: LinkedListNode<T> | null = null;

  length(): number {
    return this.toArray().length;
  }

  findByIndex(index: number): LinkedListNode<T> | null {
    if (!this.head) return null;
    let i = 0;
    let head: LinkedListNode<T> | null = this.head;
    while (i <= index && head !== null) {
      head = head.next;
      i++;
    }
    return head;
  }
  addByIndex(index: number, data: T): LinkedListNode<T> {
    const node = new LinkedListNode(data);
    const prev = this.findByIndex(index - 1);
    if (prev) {
      node.next = prev;
      prev.next = node;
    }
    return node;
  }

  append(data: T): LinkedListNode<T> {
    const node = new LinkedListNode(data);
    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    return node;
  }

  deleteByIndex(index: number): LinkedListNode<T> | null {
    const prev = this.findByIndex(index - 1);
    const node = prev ? prev.next : null;
    if (prev) prev.next = node ? node.next : null;

    return node;
  }

  deleteHead(): LinkedListNode<T> | null {
    if (!this.head) return null;
    const node = this.head;
    this.head = this.head.next;
    return node;
  }

  deleteTail(): LinkedListNode<T> | null {
    if (!this.tail) return null;
    const node = this.tail;
    const prev = this.findByIndex(this.length() - 2);
    prev!.next = null;
    return node;
  }

  prepend(data: T): LinkedListNode<T> {
    const node = new LinkedListNode(data);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    return node;
  }

  toArray(): LinkedListNode<T>[] {
    const array: LinkedListNode<T>[] = [];
    if (!this.head) {
      return array;
    }
    const addToArray = (node: LinkedListNode<T>): LinkedListNode<T>[] => {
      array.push(node);
      return node.next ? addToArray(node.next) : array;
    };
    return addToArray(this.head);
  }
}

export default LinkedList;
