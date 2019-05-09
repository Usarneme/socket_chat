var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')

var staticOptions = {
  setHeaders: function (res, path, stat) {
    res.set('x-heroku-port', server.address().port)
  }
}

app.use(express.static(__dirname, staticOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var Message = mongoose.model('Message', {
  name: String,
  message: String
})

// dbUrl contains the login and creds so is not shared
// Heroku Version
var dbUrl = process.env.dbUrl

// Non-Heroku / Localhost Implementation
// var dbUrl = require('./secret.js')

// Testing
// process.env.PORT = 3000

app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    console.log('EXPRESS GET to /messages')
    console.log('Returning message payload data:')
    console.dir(Object.keys(messages))
    res.send(messages)
  })
})

app.post('/messages', (req, res) => {
  console.log('POSTING to /messages')
  // Remove extra whitespace from begin/end of input
  req.body.message = req.body.message.trim()
  // Remove double spaces/tabs/extra whitespace within the message
  req.body.message = req.body.message.replace(/\s\s+/g, ' ')

  var message = new Message(req.body)
  console.log('message._doc.message after trim: '+message._doc.message)

  message.save((err) =>{
    if(err) sendStatus(500)

    io.emit('message', req.body)
    res.sendStatus(200)
  })
})

io.on('connection', () =>{
  console.log('IO Socket User Connected')
})

mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
  console.log('MongoDB Connected', err)
})

var server = http.listen(process.env.PORT, () => {
  console.log('Server is running. Server.address().port: '+server.address().port+' . process.env.PORT: '+process.env.PORT)
})

