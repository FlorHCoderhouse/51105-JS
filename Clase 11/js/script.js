//Variable donde guardaremos nuestros libros, eventualmente
let catalogo = [];

//Elementos del DOM
const inputTitulo = document.getElementById('inputTitle'),
    inputAutor = document.getElementById('inputAuthor'),
    inputAnio = document.getElementById('inputYear'),
    inputURLImagen = document.getElementById('inputSourceURL'),
    textareaResumen = document.getElementById('textareaSummary'),
    selectCategoria = document.getElementById('selectCategory'),
    selectValoracion = document.getElementById('selectRating'),
    btnAgregar = document.getElementById('btnAdd'),
    contTarjetas = document.getElementById('cardContainer');


//Clase constructora para los libros
class Libro {

    //Método constructor
    constructor(titulo, autor, anio, genero, valoracion, cover, id) {
        this.titulo = titulo.toUpperCase();
        this.autor = autor.toUpperCase();
        this.anio = parseInt(anio);
        this.genero = genero;
        this.valoracion = parseInt(valoracion);
        this.id = id;
        this.resumen;
        if (cover == '') {
            this.cover = 'https://via.placeholder.com/500x500/d9d2fa/403f3f.jpg?text=Portada+no+disponible';
        } else {
            this.cover = cover;
        }

    }

    //otros métodos para los objetos de clase Libro
    asignarId(array) {
        this.id = array.length;
    }

    asignarCover(sourceURL) {
        this.cover = sourceURL;
    }

    valorar(valoracion) {
        this.valoracion = valoracion;
    }

    agregarResumen(resumen) {
        this.resumen = resumen;
    }

}
function guardarLibro(catalogo) {
    const ejemplar = new Libro(inputTitulo.value, inputAutor.value, inputAnio.value, selectCategoria.value, selectValoracion.value, inputURLImagen.value);


    if (textareaResumen.value != '') {
        ejemplar.agregarResumen(textareaResumen.value);
    } else {
        ejemplar.agregarResumen('Resumen no disponible')
    }


    catalogo.push(ejemplar);

    ejemplar.asignarId(catalogo);

}

function guardarEnStorage(catalogo) {
    localStorage.setItem('catalogoLibros', JSON.stringify(catalogo))
}


function crearTarjetas(arrayElementos, contenedorHTML) {
    contenedorHTML.innerHTML = '';

    for (const elemento of arrayElementos) {

        let divColTarjeta = document.createElement('div');

        divColTarjeta.className = 'col';

        divColTarjeta.innerHTML = `
        <div class="card h-100 bg-light" id="${elemento.id}">
            <h4 class="card-header">${elemento.titulo}</h4>
            <img src="${elemento.cover}" class="coverLibro" alt="Portada del libro ${elemento.titulo}">
            <div class="card-body">
            <h6 class="card-text fst-italic">Autor</h6>
                <p class="card-text">${elemento.autor}</p>
                <h6 class="card-text fst-italic">Resumen</h6>
                <p class="card-text">${elemento.resumen}</p>
            </div>
            <div class="card-footer">
            <span>Valoración: ${elemento.valoracion} puntos</span>
            </div>
        </div>`;

        contenedorHTML.append(divColTarjeta);
    }

}

btnAgregar.onclick = (e) => {
    e.preventDefault();
    guardarLibro(catalogo);
    guardarEnStorage(catalogo);
    crearTarjetas(catalogo, contTarjetas);
}


window.onload = () => {
    catalogo = JSON.parse(localStorage.getItem('catalogoLibros'))
    if (catalogo != null) {
        crearTarjetas(catalogo, contTarjetas);
    } else {
        catalogo = [];
    }

} 