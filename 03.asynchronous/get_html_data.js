"use strict"

async function getHtmlData(url = '') {
  const response = await fetch(url, {
    method: 'GET'
  })
  return response.text()
}

getHtmlData('https://bootcamp.fjord.jp/')
  .then(response => console.log(response))
  .catch(error => console.log('error'))
