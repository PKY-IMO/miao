function useDebounce(value, delay = 300) {
  const [ debouncedValue, setDebouncedValue ] = useState(value)
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}