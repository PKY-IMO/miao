let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
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


let map = new Map()
for (let item of arr) {
  if (map.get(item.pid)) {
    map.get(item.pid).children.push(item)
    map.set(item.pid, map.get(item.pid))
  }
  if (!map.get(item.pid)) {
    item.children = []
    map.set(item.id, item)
  }
}
return map.get(1)

fn=(arr,pid=0)
=>arr.reduce((res,item)
=>(item.pid===pid && res.push({...item,children:fn(arr,item.id)}),res),[])