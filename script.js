const apiUlr = 'https://swapi.dev/api';
const planets = [];

for(let i = 1; i <= 6; i++){
    fetch(`${apiUlr}/planets/?page=${i}`)
        .then(res => res.json())
        .then(data => {
            planets.push(...data.results)
            displayPlanets()
        })
}


function findMatches(wordToMatch, planets) {
    return planets.filter(planet => {
        const regex = new RegExp(wordToMatch, 'gi');
        return planet.name.match(regex)
    });
}

function generateCallback(obj) {
    return () => {
        const url = obj.residents[Math.floor(Math.random() * obj.residents.length)]
        fetch(url)
            .then(res => res.json())
            .then(data => {
                alert(`${data.name}\nGender: ${data.gender} \nHeight: ${data.height}\nMass:${data.mass}\nSkin Color: ${data.skin_color}\nHair Color: ${data.hair_color}\nEye Color: ${data.eye_color}`)
            })
    }
}



function displayPlanets() {
    const matchArray = findMatches(this.value, planets);
    const html = matchArray.map((planet) => {
        return `
          <div class="card">
            <h2>${planet.name}</h2>
            <div class="description">
                <span>climate: ${planet.climate}</span>
                <span>created: ${planet.created}</span>
                <span>diameter: ${planet.diameter}</span>
                <span>edited: ${planet.edited}</span>
                <span>gravity: ${planet.gravity}</span>
                <span>orbital period: ${planet.orbital_period}</span>
                <span>population: ${planet.population}</span>
                <span>rotation period: ${planet.rotation_period}</span>
                <span>surface water: ${planet.surface_water}</span>
                <span>terrain: ${planet.terrain}</span>
            </div>
          </div>
        `;
    }).join('');

    table.innerHTML = html;
    const selectors = document.querySelectorAll('.card')
    selectors.forEach((val, index) => {
        val.addEventListener('click', generateCallback(matchArray[index]))
    })


}
const searchInput = document.querySelector('.search');
const table = document.querySelector('.table');

searchInput.addEventListener('change', displayPlanets);
searchInput.addEventListener('keyup', displayPlanets);







