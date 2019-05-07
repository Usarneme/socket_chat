# socket_chat

A chat app built on Express and Socket.io with MongoDB for storage of chat history.

Socket.io on the server listens for any client to emit a chat event by hitting the send button. The Express server saves the new chat message to the db, and emits that new messages exist thus prompting all connected clients to update.



### To run
Clone the repository and cd into the directory created
`git clone ...` 

Install npm dependencies
`npm install`


Database dependencies are Mongo and Mongod daemon
`sudo mongod` to start the Mongo daemon if you are using localhost, skip this for mLab or other hosted db

Create the db and collection in MongoDB
`mongo
>use socket_chat`

Create a secret.js file which will contain your MongoDB database connection string
`touch secret.js`

Input your own MongoDB connection string. mLab or localhost are good options
`module.exports = dbUrl = 'mongodb://username:password@127.0.0.1.or.something.mlab.com:51876/socket_chat'`

Start up the server
`nodemon server` or `npm start`

Go to localhost:3001 in your browser of choice and start chatting!
