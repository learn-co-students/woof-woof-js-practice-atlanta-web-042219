document.addEventListener("DOMContentLoaded", ()=>{
    const BASE_URL = `http://localhost:3000/pups`
    const dogBar = document.getElementById('dog-bar')
    const dogInfo = document.getElementById('dog-info')
    let filter = false;
    document.addEventListener('click', handleEvents)
    
    function fetchDogs(){
    fetch(BASE_URL)
    .then(res => res.json())
    .then(pups =>{
        if (filter){
            pups.filter((pup) => pup.isGoodDog).forEach(addPup)
        }else{
        pups.forEach(addPup)
        }
    })
}
fetchDogs();

    function addPup(pup){
        dogBar.innerHTML += `<span data-id="${pup.id}">${pup.name}</span>`
    }

    function handleEvents(e){
        e.preventDefault();
        if (e.target.tagName === 'SPAN'){
            getPupInfo(e.target);
        }else if(e.target.id === 'good-dog-button'){
            changeStatus(e);
        }else if(e.target.id === 'good-dog-filter'){
            filterDogs(e);
            
        }
    }

function getPupInfo(pup){
    let id = pup.dataset.id;
    fetch(`${BASE_URL}/${id}`)
    .then(res => res.json())
    .then(addDogInfo)
}

function addDogInfo(pup){
    dogInfo.innerHTML = 
    `<img src="${pup.image}">
    <h2>${pup.name}</h2>
    <button id="good-dog-button" data-id="${pup.id}">${pup.isGoodDog ? "Good Dog!" : "Bad Dog!" }</button>`
}
function changeStatus(e){
    let id = e.target.dataset.id;

    let status;

    if (e.target.innerText === 'Good Dog!'){
        status = false;
        e.target.innerText = "Bad Dog!";
    } else {
        status = true;
        e.target.innerText = "Good Dog!";
    }

    fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({isGoodDog: status})
    })
}

function filterDogs(e){
    dogBar.innerHTML = ""
    if (e.target.innerText.includes('OFF')){
        e.target.innerText = "Filter good dogs: ON"
    } else {
        e.target.innerText = "Filter good dogs: OFF"
    }
    filter = !filter
    fetchDogs()
}
})