import {Express} from 'express';

describe('Index Route', () => {

    let request;
    let app: Express;
    beforeEach(function() {
        app = require('../../../../src/server/app').default;
        request = require('supertest');
    });

    describe('Path /', () => {
        it('should responds with Content-Type: text/html; charset=UTF-8', (done) => {
            request(app)
                .get('/')
                .expect('Content-Type', 'text/html; charset=UTF-8')
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should responds with 200', (done) => {
            request(app)
                .get('/')
                .expect(200, done);
        });

    });

    describe('Path /does_not_exist', () => {

        it('should responds with Content-Type: application/json; charset=utf-8', (done) => {
            request(app)
                .get('/does_not_exist')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });

        it('should respond with 404', (done) => {
            request(app)
                .get('/does_not_exist')
                .expect(404, done);
        });
    });
});
