class PriorityQueue {
  constructor() {
    this.elements = []
  }
  _swap(i, j) {
    var t = this.elements[i]
    this.elements[i] = this.elements[j]
    this.elements[j] = t
  }
  heapUp(idx) {
    while (idx > 0) {
      var pidx = (idx -1) >> 1
      if (this.elements[pidx] < this.elements[idx]) {
        this._swap(pidx,idx)
        idx = pidx
      }else {
        return
      }
    }
  }
  heapDown(idx) {
    var l = this.elements.length
    while (idx < l) {
      let maxIdx = idx
      let lIdx = idx * 2 + 1
      let rIdx = idx * 2 + 2
      if(lIdx < l && this.elements[lIdx] > this.elements[maxIdx]) {
        maxIdx = lIdx

      }
      if (rIdx < l && this.elements[rIdx] > this.elements[maxIdx]) {
        maxIdx = rIdx
      }
      if (maxIdx !== idx) {
        this._swap(max, idx)
        idx = maxIdx
      }else {
        return
      }
    }

  }
  push(val) {
    this.elements.push(val)
    this.heapUp(this.elements.length - 1)
    return this
  }
}