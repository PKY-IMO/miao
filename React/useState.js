

// 由函数映射到其状态对象
var funcStateMap = new Map() // {f: [[name,setName],[age,setAge]] }
var currentReadingState = null
var useStateRunCount = 0 // 记录在一个函数内useSate的运行次数
var currentFuncFirstRun // 记录是否第一次运行
var currentRunningFunc

function useState(initVal) {
  var state = currentReadingState
  var idx = useStateRunCount++
  var f = currentRunningFunc
  // function setState(val) {// 为当前state创建设置它的函数
  //   state[idx] = val
  //   Promise.resolve().then(() => {
  //     run(f)
  //   })
  // }
  if (currentFuncFirstRun) {
    var setState = function(val) {// 为当前state创建设置它的函数
      state[idx][0] = val
      Promise.resolve().then(() => {
        run(f)
      })
    }
    state[idx] = [initVal, setState]
    return state[idx]
  } else {
    return state[idx]
  }
}

function run(f) {
  if (!funcStateMap.has(f)) {// 第一次运行为其创建state
    var state = []
    currentFuncFirstRun = true
    funcStateMap.set(f, state)
  } else {// 不是则查出state
    currentFuncFirstRun = false
    state = funcStateMap.get(f)
  }
  currentReadingState = state
  useStateRunCount = 0
  currentRunningFunc = f
  f()
}

