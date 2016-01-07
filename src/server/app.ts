import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import {join} from 'path';
import index from './routes/index.route';
import game from './routes/game.route';
import cookieParser = require('cookie-parser'); // this module doesn't use the ES6 default export yet
import socket from './socket';

const app: express.Express = express();

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
console.log(__dirname);
app.use(express.static(join(__dirname, '../client/')));


app.use('/', index(socket.io));
app.use('/game', game(socket.io));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    // look up node Error    
    let error = {
        err: new Error('Not found'),
        status: 404
    };
    
    next(error);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

    app.use((error: any, req, res, next) => {
        res.status(error.status || 500);

        res.json({
            error,            
            message: error.err.message
        });

    });
}

// production error handler
// no stacktraces leaked to user
app.use((error: any, req, res, next) => {
    res.status(error.status || 500);

    res.json({
        error: '',        
        message: error.message
    });
    return null;
});



export default app;
