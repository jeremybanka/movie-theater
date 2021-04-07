// data
const NOW_SHOWING = {
  ivbs: {title: 'Invasion of the Body Snatchers', price: 15},
  thng: {title: 'The Thing', price: 15},
  prmk: {title: 'Princess Mononoke', price: 20},
  gzvk: {title: 'Godzilla vs Kong', price: 25},
}

// business logic
function Ticket() {
  this.movieName = undefined
  this.basePrice = undefined
  this.discounts = {
    senior: 0,
    matinee: 0,
  }
  this.isValid = false
  this.ageHasBeenVerified = false
}

Ticket.prototype.selectMovie = function(movieId) { // 'prmk'
  const chosenMovie = NOW_SHOWING[movieId]
  this.movieName = chosenMovie.title
  this.basePrice = chosenMovie['price']
}

Ticket.prototype.finalPrice = function() {
  let finalPrice = this.basePrice
  const discountValues = Object.values(this.discounts)  // [0, 0, 0]
  discountValues.forEach(discountValue => {
    finalPrice -= discountValue
  })
  return finalPrice
}

Ticket.prototype.discountByAge = function(age) {
  if (this.ageHasBeenVerified) return
  if (age >= 65) this.discounts.senior = 5
  this.ageHasBeenVerified = true
}

Ticket.prototype.discountByTime = function(chosenTime) {
  console.log(chosenTime)
  const cheapTimes = [10, 12, 14, 16]
  const spendyTimes = [0, 18, 20, 22]
  for(const cheapTime of cheapTimes) {
    if (cheapTime === chosenTime) {
      this.discounts.matinee = 5
      this.isValid = true
      return true
    }
  }
  for(const spendyTime of spendyTimes) {
    if (spendyTime === chosenTime) {
      this.isValid = true
      return true
    }
  }
  return false
}

const ticket = new Ticket()

// ui logic

$(document).ready(function() {
  const movieOptions = Object.entries(NOW_SHOWING)
  console.log(movieOptions)
  const $movieOptions = movieOptions.map(movieOption => {
    const movieTitle = movieOption[1].title
    const id = movieOption[0]
    const $label = $(`<label for='${id}'/>`).text(movieTitle)
    const $radio = $(`<input type="radio" name="movie" value="${id}" id="${id}">`)
    $($label).prepend($radio)
    return $label
  })
  $('#movie-options').append($movieOptions)

})