import { Server } from 'socket.io'
import { createServer } from 'http'
import cors from 'cors';

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST"]
    }
})

interface Types {
    message: string;
}

const users = new Map();
const rooms = new Map();

io.on('connection', (socket) => {  

    const username = socket.handshake.query.username;

    if( username) {
        users.set( socket.id, username)

        socket.broadcast.emit("userJoined", username);

        io.emit("users", Array.from(users.values()))

        console.log(username, "Joined the Chat");
    }

    socket.on("join", function(roomname) {
        if(!rooms.has(roomname)) {
            socket.emit("room doesn't exists")
        }

        socket.join(roomname)

        rooms.get(roomname).join(socket.id);


        socket.to(roomname).emit("userjoined", {
            room: roomname,
            user: users.get(socket.id)
        })

        const RoomMembers = Array.from(rooms.get(roomname)) 
            .map( id => users.get(id))
            .filter(Boolean)

        socket.emit("roomUser", { room: roomname, users: RoomMembers})
    })

    socket.on("create", (roomname)  => {
        if(rooms.has(roomname)) {
            socket.emit("error", "Room already exists")
            return;
        }


        rooms.set(roomname, new Set([socket.id]));
        socket.join(roomname)
        socket.emit("roommCreated", roomname)
        io.emit("roomList", Array.from(rooms.keys()))
    })

    socket.on("getRooms", () => {
        socket.emit("roomList", Array.from(rooms.keys()));
    });

    socket.on("roomMessage", ({ room, Message}) => {
        if(!rooms.has(room)) {
            socket.emit("error", "Room doesn't exists")
            return;
        }

        if(!rooms.get(room).has(socket.id)) {
            socket.emit("error", "You're not in the room");
            return;
        }
    })

    socket.on('disconnect', () => {  
        const user = users.get(socket.id)

        if(user) {
            users.delete(socket.id)

            socket.emit("userLeft", username)
            
            io.emit("users", Array.from(users.values()));

            console.log(username, "Left the Chat")
        }
    });
});

httpServer.listen(8080, () => {
    console.log("Server running on port 8080");
});