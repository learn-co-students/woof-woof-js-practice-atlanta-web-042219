
document.addEventListener("DOMContentLoaded", () => {
  const baseURL = `http://localhost:3000`
  const pupsURL = `${baseURL}/pups`
  // const dogInfoDiv = document.getElementById('dog-info')
    // console.log('dogInfoDiv', dogInfoDiv)

  document.addEventListener('click', handleEvents)

  getPups();

// -------------------------------------------------------------- //

  function getPups() {
    fetch(pupsURL)
    .then(res => res.json())
    .then(dogBar)

    // .then(data => {
    //   data.forEach(dogBar)
    // })
  }

// -------------------------------------------------------------- //

  function dogBar(pups){
    // console.log('dogBar data', pups)

    let dogBarDiv = document.getElementById('dog-bar')
    // console.log('dogBarDiv', dogBarDiv)
    
    pups.forEach(pup => {
      // console.log('each pup', pup)

      let dogBarSpan = `<span class="dog-span" data-id=${pup.id}>${pup.name}</span>`
      // console.log('dogBarSpan', dogBarSpan)

      dogBarDiv.innerHTML += dogBarSpan
    })
  }

// -------------------------------------------------------------- //

  function handleEvents(e) {
    const pupID = e.target.dataset.id
    // const pupID = e.target.className
      // console.log(pupID)

    if (e.target.className === 'dog-span') {
      console.log("yep", pupID)

      fetch(`${pupsURL}/${pupID}`)
      .then(res => res.json())
      // .then(console.log)
      .then(res => {
        let dogInfoDiv = document.getElementById('dog-info')
          // console.log(dogInfoDiv)
        
        if (res.isGoodDog === true) {var button = 'Good Dog!'}
        else {var button = 'Bad Dog!'}

        dogInfoDiv.innerHTML = 
          `<img src=${res.image}>
          <h2>${res.name}</h2>
          <button>${button}</button>`
      })
    }

    // newPokemon = e.target.nextSibling.nextSibling
    // newPokemon.innerHTML +=
    //   `<li> ${res.nickname} (${res.species}) <button class="release" data-pokemon-id=${res.id}>Release</button></li>`
    
    // else if (e.target.innerText === 'Release') {
    //   fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, {
    //     method: 'DELETE'
    //   })
    //   pokemon.remove()
    // }
  }

// FINAL BRACKETS BELOW ----------------------------------------- //

})
