/**
 * Simple queue data structure for JavaScript. It exposes the following properties and methods:
 * Properties:
 * - isEmpty
 * - size
 * 
 * Methods:
 * - enqueue(item)
 * - dequeue()
 * - peek
 */
class Queue {
  constructor(size = 10) {
    this.array = new Array(size);
    this._length = 0;

    this.front = 0;
    this.back = 0;
  }

  enqueue(item) {
    this.array[this.back] = item;

    ++this.back;
    ++this._length;

    if (this.back > this.array.length - 1) this.back = 0;
    if (this.back === this.front) this.expandArray();    
  }

  dequeue() {
    if (this.isEmpty) return new Error("Cannot dequeue to an empty queue.");

    const itemToDequeue = this.array[this.front];
    ++this.front;
    --this._length;

    if (this.front > this.array.length - 1) this.front = 0;
    return itemToDequeue;
  }

  expandArray() {
    const newArray = new Array(this.array.length * 2);
    let newArrayIndex = 0;
    for (let i = this.front; i < this.array.length; i++) {
      newArray[newArrayIndex] = this.array[i];
      ++newArrayIndex;
    }

    for (let i = 0; i < this.front; i++) {
      newArray[newArrayIndex] = this.array[i];
      ++newArrayIndex;
    }

    this.front = 0;
    this.back = this.array.length;

    this.array = newArray;
  }

  peek() {
    return this.array[this.front];
  }

  get isEmpty() {
    return this._length === 0;
  }

  get length() {
    return this._length;
  }
}

module.exports = Queue;
