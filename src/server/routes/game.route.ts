import {Router} from 'express';
import {PlayerMovement} from '../../shared/player-movement';

const game = Router();

function init(io: SocketIO.Server) {

    /* GET users listing. */
    game.get('/', (req, res, next) => {
        res.send('respond with a resource');
    });

    let squares: { [id: string]: PlayerMovement } = {};

    io.on('connection', (socket) => {
        console.log(socket.id, 'connection');
        socket.emit('square-list', squares);

        let square: PlayerMovement = {
            name: socket.id,
            x: -50,
            y: -50
        };

        squares[socket.id] = square;

        socket.broadcast.emit('new-square', square);

        socket.on('player-movement', (data: PlayerMovement) => {
            let squareItem = squares[socket.id];

            squareItem.x = data.x;
            squareItem.y = data.y;
            squareItem.rotation = data.rotation;

            console.log(squareItem);
            socket.broadcast.emit('square-moved', squareItem);
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
