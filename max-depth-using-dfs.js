/*
  Problem: Given a n-ary tree, find its maximum depth. One node tree is considered to have depth of 1 instead of 0.

  Questions to ask:
  - Are there any restrictions on the depth of the tree?
  - How about the total number of nodes? In other words, is the tree finite?

  Algorithm:
  - DFS
*/

let maxDepth = 0;

function getDepth(root) {
  if (!root) return maxDepth;

  getMaxDepthRecursive(root, 1);

  return maxDepth;
}

function getMaxDepthRecursive(node, depth) {
  maxDepth = Math.max(depth, maxDepth);

  for (const child of node.children)
    getMaxDepthRecursive(child, depth + 1);
}
