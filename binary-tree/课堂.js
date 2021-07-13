/**
 * 在任意二叉树中，空子树的数量比非空结点的数量多1
 * 
 * 二叉树的表示：
 *  二叉链表：
 *  数组表示：将二叉树所有空点补满为满二叉树，从上到下，从左到右将节点放入数组
 *        根节点在第一项，在下标n的结点的两个子节点的位置为2n+1和2n+2
 *        下标为m的结点其父节点在floor((m-1)/2)的位置
 * 
 */

function createTreeNode(val) {
  return {
    val: val,
    left: null,
    right: null
  }
}

// 将数组转换成二叉链表
function arrToTree(arr, rootIdx = 0) {
    let rootVal = arr[rootIdx]
    if (rootVal == null) return null // undefined === null false
    var rootNode = createTreeNode(rootVal)
    
    var leftIdx = 2 * rootIdx + 1
    var rightIdx = 2 * rootIdx + 2
    rootNode.left = arrToTree(arr, leftIdx)
    rootNode.right = arrToTree(arr, rightIdx)

    return rootNode
}


// 将使用二叉链表表示的二叉树转换为数组表示
function tree2array(root) {
  var ary = []
  return treeToArray(root, 0, ary)
}
function treeToArray(tree, idx = 0, ary) {  
  if (tree) {
    ary[idx] = tree.val
    treeToArray(tree.left, idx * 2 + 1, ary)
    treeToArray(tree.right, idx * 2 + 2, ary)
  }
  return ary
}

function treeToCondenseArray(root) {
  var nodes = [root]
  var result = []
  while(nodes.length) {
    let size = nodes.length
    for (let i = 0; i < size; i++) {
      let node = nodes.shift()
      result.push(node.val)
      if (node.left) nodes.push(node.left)
      if (node.right) nodes.push(node.right)
    }
  }
  return result
}

function cArrayToTree(arr) {
  if(arr.length == 0) return null
  var root = createTreeNode(arr[0])
  var queue = [root]
  for(let i = 1; i < arr.length; i++) {
    var target = queue.shift()
    if (arr[i] != null) {
      var left = createTreeNode(arr[i])
      target.left = left
      queue.push(left)
    }else {
      target.left = null
    }
    i++
    if(arr[i] != null) {
      var right = createTreeNode(arr[i])
      target.right = right
      queue.push(right)
    }else {
      target.right = null
    }

  }
  return root
}

function isSameTree(r1, r2) {

}

function treeToKuoHao(tree) {
  if (tree == null) return ''
  let val = tree.val
  let res = ''
  res += val
  res += '('+ treeToKuoHao(tree.left) + ')'
  res += '(' + treeToKuoHao(tree.right) + ')'
  return res
}

function treeToKuoHao(tree) {
  if (tree) {
    if (tree.left == null && tree.right == null) {
      return '' + tree.val
    }
    return tree.val + '(' + treeToKuoHao(tree.left) + ')(' + treeToKuoHao(tree.right) + ')'
  } else {
    return ''
  }
}

//二叉树的遍历
//前序： 中左右，第一次遇见
//中序： 扫描法，第二次遇见
//后序： 最后一次遇见

function preOrderTraverse(root, action) {
  if (root) {
    action(root.val)
    preOrderTraverse(root.left, action)
    preOrderTraverse(root.right, action)
  }
}

function inOrderTraverse(root, action) {
  if (root) {
    preOrderTraverse(root.left, action)
    action(root.val)
    preOrderTraverse(root.right, action)
  }
}

function postOrderTraverse(root, action) {
  if (root) {
    preOrderTraverse(root.left, action)
    preOrderTraverse(root.right, action)
    action(root.val)
  }
}


