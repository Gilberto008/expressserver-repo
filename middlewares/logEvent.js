const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

const fs = require('fs')
const fsPromise = require('fs').promises
const path = require('path')

const logEvent = async (message, fileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
  const logText = `${uuid()}\t${dateTime}\t${message}\n`

  try {
    if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromise.mkdir(path.join(__dirname, '..', 'logs'))
    }
    await fsPromise.appendFile(path.join(__dirname, '..', 'logs', fileName), logText)
  } catch (err) {
    console.error(err)
  }
}

const logText = (req, res, next) => {
  logEvent(`${req.method}\t${req.url} \t${req.headers.origin}`, 'reqLog.txt')
  console.log(`${req.method} ${req.url}`)
  next()
}

module.exports = { logEvent, logText }