import { AppEvent } from '@events'
export class EventListener {
  constructor () {
    this.evt = AppEvent.evt
    this.fire = AppEvent.fire
    this.listen = AppEvent.listen
  }

  fetched (user) { }

  beforeCreate (user) { }
  created (user) { }

  beforeUpdate (user) { }
  updated (user) { }

  beforeDelete (user) { }
  deleted (user) { }
}
