//链表构建队列和栈，
//栈的增加\删除\查看栈顶元素 new node --> head
//队列的增加\删除  tail--> new node  删除要主要为空的情况

function ListNode(val) {
  this.val = val 
  this.next = next
}

function Stack() {
  this.head = null
  this._size = 0
}

// 往栈顶增加一个元素
Stack.prototype.push = function(val) {
  let node = new ListNode(val)
  node.next = this.head
  this.head = node
  this._size++
  return this
}
// 从栈顶删除并返回一个元素
Stack.prototype.pop = function() {
  if(this.head) {
    let node = this.head
    this.head = this.head.next
    this._size--
    return node
  } else {
    return undefined
  }
}
// 查看栈顶元素，不删除
Stack.prototype.peek = function() {
  if(this.head) {
    let val = this.head.val
    return val
  }else {
    return undefined
  }
}

function Queue() {
  this.head = null
  this.tail = null
  this._size = 0
}

// 往队列里增加一个元素
Queue.prototype.enqueue = function(val) {
  let node = new ListNode(val)
  if(this.head) {
    this.tail.next = node
    this.tail = node
  }else{
    this.head = node
    this.tail = node
  }
  this._size++
}
// 从队列中删除并返回一个元素
Queue.prototype.dequeue = function() {
  if(this.head){
    let node = this.head
    this.head = this.head.next
    if(this.head == null) this.tail = null //关键！！
    this._size--
    return node
  }

}
