const nextCallback = next => {
  console.log(next)
}

const errorCallback = err => {
  console.log(err)
}

const completeCallback = () => {
  console.log('done')
}

function giveMeSomeData(next, error, done) {
  // document.addEventListner('click', next)
  // fetch(url).then(next, error)
  [10, 20, 30].forEach(next)
}

giveMeSomeData(
  nextCallback,
  errorCallback,
  completeCallback
)