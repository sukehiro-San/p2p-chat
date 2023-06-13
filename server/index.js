const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const ioServer = new Server({ cors: true });

const app = express();
app.use(bodyParser.json());

let emailToSocketMap = new Map();
let socketToEmailMap = new Map();
let socketToRoomMap = new Map();

ioServer.on("connection", (socket) => {
  console.log(`Socket with id:${socket.id} connected`);

  socket.on("join-room", async ({ emailID, roomID }) => {
    await Promise.resolve()
      .then(() => socketToEmailMap.set(socket.id, emailID))
      .then(() => emailToSocketMap.set(emailID, socket.id))
      .then(() => socketToRoomMap.set(socket.id, roomID))
      .then(() => console.log(`User with ID:${emailID} joined room ${roomID}`))
      .then(() => socket.join(roomID))
      .then(() => socket.emit("joined-room", { roomID, emailID }))
      .then(() =>
        socket.broadcast
          .to(roomID)
          .emit("user-joined", { emailID: emailID, roomID: roomID })
      );
  });

  socket.on("call-user", ({ emailID, offer }) => {
    let fromEmail;
    let socketID;
    Promise.resolve()
      .then(() => {
        fromEmail = socketToEmailMap.get(socket.id);
      })
      .then(() => {
        socketID = emailToSocketMap.get(emailID);
      })
      .then(() =>
        console.log(
          "call-user event listened",
          offer,
          emailID,
          fromEmail,
          socketID
        )
      )
      .then(() => {
        socket.to(socketID).emit("incoming-call", {
          from: fromEmail,
          offer: offer,
        });
      });
  });

  socket.on("call-accepted", ({ emailID, answer }) => {
    let socketID;
    Promise.resolve()
      .then(() => console.log("call accepted", emailID, answer))
      .then(() => {
        socketID = emailToSocketMap.get(emailID);
      })
      .then(() =>
        socket.to(socketID).emit("call-answered", {
          answer: answer,
        })
      );
  });

  socket.on("disconnecting", () => {
    console.log(`Socket with id:${socket.id} disconnected`);
    if (socketToEmailMap.get(socket.id)) {
      const emailID = socketToEmailMap.get(socket.id);
      socketToEmailMap.delete(socket.id);
      emailToSocketMap.delete(emailID);
      socket.leave(socketToRoomMap.get(socket.id));
    }
  });
});

app.listen(8000, () => console.log("Server running at port 8000"));
ioServer.listen(8001);
