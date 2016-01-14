import {Router} from 'express';
import {Movement} from '../../shared/movement';

const game = Router();

function init(io: SocketIO.Server) {

    /* GET users listing. */
    game.get('/', (req, res, next) => {
        res.send('respond with a resource');
    });

    io.on('connection', (socket) => {
        console.log(socket.id, 'connected');

        socket.on('movement', (data: Movement) => {
            console.log(socket.id, ': emit event with:', data);
        });

        socket.on('disconnect', () => {
            console.log(socket.id, 'disconnected');
        });
    });

    return game;
}
export default init;
