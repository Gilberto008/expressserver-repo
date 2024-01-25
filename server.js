// SERVER SERVING ONLY STATIC PAGES>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const express = require('express')
const app = express()
const { logText } = require('./middlewares/logEvent')
const errLogText = require('./middlewares/errLogEvent')
const cors = require('cors')
const corsOption = require('./config/corsOption')
const path = require('path')

const PORT = 3500
// Custom Middleware
app.use(logText)

// CORS Handling
app.use(cors(corsOption))

// Built-in Middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))
app.use('/subdir', express.static(path.join(__dirname, '/public')))

// Views 
app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'))


app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({error: "404 Page not found"})
  } else {
    res.type('txt').send('404 Page not found')
  } 
})
// Custom Middleware
app.use(errLogText)

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})

