class EventEmitter {
  constructor() {
    this.events = []
  }

  on(type, cb) {
    if (!this.events[type]) this.events[type] = []
    this.events[type].push(cb)
  }

  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach(cb  => {
        cb(...args)
      })
    }
  }

  off(type, cb) {
    if (this.events[type]) {
      const index = this.events[type].indexOf(cb)
      if (index > -1) {
        this.events[tpye].slice(index , 1)
      }
    }
  }
}