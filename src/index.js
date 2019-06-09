


    document.addEventListener("DOMContentLoaded", function(){
      getDogs()
      console.log(document.getElementById('dog-bar'))
    })

    function getDogs() {
      return fetch("http://localhost:3000/pups")
      .then((res) => res.json())
      .then((data) => {addDogs(data)
      })
    }

    function addDogs(dogs) {
      dogs.forEach((dog) => {addDog(dog)
      })
    }

    function addDog(dog) {
      const dogDiv = document.getElementById("dog-bar")
      // dogDiv.dataset.id = dog.id
      const dogSpan = document.createElement("span")
      dogSpan.innerText = dog.name
      dogDiv.append(dogSpan)
      dogSpan.addEventListener("click", function(e) {
        const dogName = dog.name
        const dogImage = dog.image
        let dogStatus = dog.isGoodDog
        const image = document.createElement("img")
        const h2 = document.createElement("h2")
        const button = document.createElement("button")


        if (dogStatus === true) {
        button.innerText = "Good Dog!"
        } else {
        button.innerText = "Bad Dog!"
        }

        button.addEventListener("click", function(e){
          if (dogStatus === true) {
            e.target.innerText = "Bad Dog!"
            dogStatus = false
          } else if (dogStatus === false) {
            e.target.innerText = "Good Dog!"
            dogStatus = true
          }
           fetch(`http://localhost:3000/pups/${dog.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({isGoodDog: dogStatus})
            })
            .then((res) => res.json())
          })

        image.src = dogImage
        h2.innerText = dogName
        document.getElementById("dog-info").innerHTML = ""
        document.getElementById("dog-info").append(h2, image, button)
      })
  }
