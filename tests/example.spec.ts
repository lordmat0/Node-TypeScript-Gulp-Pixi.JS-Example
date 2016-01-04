
import assert = require('assert');

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});


//import assert = require('assert');
require('should');
require('assert');


describe('Testing frameworks', () => {

    describe('should library', () => {
        it('should have "should" defined', () => {
            //expect()
        });
        
        it('should work correctly', () => {
            'test'.should.equal('test');
        });
    });
    
    

});

