import express from 'express';
import cors from 'cors';
import mongoose from './dp/index.js';
import { createServer } from "http";
import {Server } from 'socket.io';

const PORT = process.env.PORT || 8000;
const app = express();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connectin Error"));
db.once("open" , () => console.log("Db connected!"));

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());

// res.set('Access-Control-Allow-Origin', '*');

app.use('/profile' , (req,res) => {
 res.send(" Received!!")
})

const httpServer = createServer(app);

const io = new Server(httpServer, { cors: '*' });

io.on("connection", (socket) => {
  console.log("socket connection started!!", socket.id );
  socket.on("add-todo" , (data) => {
    console.log("Data ==>" , data )
    io.emit("send-todo" , data)

  })
});

httpServer.listen(PORT , () => console.log("Server started ==> ", PORT))
