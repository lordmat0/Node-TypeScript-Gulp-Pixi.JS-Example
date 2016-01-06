import {Router} from 'express';

const game = Router();

function init(io: SocketIO.Server) {
        
    /* GET users listing. */
    game.get('/', (req, res, next) => {
        res.send('respond with a resource');
    });
    
    io.on('connection', (socket) => {
      console.log('connected game', socket.id);
        
    })
    return game;
}
export default init;
