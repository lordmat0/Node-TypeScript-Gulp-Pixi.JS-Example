import {Router} from 'express';
import {join} from 'path';

const index = Router();

/* GET home page. */
index.get('/', function(req, res, next) {
    console.log('__dirname from /', __dirname);
    res.sendFile('index.html', { root: join(__dirname, '../../client/pages') });
    //res.render('index', { title: 'Visual Studio Code!' });
});

/* GET Quick Start. */
index.get('/quickstart', function(req, res, next) {
    res.render('quickstart');
});

export default index;
