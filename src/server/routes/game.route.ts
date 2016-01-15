import {Router} from 'express';
import {Square} from '../../shared/square';

const game = Router();

interface SquareMap {
    [name: string]: Square;
}

function init(io: SocketIO.Server) {

    /* GET users listing. */
    game.get('/', (req, res, next) => {
        res.send('respond with a resource');
    });

    let squares: SquareMap = {};

    io.on('connection', (socket) => {
        console.log(socket.id, 'connection');
        socket.emit('square-list', squares);

        let square: Square = {
            id: socket.id,
            x: 5,
            y: 5
        };

        squares[socket.id] = square;

        socket.broadcast.emit('new-square', square);

        socket.on('player-movement', (data: Square) => {
            data.id = socket.id;
            console.log(data);
            io.sockets.emit('square-moved', data);
        });

        socket.on('disconnect', () => {
            console.log(socket.id, 'disconnect');
            socket.broadcast.emit('square-deleted', socket.id);

            delete squares[socket.id];
        });
    });

    return game;
}
export default init;
