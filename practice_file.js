function dummyFetch(path, callback){
  setTimeout(() => {
    if (path.startsWith("~/practice/js-practices"))
      callback(null, { body: `Response body of ${path}`})
    else
      callback(new Error("NOT FOUND"))
  }, 1000 )
}

dummyFetch("/fizzbuzz", (error, response) => {
  if (error) {
    console.log(error.message)
  } else {
    console.log(response)
  }
})
