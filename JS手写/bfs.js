function bfs(node) {
  var arr = []
  if(node != null) { 
    var queue = []
    queue.unshift(node)
    while(queue.length != 0) { 
      var item = queue.shift()
      arr.push(item);
      var children = item.children;
      for(var i=0; i<children.length; i++) {  
        queue.push(children[i]); 
      }
    }
  } 
  return arr; 
}