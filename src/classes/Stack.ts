export interface IStack<T> {
  storage: T[];
  push(item: T): void;
  pop(): T | undefined;
  size(): number;
  clear(): void;
}

class Stack<T> implements IStack<T> {
  public storage: T[] = [];

  push(item: T): void {
    this.storage.push(item);
  }

  pop(): T | undefined {
    return this.storage.pop();
  }

  clear(): void {
    this.storage = [];
  }

  size(): number {
    return this.storage.length;
  }
}

export default Stack;
