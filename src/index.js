document.addEventListener("DOMContentLoaded", init)
////////////////////////////variables needed///////////////////////////////////
const baseURL = "http://localhost:3000/pups"
const filterButton = document.querySelector('#good-dog-filter')
const dogBar = document.querySelector('#dog-bar')
const dogSumCont = document.querySelector('#dog-summary-container')
const dogInfo = document.querySelector('#dog-info')
const goodDogButton = document.createElement('button')

///////////////////////////functions needed///////////////////////////////////


function init(){
  fetchDogs()//should add dogs to the dogBar

  filterButton.addEventListener("click", filterDogs)

}//END


function fetchDogs(){
  //fetch dogs from the database and add them to the dogBar
  //should include pupSpan with pup's name and an id of "dog-span"
  // pupSpan.addEventListener("click", displayDogInfo)
  // dogBar.innerHTML = ""
  fetch(baseURL)
  .then(res => res.json())
  .then(res => {res.forEach(createDogSpan)})

  filterButton.innerText = "Filter Good Dogs: OFF"
}//END

function createDogSpan(dog){
  let span = document.createElement('span')
  span.innerText = `${dog.name}`
  dogBar.appendChild(span)
  span.addEventListener("click", (e) => displayDogInfo(e, dog))
}//END


function displayDogInfo(e, dog){
  e.preventDefault()
  // AFTER user clicks on pupSpan, this function should display that dogs info
  // on the dogInfo div
  //should have button for isGoodDog with id of "data-pup-id = pup's id #"
  //goodDogButton.addEventListener("click", isGoodDog)
  // dogInfo//div where dog info should appear
  dogInfo.innerHTML = ""
  let img = document.createElement('img')
  let h2 = document.createElement('h2')

  img.src = dog.image
  h2.innerText = dog.name
  goodDogButton.dataset.dogId = dog.id
    if (dog.isGoodDog === true){
      goodDogButton.innerText = "Good Dog!"
    }
    else {
      goodDogButton.innerText = "Bad Dog!"
    }


  dogInfo.appendChild(img)
  dogInfo.appendChild(h2)
  dogInfo.appendChild(goodDogButton)

  goodDogButton.addEventListener("click", (e) => isGoodDog(e, dog))
}//END

function isGoodDog(e, dog){
  e.preventDefault()

  //After button is clicked this function should change the goodDogButton.innerText
  //from good-bad or vice versa and make the swap in the db as well
  fetch(`${baseURL}/${dog.id}`,{
    method: "PATCH",
    headers:{ "Content-Type": "application/json"},
    body: JSON.stringify({isGoodDog: !dog.isGoodDog})
  })

  if (dog.isGoodDog === true){
    dog.isGoodDog = false
    goodDogButton.innerText = "Bad Dog!"
  }
  else {
    dog.isGoodDog = true
    goodDogButton.innerText = "Good Dog!"
  }
}//END

/////////////////////BONUS/////////////////////////////////////////////////////
function filterDogs(e){
  e.preventDefault()
  // console.log("LAST LAP! GO GO GO!")
  //after filterButton is clicked this function should swith the filterButton.innerText
  //from off to on or vice versa
  //when button says on , should only display good dogs. when off should display all dogs
  if (e.target.innerText === "Filter Good Dogs: OFF"){
    fetch(baseURL)
    .then(res => res.json())
    .then(res => {
      let goodDogs = res.filter(dog => dog.isGoodDog === true)
      dogBar.innerHTML = ""
      filterButton.innerText = "Filter Good Dogs: ON"
      goodDogs.forEach(createDogSpan)
    })
  }
  else if (e.target.innerText === "Filter Good Dogs: ON"){
    dogBar.innerHTML = ""
    fetchDogs()
  }
  // filterButton.addEventListener("click", fetchDogs)
}//END
