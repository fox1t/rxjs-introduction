const { Observable } = require('rxjs')

let obs = Observable
  .interval(1000)
  .publish() // ritorna un connecableObservable
  //.refCount()
  // .share()

obs.connect()

setTimeout(() => {
  obs.subscribe(v => console.log("1st:" + v))
  setTimeout(
    () => obs.subscribe(v => console.log("2nd:" + v)), 1000)
}, 2000)

// 1:1
// 1:2
// 2:2
// 1:3
// 2:3
// 1:4
// 2:4
// 1:5