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

const clickObservable = createObservable(function subscribe(ob) {
  document.addEventListener('click', ob.next)
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

clickObservable
  .map(ev => ev.clientX)
  .filter(x => x < 200)
  .subscribe(observer)