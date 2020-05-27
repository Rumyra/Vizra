import vizraUtils from '../vizraUtils.js';

describe('degToRad', function () {
  it('should return radians from degrees', function () {
    chai.expect(vizraUtils.degToRad(180)).to.equal(Math.PI);
  });
});