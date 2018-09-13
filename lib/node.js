class Node {
  constructor() {
    this._children = [];
  }

  get children() {
    return this._children;
  }
}

module.exports = Node;
