const { Observable } = require('rxjs')

const click$ = Observable.fromEvent(document, 'click')

click$.bufferWhen(() => click$.delay(350))
  .map(clicks => clicks.length)
  .filter(clicks => clicks > 1)
  .subscribe(clicks => console.log(clicks))