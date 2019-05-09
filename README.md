# socket_chat

A chat app built on Express and Socket.io with MongoDB for storage of chat history.

Socket.io on the server listens for any client to emit a chat event by hitting the send button. The Express server saves the new chat message to the db, and emits that new messages exist thus prompting all connected clients to update.

#### A test build of this app is running on Heroku at: https://usarneme-socket-chat.herokuapp.com/

### To Run This Application
Clone the repository and cd into the directory created

```git clone https://github.com/Usarneme/socket_chat.git``` 

Install npm dependencies

```npm install```


Database dependencies are Mongo and Mongod daemon

```sudo mongod``` to start the Mongo daemon if you are using localhost, skip this for mLab or other hosted db

Create the db and collection in MongoDB

```
mongo
>use socket_chat
```

Create a secret.js file which will contain your MongoDB database connection string

```touch secret.js```

Input your own MongoDB connection string. mLab or localhost are good options

```module.exports = dbUrl = 'mongodb://username:password@127.0.0.1.or.something.mlab.com:51876/socket_chat'```

Start up the server

```nodemon server``` or ```npm start```

Go to localhost:3001 in your browser of choice and start chatting!

#### Localhost deployment notes
The Server entrypoint is setup to use a process.env.PORT set by Heroku; this can be set as a static port or you can set the process.env to a port of your choice.

Changing the server's listening port will affect the client-side socket.IO connection. The client side js script points to the Heroku deployment but if you want to run it on localhost change the server URL to 127.0.0.1:PORT with PORT being what you set above. 
