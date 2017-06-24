const observable = {
  subscribe: function subscribe(obs) {
    [10, 20, 30].forEach(obs.next)
    obs.complete()
  }
}

const observer = {
  next: next => {
    console.log(next)
  },
  error: err => {
    console.log(err)
  },
  complete:() => {
    console.log('done')
  }

}

observable.subscribe(observer) // commenta questa riga :) 