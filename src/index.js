let dogFilterOn = false

document.addEventListener("DOMContentLoaded", () => {
    getDogs()
    document.addEventListener("click", handleClickEvents)
})  

function handleClickEvents(e) {
    if(e.target.className === "dog_span") dogDetails(e.target)
    else if(e.target.id === "dogStatus_btn") dogStatus(e.target)
    else if (e.target.id === "good-dog-filter") goodDogFilter(e.target)
}

function getDogs() { 
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(res => 
        {res.forEach(dog => displayDog(dog))
    })
} 

function displayDog(dog) {
    document.getElementById("dog-bar").innerHTML += 
    `<span id="${dog.id}" class="dog_span" 
        data-name="${dog.name}"
        data-isgooddog="${dog.isGoodDog}" 
        data-image="${dog.image}">${dog.name}
    </span>`
}

function dogDetails(dog_span) {
    document.getElementById("dog-info").innerHTML = 
    `<img src=${dog_span.dataset.image}>
        <h2>${dog_span.dataset.name}</h2>
    <button id="dogStatus_btn" data-dog-id="${dog_span.id}">
        ${dog_span.dataset.isgooddog === "true" ? "Good Dog!" : "Bad Dog!"}
    </button>`

}

function dogStatus(button) {
    const dog_span = document.getElementById(button.dataset.dogId)
    dog_span.dataset.isgooddog = dog_span.dataset.isgooddog === "false"
    button.innerText = button.innerText === "Good Dog!" ? "Bad Dog!" : "Good Dog!"

    fetch(`http://localhost:3000/pups/${button.dataset.dogId}`,{
        method: "PATCH",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({isGoodDog: dog_span.dataset.isgooddog})
    })
}

function goodDogFilter(button) {
    if(dogFilterOn) {
        // show all dogs
        button.innerText = "Filter good dogs: OFF"
        dogFilterOn = false
        document.getElementById("dog-bar").innerHTML = ""
        getDogs()
    }
    else {
        // show good dogs only
        let goodDogs = []
        let allDogs = document.getElementById("dog-bar").children
        for(let k=0; k<allDogs.length; k++)
        {
            if(allDogs[k].dataset.isgooddog === "true") 
                goodDogs.push(allDogs[k]) 
        }
        document.getElementById("dog-bar").innerHTML = ""
        goodDogs.forEach(dog => {
            let dog_obj = {
                id: dog.id,
                name: dog.dataset.name,
                isGoodDog: dog.dataset.isgooddog,
                image: dog.dataset.image
            }
            displayDog(dog_obj)
        })
        button.innerText = "Filter good dogs: ON"
        dogFilterOn = true
    }

}