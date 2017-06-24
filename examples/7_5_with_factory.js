function createObservable(subscribe) {
  return {
    subscribe: subscribe,
  }
}

const clickObservable = createObservable(function subscribe(ob) {
  document.addEventListener('click', ob.next)
})

const arrayObservable = createObservable(function subscribe(ob) {
  [10, 20, 30].forEach(ob.next)
  ob.complete()
})

const observer = {
  next: next => {
    console.log(next)
  },
  error: err => {
    console.log(err)
  },
  complete: () => {
    console.log('done')
  }

}

arrayObservable.subscribe(observer)
clickObservable.subscribe(observer)