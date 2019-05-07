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
// var dbUrl = process.env.dbUrl
// Non-Heroku / Localhost Implementation
var dbUrl = require('./secret.js')

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages)
  })
})

app.post('/messages', (req, res) => {
  var message = new Message(req.body)
  message.save((err) =>{
    if(err) sendStatus(500)

    io.emit('message', req.body)
    res.sendStatus(200)
  })
})

io.on('connection', () =>{
  console.log('a user is connected')
})

mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
  console.log('mongodb connected', err)
})

var server = http.listen(process.env.PORT, () => {
  console.log('server is running. Server.address().port: '+server.address().port+' . process.env.PORT: '+process.env.PORT)
})

