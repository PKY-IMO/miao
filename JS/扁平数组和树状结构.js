let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
  {id: 6, name: 'duo', pid: -1}
]

// 要求输出:
// [
//   {
//       "id": 1,
//       "name": "部门1",
//       "pid": 0,
//       "children": [
//           {
//               "id": 2,
//               "name": "部门2",
//               "pid": 1,
//               "children": []
//           },
//           {
//               "id": 3,
//               "name": "部门3",
//               "pid": 1,
//               "children": [
//                   // 结果 ,,,
//               ]
//           }
//       ]
//   }
// ]

//map 支持多个根节点 √
function list2tree(list) {
  let res = []
  let map = {}
  list.forEach(node=> {
    node.children = []
    map[node.id] = node
  })
  list.forEach(node=> {
    if(map[node.pid]) {
      map[node.pid].children.push(node)
    }else {
      res.push(node)
    }
  })
  return res
}


console.log(list2tree(arr))

// 每个孩子需要携带层级信息
function list2treeWithLevel(list, parent = 0, level = 0) {
  let res = []
  for (let node of list) {
    if(node.pid === parent) {
      node.level = level
      let children = list2treeWithLevel(list, node.id, level+1)
      if(children.length) node.children = children
      res.push(node)
    }
  }
  return res
}

//tree = list2tree(arr)


//树形结构转扁平数组 √
function tree2List(tree) {
  let res = []
  let stack = []
  stack = stack.concat(tree)
  while(stack.length) {
    let size = stack.length
    for (let i = 0; i < size; i++) {
      let node = stack.shift()
      if(node.children) {
        stack = stack.concat(node.children)
        delete node.children
      }
      res.push(node)
    }
  }
  return res
}




let tree = {
    value: 2,
    left: {
        value: 3,
        left: null,
        right: {
          value: 5,
          left: null,
          right: null
        },
    },
    right: {
        value: 4,
        left: {
          value: 6,
          left: null,
          right: null
        },
        right: {
          value: 7,
          left: {
            value: 8,
            left: null,
            right: null
          },
          right: null
        }
    },
};
 
// 二叉树
    //     2
    // 3        4
    //   5    6   7
    //          8

function leftSideView(tree) {
  let res = []
  let stack = []
  stack = stack.concat(tree)
  while(stack.length) {
    let size = stack.length
    let tmp = []
    for(let i = 0; i < size; i++) {
      let node = stack.shift()
      tmp.push(node.value)
      if(node.left !== null) stack.push(node.left)
      if(node.right !== null) stack.push(node.right)
    }
    res.push(tmp[0])
  }
  return res
}

console.log(leftSideView(tree))
 