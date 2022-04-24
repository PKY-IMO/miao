const tasks = [
  {id: 1, time: 10},
  {id: 2, time: 8, prevId: 1},
  {id: 3, time: 6},
  {id: 4, time: 3, prevId: 2},
  {id: 5, time: 9, prevId: 4}
 ];
 function clacTime(tasks) {
   function list2tree(list) {
     let res = []
     let map = {}
     list.forEach(node=> {
       map[node.id] = node
     })
     list.forEach(node=> {
       if(map[node.prevId]) {
         map[node.prevId].children = node
       }else {
         res.push(node)
       }
     })
     return res
   }
   function count(obj) {
     let tmp = 0
     tmp += obj.time
     if (obj.children) {
       tmp += count(obj.children)
     }
     return tmp
   }
   let treeArr = list2tree(tasks)
   let time = 0
   treeArr.forEach(task=> {
     let tmp = count(task)
     time = Math.max(tmp, time)
   })
   return time
 }
 console.log(clacTime(tasks))
function list2tree(list) {
  let res = []
  let map = {}
  list.forEach(node=> {
    map[node.id] = node
  })
  list.forEach(node=> {
    if(map[node.prevId]) {
      map[node.prevId].children = node
    }else {
      res.push(node)
    }
  })
  return res
}
console.log(list2tree(tasks))