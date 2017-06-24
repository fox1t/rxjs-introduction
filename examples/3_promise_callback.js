// 2 async promise callbacks
// we need to use 2 callbacks because we can have errors

const res = fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(r => r.json())

function successCallback(value) {
  console.log(`${value}`)
}

function failureCallback(err) {
  console.error(`${err}`)
}

console.log('before')

res.then(successCallback, failureCallback)

console.log('after')