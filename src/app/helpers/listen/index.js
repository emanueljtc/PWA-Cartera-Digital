import { AppEvent } from '@events'

export default function listen (eventName, cb) {
  if (eventName) {
    AppEvent.listen(eventName, cb)
  } else {
    console.warn('Specify listener name')
  }
}
