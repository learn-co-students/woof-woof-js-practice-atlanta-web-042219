document.addEventListener("DOMContentLoaded", () => {
    getDogs()
    document.addEventListener("click", handleClickEvents)
})  

function handleClickEvents(e) {
    if(e.target.className === "dog_span") dogDetails(e.target)
    // else if (e.target.className === "")
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
    <button>Good Dog!</button>`
}