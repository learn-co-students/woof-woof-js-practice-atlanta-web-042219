

document.addEventListener('DOMContentLoaded', function(){

fetchDogs()

})


function fetchDogs(){
  fetch("http://localhost:3000/pups")
     .then(res => res.json())
     .then(data => populateDogs(data))
}

function populateDogs(dogs){
  dogs.forEach(dog => {
    populateDog(dog)
    // console.log(dog)
  })

  function populateDog(dog) {
    const dogBar = document.getElementById("dog-bar")
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
        dogSpan.addEventListener("click", function(){
          const dog_info = document.getElementById("dog-info")
          const img = document.createElement('img')
          img.src = dog.image
          const h2 = document.createElement('h2')
          h2.innerText = dog.name
          const dogStatusBtn = document.createElement('button')
          if (dog.isGoodDog === true){
            dogStatusBtn.innerText = "Good dog!"
          } else {
            dogStatusBtn.innerText = "Bad dog!"
          }
          const likeBtn = document.createElement("button")
          likeBtn.innerText = "Likes:"
          let likeSpan = document.createElement("span")
          likeSpan.innerText = dog.likes
          likeBtn.append(likeSpan)
          
              likeBtn.addEventListener("click", function(){
                likeSpan.innerText = parseInt(likeSpan.innerText) + 1
                fetch(`http://localhost:3000/pups/${dog.id}`, {
                    method: "PATCH",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({"likes": likeSpan.innerText})
                  }).then(resp => resp.json())

              })

          dogStatusBtn.addEventListener("click", function(){
                    if (dog.isGoodDog === true){
                      dogStatusBtn.innerText = "Bad dog!"
                      dog.isGoodDog = false
                    } else {
                      dogStatusBtn.isGoodDog = true
                      dogStatusBtn.innerText = "Good dog!"
                    }
                    fetch(`http://localhost:3000/pups/${dog.id}`, {
                        method: "PATCH",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({"isGoodDog": dog.isGoodDog})
                      }).then(resp => resp.json())
                  })

          dog_info.innerHTML = ""
          dog_info.append(img, h2, dogStatusBtn, likeBtn)
        })
    
    dogBar.appendChild(dogSpan)


  }

}































// document.addEventListener('DOMContentLoaded', function(){
// addPups()
// document.addEventListener("click", handlePups)
// document.getElementById("good-dog-filter").addEventListener('click', filterDogs)

// })


// // const BASE_URL = `http://localhost:3000/pups`
// // const dogBar = document.getElementById('dog-bar')
// let filter = false


// function addPups(){
//   const div = document.querySelector("#dog-bar")
//   // div.addEventListener("click", showInfo)

//   fetch("http://localhost:3000/pups")
//   .then(res => res.json())
//   .then(data => {
//     if(filter === true){
//       data.filter(pup => pup.isGoodDog).forEach(pup => {div.innerHTML += `<span id= "${pup.id}" class= "pups"> ${pup.name} </span>` }
//       )
//     }else{
//     // console.log(data)
//     data.forEach(pup => {
//       // console.log(pup.name)
//       div.innerHTML += `<span id= "${pup.id}" class= "pups"> ${pup.name} </span>`
//       // console.log(div)
//     })}
//   })
// }


// function handlePups(e){
//   e.preventDefault()
//   const div2 = document.getElementById("dog-info")

//   if(e.target.className === "pups"){
//     fetch(`http://localhost:3000/pups/${e.target.id}`)
//     .then(res => res.json())
//     .then(data =>{ 
//       div2.innerHTML = 
//       `<img src=${data.image}>
//       <h2> ${data.name} </h2>`

    
//       if (data.isGoodDog){
//         div2.innerHTML += `<button data-id="${data.id}" id="bad/good"> good dog </button>` 
//       }else {
//          div2.innerHTML += `<button  data-id="${data.id}" id= "bad/good"> bad dog  </button> ` 
      
//      }

//      const btn = document.getElementById("bad/good")
//     //  console.log(btn)
//      btn.addEventListener("click", changeText)
//     })
//   }
// }



// function changeText(e){
//   e.preventDefault()
//   let updateDog;
//   //change the status for good dog or bad dog 
//   if (e.target.innerText === "good dog"){
//     e.target.innerText = "bad dog"
//     updateDog = false
//   }else {
//   e.target.innerText = 'good dog'
//     updateDog = true
//   }
//   // console.log(e.target.dataset.id)

//   fetch(`http://localhost:3000/pups/${e.target.dataset.id}`,{
//     method: 'PATCH',
//     headers: {
//       'Content-Type':'application/json'
//     },
//     body: JSON.stringify({"isGoodDog": updateDog })
//   }).then((res)=>res.json())
// }
                

// function filterDogs(e){
//   console.log(e.target)
//   const div = document.querySelector("#dog-bar")
//   div.innerHTML = ''
//   if(e.target.innerText.includes('OFF')){
//     e.target.innerText = "filter good dogs: ON"
//     filter = true
//   }else {
//     e.target.innerText = "filter good dogs: OFF"
//     filter = false
//   }
//   addPups()
// }

