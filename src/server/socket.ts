import * as socketio from 'socket.io';

interface Socket {
    io: SocketIO.Server;
}

let socket: Socket = {
    io: null
};

if (!socket.io) {
    socket.io = socketio();
}

export default socket;
