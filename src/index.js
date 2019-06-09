document.addEventListener("DOMContentLoaded", () => {
    getDogs()
    document.addEventListener("click", handleClickEvents)
})  

function handleClickEvents(e) {
    if(e.target.className === "dog_span") dogDetails(e.target)
    else if(e.target.id === "dogStatus_btn") dogStatus(e.target)
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