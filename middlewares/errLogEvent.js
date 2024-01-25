const { logEvent } = require('./logEvent')

const errLogText = (err, req, res, next) => {
  console.error(err.stack)
  logEvent(`${err.name}: ${err.message}`, 'errLog.txt')
  res.status(500).send(err.message)
  next()
}

module.exports = errLogText