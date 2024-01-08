(() => {
  // src/index.js
  var thrush = (x) => (f) => f(x);
  var tap = (f) => (x) => {
    f(x);
    return x;
  };
  var pipe = (...fs) => (x) => fs.reduce((acc, f) => f(acc), x);
  var Observable = class {
    constructor() {
      this.cbs = [];
    }
    subscribe(cb) {
      this.cbs.push(cb);
    }
    emit(x) {
      this.cbs.forEach(thrush(x));
    }
  };
  var observable = new Observable();
  var double = (x) => x * 2;
  observable.subscribe(pipe(
    double,
    double,
    tap(console.log)
  ));
  observable.emit(1);
  observable.emit(12);
  observable.emit(10);
  observable.emit(9);
})();
