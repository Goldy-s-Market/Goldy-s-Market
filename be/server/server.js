const { Server } = require("socket.io");
const express = require("express")
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: "http://localhost:5173",
    }
});


io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Handle joining a conversation room
    socket.on('join-conversation', (data) => {
        const { userId, contactId } = data;
        const roomName = [userId, contactId].sort().join('-');
        socket.join(roomName);
        console.log(`User ${userId} joined conversation with ${contactId} in room: ${roomName}`);
    });

    // Handle sending messages
    socket.on('send-message', (message) => {
        const { senderId, receiverId } = message;
        const roomName = [senderId, receiverId].sort().join('-');
        
        // Broadcast the message to everyone in the room except the sender
        socket.to(roomName).emit('receive-message', message);
        console.log(`Message sent from ${senderId} to ${receiverId}:`, message.text);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log("User disconnected:", socket.id);
    });
});
server.listen(3001, () => {
    console.log("Socket.IO server is running on port 3001!");
});