const { expect } = require('chai');

describe('Simple Math Test', function () {
  it('should return 2', function () {
    expect(1 + 1).to.equal(2);
  });
  it('should return 9', function () {
    expect(3 * 3).to.equal(9);
  });
});
