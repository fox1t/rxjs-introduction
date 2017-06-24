// sum of squares of some consecutive natural numbers

// imperative

function sumOfSquares(nums) {
  let i
  let sum = 0
  const squares = []

  for (i = 0; i < nums.length; i++) {
    squares.push(nums[i] * nums[i])
  }

  for (i = 0; i < squares.length; i++) {
    sum += squares[i]
  }

  return sum
}

console.log(sumOfSquares([1, 2, 3, 4, 5]))

// functional declarative
function sumOfSquares2(nums) {
  return nums
    .map(num => num * num )
    .reduce((start, num) => start + num, 0)
}

console.log(sumOfSquares2([1, 2, 3, 4, 5]))
