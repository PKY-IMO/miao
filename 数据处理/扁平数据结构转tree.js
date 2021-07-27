let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 7,name:'7',pid:0},
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

function arrayToTree(items) {
  const result = [];   // 存放结果集
  const itemMap = {};  //
  for (const item of items) {
    const id = item.id;
    const pid = item.parentId;

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      }
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children']
    }

    const treeItem =  itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        }
      }
      itemMap[pid].children.push(treeItem)
    }

  }
  return result;
}



// fn=(arr,pid=0)
// =>arr.reduce((res,item)
// =>(item.pid===pid && res.push({...item,children:fn(arr,item.id)}),res),[])


const data = [
  { id: 10, pid: 0, text: "一级菜单-1" }, 
  { id: 20, pid: 0, text: "一级菜单-2" },
  { id: 30, pid: 20, text: "二级菜单-3" },
  { id: 25, pid: 30, text: "三级菜单-25" },
  { id: 35, pid: 30, text: "三级菜单-35" }
];


function array2tree(arr, id='id', pid='pid') {
  let res = []
  let map = {}
  arr.forEach(item => {
    //item.children = []
    map[item[id]] = item
  })
  arr.forEach(item => {
    if(map[item[pid]]) {
      //
      if(map[item[pid]].children == undefined) {
        map[item[pid]].children =  []
      }
      //
      map[item[pid]].children.push(item)
    }else {
      res.push(item)
    }
  })
  return res
}




function convert(data) {
  data.sort((a, b) => a.parentId - b.parentId);
  for (let i = data.length - 1; i>= 0; i--) {
      if (data[i].parentId === 0) break;
      for (let j = i - 1; j >= 0; j--) {
          if (findParent(i, j)) {
              break;
          }
      }
  }
  return data;
  function findParent(a, b) {
      if (data[a].parentId == data[b].id) {
          data[b].children = data[b].children || [];
          data[b].children.push(data.splice(a, 1));
          return true;
      }
      return false;
  }
}
// console.log(convert(data));