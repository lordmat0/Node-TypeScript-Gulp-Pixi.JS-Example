import {Router} from 'express';
import {join} from 'path';

const index = Router();

const indexPath = join(__dirname, '../../client/');

function init(io: SocketIO.Server) {
    /* GET home page. */
    index.get('/', function(req, res, next) {
        console.log('__dirname from /', __dirname);
        res.sendFile('index.html', { root: indexPath });
    });

    index.get('/health', function(req, res, next) {
        res.json({ health: 'health', status: 200 });
    });

    return index;
}

export default init;
