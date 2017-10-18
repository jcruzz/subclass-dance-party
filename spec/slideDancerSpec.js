describe('makeSlideDancer', function() {

  var slideDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    slideDancer = new makeSlideDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(slideDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that changes its css properties', function() {
    sinon.spy(slideDancer.$node, 'css');
    var oldLeft = slideDancer.$node.css("left");
    slideDancer.step();
    expect(slideDancer.$node.css.called).to.be.true;
    expect(slideDancer.$node.css("left")).to.not.equal(oldLeft);
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(slideDancer, 'step');
      expect(slideDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(slideDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(slideDancer.step.callCount).to.be.equal(2);
    });
  });
});