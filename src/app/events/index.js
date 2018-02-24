import Vue from 'vue'

export class EventDispatcher {
  constructor () {
    this.evt = new Vue()
  }

  listen (evt, callback) {
    this.evt.$on(evt, callback)
  }

  fire (evt, data = null) {
    this.evt.$emit(evt, data)
  }
}

export const EventEmitter = new EventDispatcher()
