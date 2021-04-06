function doubleMe(number) {
  return number * 2
}

const tripleMe = number => {
  return number * 3
}

const quadrupleMe = number => number * 4

const fruits = ['banana', 'apple', 'orange', 'dragonfruit']

fruits.forEach(function(fruit) {
  console.log(fruit)
})

fruits.forEach(fruit => {
  console.log(fruit)
})