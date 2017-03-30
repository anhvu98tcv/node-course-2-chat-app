var expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString' , () => {
  it('should reject non-string ', () =>{
    var str = 98;
    expect(isRealString(str)).toBe(false);
  });

  it('should reject  string with only space' , () => {
    expect(isRealString('   ')).toBe(false);
  })

  it('should allow string' , () => {
    expect(isRealString(' Anh Vu  ')).toBe(true);
  });
});
