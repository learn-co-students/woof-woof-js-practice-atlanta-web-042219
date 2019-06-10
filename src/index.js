const PUPS_URL = "http://localhost:3000/pups"
//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', loadPage)
document.addEventListener('click', handleClicks)
//CONSTANTS
  const dogBar = document.getElementById('dog-bar')
  const dogInfo = document.getElementById('dog-info')
  let dogFilter = false

//FUNCTION DEFINITIONS
  function loadPage() {
  fetch(PUPS_URL)
  .then(resp => resp.json())
  .then(json => json.forEach(addDoggo))
  }

  function addDoggo(dog) {
    dogBar.innerHTML += `<span data-dog-id=${dog.id}>${dog.name}</span>`
  }

  function handleClicks(e){
    if (e.target.tagName === 'SPAN') {
      getDoggo(e.target.dataset.dogId)
    } else if (e.target.id === 'good-dog-filter'){
      filter(e.target)
    }else if (e.target.id === 'status-btn'){
      changeStatus(e.target)
    }
  }

  function getDoggo(id){
    fetch(`${PUPS_URL}/${id}`)
    .then(resp => resp.json())
    .then(json => displayDog(json))
  }

  function displayDog(dog){
    console.log(dog.isGoodDog)
    dogInfo.innerHTML = `<img src=${dog.image}>
      <h2>${dog.name}</h2>
      <button id='status-btn' data-dog-id=${dog.id} data-dog-status=${dog.isGoodDog}>${dog.isGoodDog ? 'Bad Dog!' : 'Good Dog!'}</button>`
  }
 
  function changeStatus(button){
    button.dataset.dogStatus = button.dataset.dogStatus === 'false' 
    fetch(`${PUPS_URL}/${button.dataset.dogId}`,{
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isGoodDog : button.dataset.dogStatus === 'true'})
    }).then(button.innerText = button.dataset.dogStatus === 'true' ? 'Bad Dog!' : 'Good Dog!')
    console.log('status button', button.dataset.dogStatus)
  }

  function filter(button){
    dogFilter = !dogFilter
    button.innerText = dogFilter ? 'Filter good dogs: ON' : 'Filter good dogs: OFF'
    if (dogFilter){
      filterGoodDogs()
    }else{
      dogBar.innerHTML = ''
      loadPage()
    }

  }

  function filterGoodDogs(){
    dogBar.innerHTML = ''
    fetch(PUPS_URL)
    .then(resp => resp.json())
    .then(dogs => {
      for (const k in dogs) {
        if (dogs[k].isGoodDog) {
          addDoggo(dogs[k])
        }
      }
    })
  }