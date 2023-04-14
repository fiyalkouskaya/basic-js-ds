const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    
    if (this.rootNode === null) {
      this.rootNode = newNode;
    } else {
      let currentNode = this.rootNode;

      while (true) {
        if (currentNode && data < currentNode.data) {
          if (currentNode.leftChild === null) {
            currentNode.leftChild = newNode;
            break;
          } else {
            currentNode = currentNode.leftChild;
          }
        } else if (currentNode && data > currentNode.data) {
          if (currentNode.rightChild === null) {
            currentNode.rightChild = newNode;
            break;
          } else {
            currentNode = currentNode.rightChild;
          }
        } else {
          break;
        }
      }
    }
  }

  has(data) {
    let currentNode = this.rootNode;

    while (currentNode) {
      if (data === currentNode.data) {
        return true;
      } else if (data < currentNode.data) {
        currentNode = currentNode.leftChild;
      } else {
        currentNode = currentNode.rightChild;
      }
    }

    return false;
  }

  find(data) {
    if (!this.rootNode) {
      return null;
    }
  
    let currentNode = this.rootNode;
    let parentNode = null;
    let node = null;
  
    while (currentNode) {
      if (data === currentNode.data) {
        node = currentNode;
        break;
      } else if (data < currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.leftChild;
      } else {
        parentNode = currentNode;
        currentNode = currentNode.rightChild;
      }
    }
  
    if (node) {
      this.parentNode = parentNode;
    }
    return node;
  }
  
  
  remove(data) {
    let currentNode = this.rootNode;
    let parentNode = null;
  
    while (currentNode) {
      // Node has been found
      if (data === currentNode.data) {
  
        // Node has no children
        if (!currentNode.leftChild && !currentNode.rightChild) {
          if (parentNode) {
            if (parentNode.leftChild === currentNode) {
              parentNode.leftChild = null;
            } else {
              parentNode.rightChild = null;
            }
          } else {
            this.rootNode = null;
          }
        }
  
        // Node has one child
        else if (!currentNode.leftChild || !currentNode.rightChild) {
          const childNode = currentNode.leftChild || currentNode.rightChild;
  
          if (parentNode) {
            if (parentNode.leftChild === currentNode) {
              parentNode.leftChild = childNode;
            } else {
              parentNode.rightChild = childNode;
            }
          } else {
            this.rootNode = childNode;
          }
        }
  
        // Node has two children
        else {
          // Find successor node (leftmost node in right subtree)
          let successorNode = currentNode.rightChild;
          let successorParentNode = null;
  
          while (successorNode.leftChild) {
            successorParentNode = successorNode;
            successorNode = successorNode.leftChild;
          }
  
          // If successor node is not the right child of the node
          if (successorParentNode !== currentNode) {
            successorParentNode.leftChild = successorNode.rightChild;
            successorNode.rightChild = currentNode.rightChild;
          }
  
          // Promote successor node to replace the node 
          successorNode.leftChild = currentNode.leftChild;
  
          if (parentNode) {
            if (parentNode.leftChild === currentNode) {
              parentNode.leftChild = successorNode;
            } else {
              parentNode.rightChild = successorNode;
            }
          } else {
            this.rootNode = successorNode;
          }
        }
  
        return true;
      } else if (data < currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.leftChild;
      } else {
        parentNode = currentNode;
        currentNode = currentNode.rightChild;
      }
    }
  
    // Node was not found
    return false;
  }

  min() {
    if (!this.rootNode) {return null;}

    let currentNode = this.rootNode;
    while (currentNode.leftChild) {
      currentNode = currentNode.leftChild;
    }

    return currentNode.data;
  }

  max() {
    if (!this.rootNode) {return null;}

    let currentNode = this.rootNode;
    while (currentNode.rightChild) {
      currentNode = currentNode.rightChild;
    }

    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};