import { AppEvent } from 'app-events'

export default function fire (eventName, payload) {
  if (eventName) {
    AppEvent.fire(eventName, payload)
  } else {
    console.warn('Specify an event name')
  }
}
