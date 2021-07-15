//二叉搜索树
//任意一个结点 左边所有结点小于它，右边所有结点大于它
//1.中序遍历 升序排列  2.逆中序遍历 降序排列
//2.不平衡 n*logn 最差 n*n

function bstSort(array) {
  var bst = null
  for (var i = 0; i < array.length; i++) {
    bst = insertTntoBST(bst,array[i])
  }

  var i = 0
  inOrderTraverse(bst, val =>{
    arr[i++] = val
  })
  return array
}

function createTreeNode(val) {
  return {
    val: val,
    left: null,
    right: null
  }
}

function insertTntoBST2(bst, val) {

}

//将val 插入bst中
function insertTntoBST(bst, val) {
  if (!bst) {
    return createTreeNode(val)
  }else {
    if(val < bst.val){
      bse.left = insertTntoBST(bst.left, val)
    }else {
      bse.right = insertTntoBST(bst.right, val)
    }
    return bst
  }
}

function inOrderTraverse(root, action) {
  if (root) {
    inOrderTraverse(root.left, action)
    action(root.val)
    inOrderTraverse(root.right, action)
  }
}
