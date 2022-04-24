// useThrottle
function useThrottle(func, time) {
  var lastTime = React.useRef(0) // 变量有很多个，但是变量对应的ref就一个
  var ref  = React.useRef()
  ref.current = func

  // 新的ref变量与旧的ref变量，指向同一个ref对象
  return useCallback(function(...args) { // 第一次作用域的值
    var now = Date.now()
    if (now - lastTime.current > time) {
      ref.current(...args)
      lastTime.current = now
    }
  }, [])
}

/// 使用lodash的throttle
function useThrottle(func, time) {
  var ref  = React.useRef()
  ref.current = func

  return useMemo(() => {
    return _.throtttle(function(...args) {
      ref.current(...args)
    }, time)
  }, [time])
}


// 最终版本
function useThrottle(func, time) {
  var lastTimeRef = React.useRef(0) // 指向上一次运行时间的ref
  var ref  = React.useRef() // 指向调用函数的ref
  var timeRef = React.useRef() // 指向间隔时间的ref，间隔时间可能变化
  
  ref.current = func
  timeRef = time

  // 新的ref变量与旧的ref变量，指向同一个ref对象
  return useCallback(function(...args) { // 第一次作用域的值
    var now = Date.now()
    if (now - lastTimeRef.current > timeRef.current) {
      lastTimeRef.current = now
      return ref.current(...args)
    }
  }, [])
}