import { EventListener } from './EventListener'
class UserEventHandler extends EventListener {
  constructor () {
    super()
    this.listen('user:fetched', this.fetched)
    this.listen('user:before-create', this.beforeCreate)
    this.listen('user:created', this.created)
    this.listen('user:before-update', this.beforeUpdate)
    this.listen('user:updated', this.updated)
    this.listen('user:before-destroy', this.beforeDestroy)
    this.listen('user:destroyed', this.destroyed)
  }

  fetched (payload) {
    console.log('User fetched EventListener in app/listeners/UserEventListener.js ', payload)
  }
}

export default UserEventHandler
