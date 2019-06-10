document.addEventListener('DOMContentLoaded', function(){

	// VARIABLES
	const DOGS_URL = 'http://localhost:3000/pups'
	const dogbar_div = document.getElementById('dog-bar')
	let dog_filter_on = false

	// MAIN
	document.addEventListener('click', handleClickEvents)
	fetch_dogs()

	//											//
	// FUNCTION DEFINITIONS //
	//											//
	function handleClickEvents(e) {
		if(e.target.className === 'dogspan') show_dog_info(e.target.dataset.dogId)
		else if(e.target.id === 'dog_status_btn') change_dog_status(e.target)
		else if(e.target.id === 'good-dog-filter') filter_dogs(e.target)
	}

	function filter_dogs(button) {
		dog_filter_on = !dog_filter_on
		button.innerText = dog_filter_on ? 'Filter good dogs: ON' : 'Filter good dogs: OFF'
		dogbar_div.innerHTML = ''

		if(dog_filter_on) {
			fetch(DOGS_URL)
			.then(resp => resp.json())
			.then(dogs => {
				for(let k in dogs)
					if(dogs[k].isGoodDog)
						add_dogspan(dogs[k])
			})
		}
		else
			fetch_dogs()
	}

	function fetch_dogs() {
		fetch(DOGS_URL)
		.then(resp => resp.json())
		.then(json => json.forEach(add_dogspan))
	}

	function add_dogspan(dog) {
		dogbar_div.innerHTML += `<span class="dogspan" id=${dog.id} data-dog-id=${dog.id} data-is-good-dog=${dog.isGoodDog}>${dog.name}</span>`
	}

	function show_dog_info(id) {
		fetch(DOGS_URL+'/'+id)
		.then(resp => resp.json())
		.then(dog => {
			document.getElementById('dog-info').innerHTML = `
				<img src=${dog.image}>
				<h2>${dog.name}</h2>
				<button id="dog_status_btn" data-dog-id=${dog.id} data-is-good-dog=${dog.isGoodDog}>${dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>`
		})
	}

	function change_dog_status(button) {
		let temp_gds = button.dataset.isGoodDog === 'false'
		button.dataset.isGoodDog = button.dataset.isGoodDog === 'false'
		
		fetch(DOGS_URL+'/'+button.dataset.dogId, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ isGoodDog : temp_gds })
		})
		.then(button.innerText = temp_gds ? 'Good Dog!' : 'Bad Dog!')

		// dumb fancy stuff
		if(dog_filter_on && !temp_gds)
			document.getElementById(button.dataset.dogId).remove()
		else if(dog_filter_on && temp_gds) {
			fetch(DOGS_URL+'/'+button.dataset.dogId)
			.then(resp => resp.json())
			.then(add_dogspan)
		}
	}

	// END //
})