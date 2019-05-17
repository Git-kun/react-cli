// React polyfill
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';

// polyfill
Object.setPrototypeOf(Promise, {
  finally: function (callback) {
    let P = this.constructor;
    return this.then(
      value => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => {
        throw reason
      })
    );
  }
});



