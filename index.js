require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

// Basic Configuration
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/public', express.static(`${process.cwd()}/public`))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

// Your first API endpoint
const originalUrls = []
const shortUrls = []

app.post('/api/shorturl', (req, res) => {
  const { url } = req.body
  const isValidUrl = url.startsWith('http://') || url.startsWith('https://')

  if (!isValidUrl) {
    return res.send({
      error: 'invalid url'
    })
  }

  const indexOfUrl = originalUrls.indexOf(url)

  if (indexOfUrl < 0) {
    originalUrls.push(url)
    shortUrls.push(shortUrls.length)

    return res.send({
      original_url: url,
      short_url: shortUrls.length - 1
    })
  }

  res.send({
    original_url: url,
    short_url: indexOfUrl
  })
})

app.get('/api/shorturl/:index', (req, res) => {
  const { index } = req.params

  const urlOfIndex = shortUrls.indexOf(Number(index))

  if (urlOfIndex < 0) {
    return res.send({
      error: 'No short URL found for the given input'
    })
  }

  res.redirect(originalUrls[index])
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
