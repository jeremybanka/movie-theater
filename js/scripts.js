// business logic
function Ticket() {
  this.basePrice = 20
  this.discounts = {
    senior: 0,
    matinee: 0,
    dated: 0
  }
  this.isValid = false
  this.ageHasBeenVerified = false
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
