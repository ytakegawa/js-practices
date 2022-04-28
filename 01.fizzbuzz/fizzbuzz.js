const numbers = [...Array(20)].map((_, i) => i + 1)

numbers.forEach(n => {
  if (n % 5 === 0 && n % 3 === 0) n = 'FizzBuzz'
  if (n % 5 === 0) n = 'Buzz'
  if (n % 3 === 0) n = 'Fizz'
  console.log(n)
})
