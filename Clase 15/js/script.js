//https://http.cat/ Códigos de estado de petición (con gatitos)
//https://github.com/public-apis/public-apis +1400 APIs
//https://jsonformatter.curiousconcept.com/# formateador para archivos json
//https://openweathermap.org/current API del clima



//Petición con método GET
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => console.log(data))



//Petición con método POST
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(
        {
            title: 'Mi primer post',
            body: 'Esto es un posteo de prueba',
            userId: 1,
        }
    ),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
}).then((response) => response.json())
    .then((data) => console.log(data));



const APIKEY = 'b81385fefdba9b444da4eab9735021d4';
const tempValor = document.querySelector('.temp');
const tempDescripcion = document.querySelector('.desc');
const cardContainer = document.querySelector('#cardContainer');
const btnMostrar = document.querySelector('#mostrar');
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(ubicacion => {

        let lat = ubicacion.coords.latitude
        let lon = ubicacion.coords.longitude
        console.log(lat, lon);

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=${APIKEY}`

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let temp = (data.main.temp).toFixed(1);
                tempValor.textContent = `${temp} °C`
                let descripcion = data.weather[0].description;
                console.log(descripcion);
                tempDescripcion.textContent = descripcion;
            })

    })
}


const crearTarjeta = (array) => {
    cardContainer.innerHTML = ''
    array.forEach(element => {
        let card =
            `<div class="card">
            <img src="${element.imagen}" class="card-img-top" alt="${element.nombre}">
            <div class="card-body ${element.categoria}">
                <h5 class="card-title">${element.nombre}</h5>
                <p class="card-text">Precio: $ ${element.precio}</p>
                <a href="#" class="btn btn-primary">Comprar</a>
            </div>
        </div>`
        cardContainer.innerHTML += card
    });

}

const usarJson = async function () {
    let response = await fetch('./js/data.json');
    let productos = await response.json();
    console.log(productos);
    crearTarjeta(productos);
}


btnMostrar.onclick = usarJson;
