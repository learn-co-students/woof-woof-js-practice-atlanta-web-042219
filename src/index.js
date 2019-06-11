document.addEventListener('DOMContentLoaded', init)
document.addEventListener('click', handleClick)

const PUPS_URL = `http://localhost:3000/pups`

function init() {
  fetch(PUPS_URL)
    .then(res => res.json())
    .then(pups => pups.forEach(printPup))
}

function printPup(pup) {
  document.querySelector('#dog-bar').innerHTML += `<span data-id="${pup.id}">${pup.name}</span>`
}

function handleClick(e) {
  if (e.target.tagName === 'SPAN') {
    fetch(PUPS_URL + `/${e.target.dataset.id}`)
      .then(res => res.json())
      .then(showPup)
  }
  if (e.target.id === 'toggle-dawg') {
    let goodness = ''
    if (e.target.innerText === 'Good Dog!') {
      goodness = false
      e.target.innerText = 'Bad Dog!'
    } else {
      goodness = true
      e.target.innerText = 'Good Dog!'
    }
    fetch(PUPS_URL + `/${e.target.dataset.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        isGoodDog: goodness
      })
    })
  }
  if (e.target.innerText.includes('Filter good dogs')) {
    if (e.target.innerText.includes('ON')) {
      e.target.innerText = 'Filter good dogs: OFF'
      document.querySelector('#dog-bar').innerHTML = ''
      fetch(PUPS_URL)
        .then(res => res.json())
        .then(pups => pups.filter(pup => pup.isGoodDog).forEach(printPup))
    } else {
      e.target.innerText = 'Filter good dogs: ON'
      document.querySelector('#dog-bar').innerHTML = ''
      init()
    }
  };
}

function showPup(pup) {
  document.querySelector('#dog-info').innerHTML = `<img src=${pup.image}> <h2>${pup.name}</h2> <button data-id="${pup.id}" id="toggle-dawg">${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>`
}