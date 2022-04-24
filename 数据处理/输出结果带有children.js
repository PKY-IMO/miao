let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 7, name: '7', pid:0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
]

// 要求输出：
// (6) [{…}, {…}, {…}, {…}, {…}, {…}]
// 0: {id: 1, name: '部门1', pid: 0, children: Array(2)}
// 1: {id: 7, name: '7', pid: 0, children: Array(0)}
// 2: {id: 2, name: '部门2', pid: 1, children: Array(0)}
// 3: {id: 3, name: '部门3', pid: 1, children: Array(1)}
// 4: {id: 4, name: '部门4', pid: 3, children: Array(1)}
// 5: {id: 5, name: '部门5', pid: 4, children: Array(0)}

function convert (data) {
  const m = new Map()
  data.forEach(node => {
      m.set(node.id, node)
      node.children = []
  })
  data.forEach(node => {
      const parent = m.get(node.pid)
      if (parent) {
          parent.children.push(node)
      }
  })
}
convert(arr)

