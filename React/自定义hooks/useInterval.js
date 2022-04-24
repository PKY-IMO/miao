function useInterval(func, time) {
  var ref = React.useRef()
  ref.current = func // 可用useEffect包裹，但是意义不大
  
  useEffect(() => {
    var id = setInterval(() => {
      var f = ref.current
      f()
    }, time)
    return () => clearInterval(id)
  }, [time])
}