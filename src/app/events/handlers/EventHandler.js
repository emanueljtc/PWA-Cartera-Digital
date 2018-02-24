import { EventEmitter } from 'src/app/events'
export class EventHandler {
  constructor () {
    this.evt = EventEmitter.evt
    this.fire = EventEmitter.fire
    this.listen = EventEmitter.listen
  }

  fetched (user) { }

  beforeCreate (user) { }
  created (user) { }

  beforeUpdate (user) { }
  updated (user) { }

  beforeDelete (user) { }
  deleted (user) { }
}
