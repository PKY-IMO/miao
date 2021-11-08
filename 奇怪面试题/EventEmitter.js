class EventEmitter {
  constructor() {
    this._listeners = {}
  }
  on(eventName, eventHandler) {
    if (!(eventName in this._listeners)) {
      this._listeners[eventName] = []
    }
    this._listeners[eventName].push(eventHandler)

    return this
  }
  off(eventName, eventHandler) {
    var handlers = this._listeners[eventName] || []
    for (var i = 0; i < handlers.length; i++) {
      if (handlers[i] == eventHandler) {
        handlers.splice(i, 1)
      }
    }
  }
  once(eventName, eventHandler) {
    this.on(eventName, function f(...args) {
      this.off(eventName, f)
      eventHandler.call(this, ...args)
    })
  }
  emit(eventName, ...eventArgs) {
    var handlers = this._listeners[eventName] || []
    for (var handler of handlers) {
      handler.call(this, ...eventArgs)
    }
  }
}