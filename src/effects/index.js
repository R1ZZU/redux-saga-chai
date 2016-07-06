const isEffect = require('./is-effect');

module.exports = function effects(chai) {
  const { Assertion } = chai;

  Assertion.addProperty('effect', function () {
    const obj = this._obj;

    this.assert(
      isEffect(obj),
      'expected #{this} to be an effect',
      'expected #{this} not to be an effect'
    );
  });
}