/*
  Problem: Consider all the leaves of a binary tree.  From left to right order, the values of those leaves form a leaf value sequence.
  Two binary trees are considered leaf-similar if their leaf value sequence is the same.

  Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.

  Algorithm:
  - Save all the leaf nodes of root 1 to a stack via recursive approach (tree is traversed from left to right with recursive approach).
  - Traverse root2 with iterative approach (tree is traversed from right to left with the iterative approach)
    - if leaf node
        - if root 1 stack is empty, return false (case where root2's leaf count > root1's leaf count)
        - if leaf node != root1Stack.pop(), return false
  - If root 1 stack is not empty, return false (case where root2's leaf count < root 1's leaf count)
  - return true;

This algorithm will not require you to traverse all the nodes of root2 and return immediately if the two leaf nodes are not equal.
*/

var leafSimilar = function (root1, root2) {
  const root1Stack = [];
  // Recursive DFS
  populateStack(root1);

  // iterative DFS
  const root2Stack = [root2];
  while (root2Stack.length !== 0) {
    const node2 = root2Stack.pop();

    if (node2.left !== null) root2Stack.push(node2.left);
    if (node2.right !== null) root2Stack.push(node2.right);
    if (isLeafNode(node2)) {
      if (root1Stack.length === 0) return false;
      const node1 = root1Stack.pop();
      if (node1.val !== node2.val) return false;
    }
  }
  if (root1Stack.length !== 0) return false;

  return true;

  function populateStack(n) {
    if (isLeafNode(n)) root1Stack.push(n);

    if (n.left !== null) populateStack(n.left);
    if (n.right !== null) populateStack(n.right);
  }

  function isLeafNode(n) {
    return n.left === null && n.right === null;
  }
};
