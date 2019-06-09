document.addEventListener('DOMContentLoaded', function(){

	document.addEventListener('click', handleClickEvents)
	fetch_doggers()

	// ____________________ function definitions ____________________ //

	function handleClickEvents(e) {
		if(e.target.className === 'dogger_span') show_dogger_info(e.target)
		else if(e.target.id === 'isgooddog_btn') change_isgooddog_status(e.target)
		else if(e.target.id === 'good-dog-filter') e.target.innerText.endsWith('OFF') ? show_good_doggers(e.target) : show_all_doggers(e.target)
	}

	function fetch_doggers() {
		return fetch('http://localhost:3000/pups')
		.then(resp => resp.json())
		.then(json => json.forEach(add_dogger_span))
	}

	function add_dogger_span(dogger) {
		document.getElementById('dog-bar').innerHTML += 
		`<span id="${dogger.id}" class="dogger_span" data-name="${dogger.name}" data-isgooddog="${dogger.isGoodDog}" data-image="${dogger.image}">${dogger.name}</span>`
	}

	function show_dogger_info(dogger_span) {
		document.getElementById('dog-summary-container').innerHTML = `
			<img src=${dogger_span.dataset.image}>
  		<h2>${dogger_span.dataset.name}</h2>
  		<button id="isgooddog_btn" data-dogger-id="${dogger_span.id}">${dogger_span.dataset.isgooddog === 'true' ? 'Bad Dog!' : 'Good Dog!'}</button>`
	}

	function change_isgooddog_status(button) {
		const dogger_span = document.getElementById(button.dataset.doggerId)
		dogger_span.dataset.isgooddog = dogger_span.dataset.isgooddog === 'false'
		button.innerText = button.innerText === 'Good Dog!' ? 'Bad Dog!' : 'Good Dog!'

		fetch(`http://localhost:3000/pups/${button.dataset.doggerId}`,{
			method: 'PATCH',
			headers: { 'Content-Type':'application/json' },
			body: JSON.stringify({isGoodDog: dogger_span.dataset.isgooddog})
		})
	}

	function show_good_doggers(button) {
		button.innerText = 'Filter good dogs: ON'
		const all_doggers = document.getElementById('dog-bar').children
		let good_doggers = []

		for(let k=0; k<all_doggers.length; k++){
			if(all_doggers[k].dataset.isgooddog === 'true') good_doggers.push(all_doggers[k])
		}

		document.getElementById('dog-bar').innerHTML = ''
		good_doggers.forEach(dogger => {
			add_dogger_span({
				id: dogger.id,
				name: dogger.dataset.name,
				isGoodDog: dogger.dataset.isgooddog,
				image: dogger.dataset.image
			})
		})
	}

	function show_all_doggers(button) {
		button.innerText = 'Filter good dogs: OFF'
		document.getElementById('dog-bar').innerHTML = ''
		fetch_doggers()
	}

	// END \\
})
