function map(transformFn) {
  const inputObservable = this
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: x => {
        const y = transformFn(x)
        outputObserver.next(y)
      },
      error: e => outputObserver.error(e),
      complete: () => outputObserver.complete()
    })
  })
  return outputObservable
}

function filter(conditionFn) {
  const inputObservable = this
  const outputObservable = createObservable(function subscribe(outputObserver) {
    inputObservable.subscribe({
      next: x => {
        if (conditionFn(x)) {
          outputObserver.next(x)
        }
      },
      error: e => outputObserver.error(e),
      complete: () => outputObserver.complete()
    })
  })
  return outputObservable
}

function createObservable(subscribe) {
  return {
    subscribe: subscribe,
    map: map,
    filter: filter,
  }
}

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

arrayObservable
  .map(x => x / 10)
  .filter(x => x !== 2)
  .subscribe(observer)