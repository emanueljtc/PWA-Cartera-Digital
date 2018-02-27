import { uid } from 'quasar'
import OAuth from '@app/oauth'

export default class SyncControler {
  constructor (AjaxService, DBService) {
    this.service = AjaxService
    this.http = new AjaxService().http
    this.table = DBService
    this.oauth = new OAuth()
  }

  async create (payload) {
    if (!this.supportIndexedDB()) {
      payload.uuid = uid()
      return this.service.create(payload)
    } else {
      const item_id = await this.table.add(payload)
      if (this.supportIndexedDB()) {
        const queue = this.createObjectToQueue(item_id, payload)
        console.log(queue)
      }
    }
  }

  createObjectToQueue (item_id, payload) {
    const { uuid } = payload
    const new_queue = {
      payload,
      uuid,
      headers: this.getHeadersFromHttpProvider(),
      api_url: this.routeForCreate(),
      status: 'pending',
      retries: 0,
      sequence_number: item_id
    }
    return new_queue
  }

  getHeadersFromHttpProvider () {
    return Object.assign(this.http.defaults.headers.common, {
      Authorization: this.oauth.getAuthHeader()
    })
  }

  routeForCreate () {
    return ''
  }

  supportIndexedDB () {
    return 'indexedDB' in window
  }

  supportServiceWorker () {
    return 'serviceWorker' in navigator
  }
}
