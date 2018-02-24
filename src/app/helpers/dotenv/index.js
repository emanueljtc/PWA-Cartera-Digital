module.exports = {
  get: function (config) {
    return require('./lib/main.js').config(config)
  }
}
