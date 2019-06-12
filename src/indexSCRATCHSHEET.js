document.addEventListener("DOMContentLoaded", e =>{
const baseURL = 'http://localhost:3000/pups'
const dogBar = document.querySelector('#dog-bar')
const dogCard = document.querySelector('#dog-info')
document.addEventListener('click', handleDogBarClick)


fetch(baseURL)
.then(res => res.json())
.then(data => {
  data.forEach(populateDogNames)
})

function populateDogNames(dog){
  dogBar.innerHTML += `<span data-id='${dog.id}'>${dog.name}</span>`
}

function handleDogBarClick(e){
  e.preventDefault()
  let id = e.target.dataset.id

if (e.target.tagName === 'SPAN'){
  fetch(`${baseURL}/${id}`)
  .then(res => res.json())
  .then(displayDogInfo)
}
else if (e.target.innerHTML === 'false')
{e.target.innerHTML = 'true'
updateDogStatus(e)}
else if (e.target.innerHTML === 'true')
{e.target.innerHTML = 'false'
updateDogStatus(e)}
}

function displayDogInfo(dog){
  dogCard.innerHTML += `
  <img src=${dog.image}>
  <h2>${dog.name}</h2>
  <button>${dog.isGoodDog}</button>`}

function updateDogStatus(e){
  let goodOrBad = e.target.innerHTML
  let id = e.target.dataset.id
  console.log('help')

  fetch(`${baseURL}/${id}`,
    {
      method: 'PATCH',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify({
      isGoodDog: e.target.innerHTML
  })
}).then(r => r.json())

}

})































// document.addEventListener('DOMContentLoaded', (e)=>{
// console.log('page loaded')
// const dataSource = 'http://localhost:3000/pups'
// const dogBar = document.getElementById('dog-bar')
// const moreDogInfo = document.querySelector('span')
// const dogCard = document.getElementById('dog-info')
// document.addEventListener('click', handleEvent)
//
//
// fetch(dataSource)
// .then(res => res.json())
// .then(data => {
//   data.forEach(listDog)
// })
//
// function listDog(dog){
//   dogBar.innerHTML += `<span data-id='${dog.id}'>${dog.name}</span>`
// }
// function handleEvent(e){
//   e.preventDefault()
//   let id = e.target.dataset.id
// if (e.target.tagName === 'SPAN'){
//   fetch(dataSource + `/${id}`)
//   .then(res => res.json())
//   .then(showFullDog)
//   console.log("This is the seleted dog")
// }
// else if (e.target.tagName === 'BUTTON' && e.target.innerText === 'false'){
//   const goodDogButton = e.target
//   goodDogButton.innerText = 'true'
//
// }
// else if (e.target.tagName === 'BUTTON' && e.target.innerText === 'true'){
//   const goodDogButton = e.target
//   goodDogButton.innerText = 'false'
//
// }
// }
//
//
// function showFullDog(dog){
//   dogCard.innerHTML += `<img src='${dog.image}'>
//   <h2>${dog.name}</h2>
//   <button>${dog.isGoodDog}</button>`
// }
//
//const baseURL = 'http://localhost:3000/pups'
const dogBar = document.getElementById('dog-bar')
const dogInfo = document.getElementById('dog-info')
let filter = false
document.addEventListener('click', handleEvents)


fetch(baseURL)
.then(res => res.json())
.then(pups => pups.forEach(addPup))
  if(filter){pups.filter((pup) => pup.isGoodDog.forEach(addPup)}
  //   else {





function addPup(pup){
dogBar.innerHTML += `<span data-id='${pup.id}'>${pup.name}</span>`
}

function handleEvents(e){
e.preventDefault()
if (e.target.tagName === 'SPAN')
{getPupInfo(e.target)}
else if (e.target.id === 'good-dog-button')
{changeStatus(e)}
else if (e.target.id === 'good-dog-filter')
{filterDogs(e)}
}

function getPupInfo(pup){
let id = pup.dataset.id

fetch(`${baseURL}/${id}`)
.then(res => res.json())
.then(attachDogInfo)
}

function attachDogInfo(dog){
dogInfo.innerHTML = `
<img src=${dog.image}>
<h2>${dog.name}</h2>
<button id="good-dog-button" data-id="${dog.id}">${dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>`
}

function changeStatus(e){
let id = e.target.dataset.id
let status

if (e.target.innerText === 'Good Dog!'){
  status = false
  e.target.innerText = 'Bad Dog!'
} else {
  status = true
  e.target.innerText = 'Good Dog!'
}

fetch(`${baseURL}/${id}`, {
  method: 'PATCH',
  headers:{
    'Content-Type': 'application/json',
    Accepts: 'application/json'
  },
  body: JSON.stringify({
    isGoodDog: status
  })
}).then(res => res.json())
.then(console.log)
}

// function filterDogs(e){
//   dogBar.innerHTML = ''
// if (e.target.innerText.includes('OFF')){
//   e.target.innerText = 'Filter good dogs: ON'
// filter = false}
// else { e.target.innerText = 'Filter good dogs: OFF'
// filter = true}
// fetch(baseURL)
// .then(res => res.json())
// .then(pups =>{
//   if(filter){
//     pups.filter((pup) => pup.isGoodDog.forEach(addPup)}
//     else {
//   pups.forEach(addPup)
// }
// })
//
// })
// }
// })
