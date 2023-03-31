const contenedor = document.querySelector('#contenedorTarjetas');
const container = document.querySelector('#cardContainer');
const selectCasa = document.querySelector('#casa');
const btnBuscar = document.querySelector('#buscar');
const searchBtn = document.querySelector('#search');


function filtrarCasa(array) {
    let casa = selectCasa.value;
    if (!casa) {
        return array;
    } else {
        return array.filter((item) => item.casaDeHogwarts == casa);
    }
}

function crearHTML(array) {
    contenedor.innerHTML = '';
    container.innerHTML = '';
    array.forEach((personaje) => {
        const tarjeta = `
            <div class="col">
                <div class="card h-100">
                    <img src="${personaje.imagen}" class="card-img-top" alt="${personaje.apodo}">
                    <div class="card-body">
                        <h5 class="card-title">${personaje.apodo}</h5>
                        <p class="card-text">Nombre: ${personaje.personaje}</p>
                        <p class="card-text">Casa: ${personaje.casaDeHogwarts}</p>
                        <p class="card-text">Interpretado por: ${personaje.interpretado_por}</p>
                    </div>
                </div>
            </div>`;
        contenedor.innerHTML += tarjeta;
    })
}

btnBuscar.addEventListener('click', () => {
    fetch('./js/data.json') //un json dentro del proyecto con la info en español
        .then((response) => response.json())
        .then((data) => {
            // localStorage.setItem('users',JSON.stringify(data));
            console.log(data);
            crearHTML(filtrarCasa(data));
        })
})


function houseFilter(array) {
    let house = selectCasa.value;
    if (!house) {
        return array;
    } else {
        return array.filter((item) => item.house == house);
    }

}

function createHTML(array) {
    contenedor.innerHTML = ''
    container.innerHTML = ''
    array.forEach((character) => {
        const card = `
            <div class="col">
                <div class="card h-100">
                    <img src="${character.image}" class="card-img-top" alt="${character.name}">
                    <div class="card-body">
                        <h5 class="card-title">${character.name}</h5>
                        <p class="card-text">Especie: ${character.species}</p>
                        <p class="card-text">Nacimiento: ${character.dateOfBirth}</p>
                        <p class="card-text">Casa: ${character.house}</p>
                        <p class="card-text">Patronus: ${character.patronus}</p>
                        <p class="card-text">Interpretado por: ${character.actor}</p>
                    </div>
                </div>
            </div>`
        container.innerHTML += card
    })
}

async function bringData() {
    const response = await fetch('https://hp-api.onrender.com/api/characters'); //acá traigo la info desde una API
    const data = await response.json();
    console.log(data);
    createHTML(houseFilter(data));
}

searchBtn.addEventListener('click', () => {
    bringData();
})


