const thrush = x => f => f(x);
const tap = f => x => {
    f(x);
    return x;
}
const pipe = (...fs) => x => fs.reduce((acc, f) => f(acc), x);

class Observable {
    constructor() {
        this.cbs = [];
    }

    subscribe(cb) {
        this.cbs.push(cb);
    }

    emit(x) {
        this.cbs.forEach(thrush(x));
    }

    pipe(o) {
        this.subscribe(x => o.emit(x));
        return o;
    }
}

const observable = new Observable();

const double = x => x * 2;


observable.subscribe(pipe(
    double,
    double,
    tap(console.log)
));
observable.emit(1);
observable.emit(12);
observable.emit(10);
observable.emit(9);
