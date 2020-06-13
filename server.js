'use strict'

const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const mongo = require('mongodb')
const mongoose = require('mongoose')
const validURL = require('valid-url')

const handleNewURL = require('./src/controllers/url.put')
const handleGetURL = require('./src/controllers/url.get')

const app = express()

// Basic Configuration.
const port = process.env.PORT || 3000

// mongoose.connect(process.env.DB_URI);

/** Middleware. */
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static(process.cwd() + '/public'))

/** Home. */
app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html')
})

/** New Short URL. */
app.post('/api/shorturl/new', function (req, res) {
    handleNewURL(req, res)
})

/** Redirect */
app.get('/api/shorturl/:url', function (req, res) {
    handleGetURL(req, res)
})

app.listen(port, function () {
    console.log(`Server running at port ${port}.`)
})
