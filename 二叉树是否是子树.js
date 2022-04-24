//判断一棵树r2是否是另一棵树r1的子树？（这两棵树都是二叉树） 
function isChild(root1, root2) {
  // 判断这两个树是否一样的
  function isSame(r1, r2) {
    if (!r1 && !r2) return true
    if (!r1 || !r2 || r1.val !== r2.val) return false
    return isSame(r1.left, r2.left) && isSame(r1.right, r2.right)
  }
  if (!root1 && !root2) return true
  if (isSame(root1, root2)) return true
  if ( !root1 || !root2 || root1.val !== root2.val) return false
  return isChild(root1.left, root2) || isChild(root1.right, root2)
}