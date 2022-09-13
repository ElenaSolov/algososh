import { ElementStates } from "../types/element-states";

class LinkedListNode<T> {
  public value: T;
  public next: LinkedListNode<T> | null;
  public state: ElementStates;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.state = ElementStates.Default;
  }
}

export default LinkedListNode;
