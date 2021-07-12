function createListNode(val) {
  return {
    val: val,
    next: null
  }
}

function arrayToList(array) {
  var headPrev = createListNode(0)
  var temp = headPrev
  for (let i = 0; i < array.length; i++) {
    temp.next = createListNode(array[i])
    temp = temp.next
  }
  return headPrev.next

}

function arrayToList2(array) {
  if (array.length == 0) return null
  var node = createListNode(array[0])
  node.next =  arrayToList2(array.slice(1))
  return node
}

function listToArray(node) {
  var arr = []
  var p = node
  while(p) {
    arr.push(p.val)
    p = p.next

  }
  return arr
}

function listToArray2(head) {
  if (!head) {
    return []
  }
  return  [head.val].concat(listToArray2(head.next))

}

function listToArray3(head, ary = [], pos = 0) {
  if (!head) {
    return ary
  } 
  ary[pos] = head.val
  listToArray3(head.next, ary, pos + 1)
  return ary
}

function prepend(val, head) {
  node = createListNode(val)
  node.next = head
  return node
}

function append(val, head) {
  var node = createListNode(val)
  var p = head
  if (!head) {
    return node
  }
  while (p.next) {
    p = p.next
  }
  p.next = node
  return head
}

function append(val, head) {
  if (!head) {
    return createListNode(val)
  }
  head.next = append(val, head.next)
  return head
}

//返回链表第n个结点的值
function nth(head, n) {
  var t = 0
  var p = head
  while (p) {
    if (n == t) return p.val
    p = p.next
    t ++
  } 
  return undefined
}

function nth2(l, n) {
  if (!l) {
    return undefined
  }
  if (n == 0) {
    return l.val
  }
  return nth2(l.next,n-1)
}


var node1 = arrayToList([1,2,3])
var list1 = listToArray(node1)
console.log(list1)