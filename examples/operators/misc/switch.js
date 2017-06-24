const Rx = require('rxjs')

const clicks = Rx.Observable.fromEvent(document, 'click')
const higherOrder = clicks.map((ev) => Rx.Observable.interval(1000))
const switched = higherOrder.switch()
switched.subscribe(x => console.log(x))