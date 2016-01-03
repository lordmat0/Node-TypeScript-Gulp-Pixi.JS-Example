import assert = require('assert');

describe('Index Route', () => {

    let request = require('supertest');
    let server;
    beforeEach(function() {
        server = require('../../src/app').default;
    });

    describe('Path /', () => {
        
        it('responds to /', (done) => {
            request(server)
                .get('/')
                .expect('Content-Type', 'text/html; charset=UTF-8')
                .expect(200, done);
        });
        
  
    });
});
