document.addEventListener("DOMContentLoaded", e =>{
const baseURL = 'http://localhost:3000/pups'
const dogBar = document.getElementById('dog-bar')
const fullDogInfo = document.querySelector('#dog-info')
let allDogsArray = []

document.addEventListener('click', handleEvent)

fetch(baseURL)
.then(res => res.json())
.then(data => {
  data.forEach(dog=>{
    showDogName(dog)
    allDogsArray.push(dog)
    })
})


function showDogName(dog){
  dogBar.innerHTML += `<span data-id='${dog.id}'>${dog.name}</span>`
}

function getGoodDogs(){
  dogBar.innerHTML = ''
  const goodDogsArray = allDogsArray.filter(dog => dog.isGoodDog === true)
  goodDogsArray.forEach(showDogName)
}

function getAllDogs(){
  dogBar.innerHTML = ''
  allDogsArray.forEach(showDogName)
}

function handleEvent(e){
  if (e.target.tagName === 'SPAN')
  {fetchFullDog(e)}
  else if (e.target.tagName=== 'BUTTON')
    {handleButton(e)}
}

function fetchFullDog(e){
  let id = e.target.dataset.id
    fetch(baseURL + `/${id}`)
    .then(res => res.json())
    .then(showFullDog)

function showFullDog(dog){
  const fullDogInfo = document.querySelector('#dog-info')
  fullDogInfo.innerHTML = `
  <img src=${dog.image}>
  <h2>${dog.name}</h2>
  <button data-id='${dog.id}'>${dog.isGoodDog? 'Good Dog!': 'Bad Dog!'}</button>`}
  }

function handleButton(e){
  if(e.target.innerText === 'Good Dog!'){
    changeStatus(e)
  }
  else if (e.target.innerText === 'Bad Dog!'){
    changeStatus(e)
  }
  else if (e.target.innerText === 'Filter good dogs: OFF'){
    e.target.innerText = 'Filter good dogs: ON'
    getGoodDogs()
  }
  else if (e.target.innerText === 'Filter good dogs: ON'){
    e.target.innerText = 'Filter good dogs: OFF'
getAllDogs()
  }
}


function changeStatus(e){
  let id = e.target.dataset.id
  let status = e.target.innerText

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
  })
}




})
