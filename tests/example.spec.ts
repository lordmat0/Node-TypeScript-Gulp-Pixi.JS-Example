let should = require('chai').should();
let request = require('supertest');

describe('Testing frameworks', () => {

    describe('chai library', () => {
        it('should have chai.should defined', () => {

            if (!should) {
                throw Error('should is not defined!');
            }
            should.exist(should);
        });

        it('should work correctly', () => {
            'test'.should.equal('test');
        });
    });

    describe('supertest library', () => {

        it('should have request defined', () => {
            should.exist(request);
        });

        it('should be a function', () => {
            request.should.be.an('function');
        });

    });

});

