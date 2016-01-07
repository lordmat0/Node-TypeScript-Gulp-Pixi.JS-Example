import * as socketio from 'socket.io';

interface Socket {
    io: SocketIO.Server;
}

let socket: Socket = {
    public io: null
};

if (!socket.io) {
    socket.io = socketio();
}

export default socket;
