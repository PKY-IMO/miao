// 找到n属于第几个斐波那契数
function findFibonacciIndex(n) {
  const fibMap = new Map()
  fibMap.set(0, 1)
  fibMap.set(1, 1)
  for (let i = 0; i <= n; i++) {
    if (fibMap.has(i)) {
      if (fibMap.get(i) === n) return i
    } else {
      fibMap.set(i, fibMap.get(i-1) + fibMap.get(i-2))
      if (fibMap.get(i) === n) return i
      if (fibMap.get(i) > n) return -1
    }
  }
}

// 公共父组件
function findParentDirectory(paths) {
  // write your code here ...

  let len = paths.length
  // '/home/admin/vue' => ['','home','admin','vue'] 
  let pathsArr = paths.map(path => path.split('/'))
  let index = 1
  while(index < pathsArr[0].length) {
    let path = pathsArr[0][index]
    let j = 0
    while( j < len) {
      let comparePath = pathsArr[j][index]
      if (comparePath === path) {
        j++
      } else {
        break
      }
		}
    if (j === len) {
      index++
		} else {
      break
    }
  }
  return index > 1 ? pathsArr[0].slice(0, index).join('/') : null
}

// 找到n以下的所有勾股数
function find(n) {
  // todo
  // return ['3,4,5', '5,12,13'];
  let res = []
  for (let i = 3; i <= n; i++) {
    for (let j = i+1; j <= n; j++) {
      let k = Math.sqrt(i*i + j*j)
      // 为整数 且 不超过
      if (k % 1 === 0 && k <= n) {
        res.push(i+','+j+','+k)
      }
      if (k > n) break;
    }
  }
  return res
}

// 实现计算器
function myCalculator(num) {
  // todo
  function Calc(num) {
    this.num = num
    this.getValue = () => {
      return this.num
    }
    this.add = (x) => {
      this.num = this.num + x
      return this
    }
    this.minus = (x) => {
      this.num = this.num  - x
      return this
    }
    this.div = (x) => {
      this.num = this.num / 4
      return this
    }
    this.multi = (x) => {
      this.num = this.num * x
      return this
    }
	}
  return new Calc(num)
}

// .card .subtitle{
//   display: -webkit-box;
//   font-size: 0.22rem;
//   max-width: 3.0rem;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   -webkit-line-clamp: 2;
//   -webkit-box-orient: vertical;
// /*   font-weight: bold; */
// }