/*
  Problem: Given a n-ary tree, find its maximum depth. One node tree is considered to have depth of 1 instead of 0.

  Questions to ask:
  - Are there any restrictions on the depth of the tree?
  - How about the total number of nodes? In other words, is the tree finite?

  Algorithm:
  - BFS. A recursive DFS is more elegant. Will cover that later.
*/

const Q = require('./lib/queue');

function getDepth(root) {
  if (root === null || root === undefined) return 0;
  if (root.children.length === 0) return 1;

  const frontier = new Q();
  frontier.enqueue({ ...root, depth: 1 });

  while (!frontier.isEmpty) {
    const node = frontier.dequeue();

    for (let child of node.children)
      frontier.enqueue({ ...child, depth: node.depth + 1 });

    const isLastNode = frontier._length === 1 && frontier.peek().children.length === 0;
    if (isLastNode) return frontier.peek().depth;
  }

  throw new Exception('Something went wrong!');
}
