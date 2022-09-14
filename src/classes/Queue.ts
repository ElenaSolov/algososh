export interface IQueue<T> {
  enqueue(value: T): void;
  dequeue(): void;
  getStorage(): Array<T | undefined>;
  clear(): void;
  getHead(): number;
  getTail(): number;
}

class Queue<T> implements IQueue<T> {
  private storage: Array<T | undefined> = [...Array(this.capacity)];
  private head: number = -1;
  private tail: number = -1;

  constructor(private capacity: number = Infinity) {}

  getHead() {
    return this.head;
  }
  getTail() {
    return this.tail;
  }
  getStorage(): Array<T | undefined> {
    return this.storage;
  }

  clear(): void {
    this.head = -1;
    this.tail = -1;
    this.storage = [...Array(this.capacity)];
  }

  dequeue(): void {
    this.storage[this.head] = undefined;
    if (this.head < this.capacity - 1) this.head++;
  }

  enqueue(value: T): void {
    if (this.head === -1) this.head++;
    if (this.head === this.capacity) {
      throw new Error("Очередь переполнена");
    }
    this.tail++;
    this.storage[this.tail] = value;
  }
}

export default Queue;
