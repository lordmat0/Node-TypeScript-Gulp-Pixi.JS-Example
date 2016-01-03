import assert = require('assert');

describe('Index Route', () => {

    let request = require('supertest');
    let server;
    beforeEach(function() {
        server = require('../../src/app').default;
    });

    describe('Path /', () => {

        it('should responds with Content-Type: text/html; charset=UTF-8', (done) => {
            request(server)
                .get('/')
                .expect('Content-Type', 'text/html; charset=UTF-8')
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should responds with 200', (done) => {
            request(server)
                .get('/')
                .expect(200, done);
        });

    });

    describe('Path /does_not_exist', () => {

        it('should responds with Content-Type: application/json; charset=utf-8', (done) => {
            request(server)
                .get('/does_not_exist')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .end(function(err, res) {
                    if (err) return done(err);
                    done();
                });
        });

        it('should respond with 404', (done) => {
            request(server)
                .get('/does_not_exist')
                .expect(404, done);
        });
    });
});
