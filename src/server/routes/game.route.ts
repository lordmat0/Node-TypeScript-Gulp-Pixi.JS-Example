import {Router} from 'express';
import {Movement} from '../../shared/movement';

const game = Router();

function init(io: SocketIO.Server) {

    /* GET users listing. */
    game.get('/', (req, res, next) => {
        res.send('respond with a resource');
    });

    io.on('connection', (socket) => {
        console.log(socket.id, 'connection');

        io.sockets.emit('new-square', socket.id);

        socket.on('player-movement', (data: Movement) => {
            data.id = socket.id;
            console.log(data);
            io.sockets.emit('square-moved', data);
        });

        socket.on('disconnect', () => {
            console.log(socket.id, 'disconnect');
            io.sockets.emit('square-deleted', socket.id);
        });
    });

    return game;
}
export default init;
