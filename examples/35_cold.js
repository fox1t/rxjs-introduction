const { Observable } = require('rxjs')

const obs = Observable.create(observer => {
  observer.next(1)
  setTimeout(() => {
    observer.next(2)
    setTimeout(() => {
      observer.complete()
    }, 1000)
  }, 1000)
})

obs.subscribe(
  v => console.log("1st subscriber: " + v),
  err => console.log("1st subscriber error: " + err),
  () => console.log("1st subscriber complete ")
)
setTimeout(() => {
  obs.subscribe(
    v => console.log("2nd subscriber: " + v),
    err => console.log("2nd subscriber error: " + err),
    () => console.log("2nd subscriber complete ")
  )
}, 2000)