function getSWPath () {
  return window.location.origin + "/statics/offline-sw.js" // eslint-disable-line
}

export async function dispatchToSw (payload) {
  try {
    let serviceWorker = await getSW()
    sendToSW(serviceWorker, payload)
  } catch (error) {
    console.log(error)
  }
}

function sendToSW (serviceWorker, payload) {
  return new Promise((resolve, reject) => {
    var messageChannel = new MessageChannel()
    messageChannel.port1.onmessage = function (event) {
      if (event.data.error) {
        reject(event.data.error)
      } else {
        resolve(event.data)
      }
    }
    serviceWorker.active.postMessage(
      {
        payload
      },
      [messageChannel.port2]
    )
  })
}

async function getSW () {
  const origin = getSWPath()
  try {
    let serviceWorkers = await navigator.serviceWorker.getRegistrations()
    const availableSWs = serviceWorkers.filter(
      sw => sw.active && (sw.active.scriptURL === origin)
    )
    if (availableSWs.length > 0) {
      return new Promise((resolve, reject) => resolve(availableSWs[0]))
    }
    const valid = {
      valid: false
    }
    return new Promise((resolve, reject) => reject(valid))
  } catch (error) {
    console.log(error)
  }
}

// (async function initListeners () { // eslint-disable-line
//   if ('serviceWorker' in navigator) {
//     // Handler for messages coming from the service worker
//     let serviceWorkers = await navigator.serviceWorker.getRegistrations()

//     serviceWorkers.forEach(serviceWorker => {
//       serviceWorker.addEventListener('message', function (event) {
//         console.log('Client 1 Received Message: ' + event)
//         // event.ports[0].postMessage("Client 1 Says 'Hello back!'");
//       })
//     })
//   }
// })()
