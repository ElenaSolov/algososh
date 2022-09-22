import { ElementStates } from "../types/element-states";

export interface ILinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  state: ElementStates;
}
class LinkedListNode<T> implements ILinkedListNode<T> {
  public value;
  public next: LinkedListNode<T> | null;
  public state: ElementStates;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.state = ElementStates.Default;
  }
}

export default LinkedListNode;
