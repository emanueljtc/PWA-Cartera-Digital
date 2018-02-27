window = self // eslint-disable-line
importScripts('../js/vendor.js') // eslint-disable-line
importScripts('../js/database.js') // eslint-disable-line

// function checker (params) {
//   setTimeout(() => {
//     checkData()
//   }, 6000)
// }

const names = ['--', 'Cesar', 'Pilly', 'MaryPily', 'Luis', 'Lilia', 'Franscisco', 'Silvia', 'Jessica', 'Angie', 'Aymee']
const vals = ['0', '1']
function updateUser (user_id) {
  const table = self.DB.table('users')
  const idx = Math.floor(Math.random() * 10)
  const valsidx = Math.floor(Math.random() * 2)
  const data = {
    first_name: names[idx],
    synced: vals[valsidx]
  }
  table.update(user_id, data)
}

function checkData () {
  console.log('Finding data to sync')
  self.DB['users'].where({
    synced: '0'
  }).toArray().then(function (result) {
    console.log(result)
    if (result && result.length > 0) {
      updateUser(result[0].id)
    }
    // checker()
  })
}

self.addEventListener('message', function (event) {
  console.log('Receiving data from App: ', event)
  if (event.ports.length > 0) {
    event.data.app = event.data
    console.log(event)
    checkData()
    // event.ports[0].postMessage(event.data)
  }
})
