import LinkedListNode from "./LinkedListNode";

export interface ILinkedList<T> {
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
    console.log(index);
    if (!this.head) return null;
    let i = 0;
    let head: LinkedListNode<T> | null = this.head;
    while (i < index && head !== null) {
      head = head.next;
      i++;
      console.log(head, i);
    }

    return head;
  }
  addByIndex(index: number, data: T): LinkedListNode<T> {
    const node = new LinkedListNode(data);
    const prev = this.findByIndex(index - 1);
    console.log(prev);
    if (prev) {
      node.next = prev.next;
      prev.next = node;
    }
    return node;
  }

  append(data: T): LinkedListNode<T> {
    const node = new LinkedListNode(data);
    if (!this.tail) {
      console.log(1);
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
    console.log(this);
    return node;
  }

  deleteTail(): LinkedListNode<T> | null {
    if (!this.tail) return null;
    const node = this.tail;
    if (this.tail === this.head) {
      this.head = null;
      this.tail = null;
    } else {
      const prev = this.findByIndex(this.length() - 2);
      prev!.next = null;
      this.tail = prev;
    }
    return node;
  }

  prepend(data: T): LinkedListNode<T> {
    const node = new LinkedListNode(data);
    if (!this.head) {
      console.log("!head");
      this.head = node;
      this.tail = node;
    } else {
      console.log("head");
      node.next = this.head;
      this.head = node;
      console.log(this.head);
    }
    return node;
  }
  toArray(): LinkedListNode<T>[] {
    const array: LinkedListNode<T>[] = [];
    console.log(this);
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
