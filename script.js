// API request handler

function apiRequest(URL) {
    let response = fetch(`${URL}`);
    return response;
}

// Ejercicio 1

function ejercicio1(pokemonID) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}/`;
    let response = apiRequest(url);
    response.then((value) => {
        return value.json();
    }).then((valueJson) => {
        const ul = document.getElementById('typePokemon');
        ul.innerHTML = '';
        document.getElementById('idPokemon').innerHTML = `${valueJson.id}`;
        document.getElementById('namePokemon').innerHTML = `${valueJson.name}`;
        for (let i = 0; i < valueJson.types.length; i++) {
            const para = document.createElement(`li`);
            const node = document.createTextNode(`${valueJson.types[i].type.name}`);
            para.appendChild(node);
            const element = document.getElementById("typePokemon");
            element.appendChild(para);
        }

    }).catch((err) => {
        alert(`El nombre de pokemon ingresado no existe`)
    });
}

// Ejercicio 2

function ejercicio2(nombreLibro) {
    let replaceSpace = nombreLibro.replaceAll(' ', '+');
    let url = `http://openlibrary.org/search.json?q=${replaceSpace}`;
    let response = apiRequest(url);
    response.then((value) => {
        return value.json();
    }).then((valueJson) => {
        const ul = document.getElementById('autoresLibro');
        ul.innerHTML = '';
        document.getElementById('anoPublicacionLibro').innerHTML = `${valueJson.docs[0].first_publish_year}`;
        document.getElementById('nombreLibroEncontrado').innerHTML = `${valueJson.docs[0].title}`;
        for (let i = 0; i < valueJson.docs[0].author_name.length; i++) {
            const para = document.createElement(`li`);
            const node = document.createTextNode(`${valueJson.docs[0].author_name[i]}`);
            para.appendChild(node);
            const element = document.getElementById("autoresLibro");
            element.appendChild(para);
        }
    }).catch((err) => {
        alert(`No se ha encontrado un libro con ese nombre.`)
    });
}

// Ejercicio 3

function ejercicio3(nombreAutor, limitResults) {
    let replaceSpace = nombreAutor.replaceAll(' ', '+');
    let url = `http://openlibrary.org/search.json?author=${replaceSpace}`
    let response = apiRequest(url);
    response.then((value) => {
        return value.json();
    }).then((valueJson) => {
        const ul = document.getElementById('librosDelAutor');
        ul.innerHTML = '';
        document.getElementById('buscandoAutor').innerHTML = `${nombreAutor}`;
        for (let i = 0; i < limitResults; i++) {
            const para = document.createElement(`li`);
            const node = document.createTextNode(`${valueJson.docs[i].title}`);
            para.appendChild(node);
            const element = document.getElementById("librosDelAutor");
            element.appendChild(para);
        }
    }).catch((err) => {
        alert(`No se encontraron libros para el autor buscado.`)
    });
}

// Ejercicio 4

function ejercicio4(nombreBanda) {
    let replaceSpace = nombreBanda.replaceAll(' ', '+');
    let url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${replaceSpace}`;
    let response = apiRequest(url);
    response.then((value) => {
        return value.json();
    }).then((valueJson) => {
        document.getElementById('nombreBanda').innerHTML = `${valueJson.artists[0].strArtist}`;
        document.getElementById('anoCreacionBanda').innerHTML = `${valueJson.artists[0].intBornYear}`;
        document.getElementById('paisBanda').innerHTML = `${valueJson.artists[0].strCountry}`;
        document.getElementById('generoBanda').innerHTML = `${valueJson.artists[0].strGenre}`;
    }).catch((err) => {
        alert(`No se encontro una banda con el nombre que ingresaste.`)
    });
}

// Ejercicio 5

function ejercicio5(idPersonaje) {
    let url = `https://swapi.dev/api/people/${idPersonaje}`;
    let response = apiRequest(url);
    response.then((value) => {
        return value.json();
    }).then((valueJson) => {
        const ul = document.getElementById('peliculasPersonaje');
        ul.innerHTML = '';
        document.getElementById('personajeEncontrado').innerHTML = `${valueJson.name}`;
        for (let i = 0; i < valueJson.films.length; i++) {
            let url = `${valueJson.films[i]}`;
            let response = apiRequest(url);
            response.then((value) => {
                return value.json();
            }).then((valueJson) => {
                const para = document.createElement(`li`);
                const node = document.createTextNode(`${valueJson.title}`);
                para.appendChild(node);
                const element = document.getElementById("peliculasPersonaje");
                element.appendChild(para);
            }).catch((err) => {
                alert(`No se pudieron obtener las peliculas del personaje`)
            })
        }
    }).catch((err) => {
        alert(`No se pudo procesar la peticion`)
    });
}

// Ejercicio 6

function dateHandler(date, days) {
    date.setDate(date.getDate() + days);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function dates(date) {
    const datesSaved = [];
    for (let i = 6; i >= 0; i--) {
        datesSaved.push(dateHandler(date, -1));
    }
    return datesSaved;
}

function ejercicio6() {
    var getDate = new Date();
    const previousWeek = dates(getDate);
    console.log(previousWeek);
    let url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${previousWeek[6]}&end_date=${previousWeek[0]}&api_key=tfr3x3740btODUQqBho7RkKVkgRrm7V21LL2JqEF`;
    let response = apiRequest(url);
    response.then((value) => {
        return value.json();
    }).then((valueJson) => {
        document.getElementById('fechaInicial').innerHTML = `${previousWeek[6]}`;
        document.getElementById('fechaFinal').innerHTML = `${previousWeek[0]}`;

        const ul = document.getElementById('fechaEncontrada');
        ul.innerHTML = '';

        function getAsteroids(dates) {
            for (let i = 0; i < dates.length; i++) {
                if (typeof (valueJson.near_earth_objects[dates[i]]) != "undefined") {
                    const li = document.createElement(`li`);
                    li.setAttribute(`id`, `LI${dates[i]}`)
                    const node = document.createTextNode(`${dates[i]}`);
                    li.appendChild(node);
                    const element = document.getElementById("fechaEncontrada");
                    element.appendChild(li);
                    const ul = document.createElement(`ul`);
                    ul.setAttribute(`id`, `UL${dates[i]}`)
                    const element1 = document.getElementById(`LI${dates[i]}`)
                    element1.appendChild(ul);
                    for (let j = 0; j < valueJson.near_earth_objects[dates[i]].length; j++) {
                        const li = document.createElement(`li`);
                        const node2 = document.createTextNode(`Nombre asteroide: ${valueJson.near_earth_objects[dates[i]][j].name}`);
                        li.appendChild(node2);
                        const element3 = document.getElementById(`UL${dates[i]}`);
                        element3.appendChild(li);
                    }
                }
            }
        }

        getAsteroids(previousWeek);
    }).catch((err) => {
        alert(`No se pudo obtener los datos de asteroides`)
    });
}

// Ejercicio 7

function ejercicio7() {
    let url = `https://pokeapi.co/api/v2/pokemon?&limit=150`;
    let response = apiRequest(url);
    response.then((value) => {
        return value.json();
    }).then((valueJson) => {
        const ul = document.getElementById('listaPokemons');
        ul.innerHTML = '';

        for (let i = 0; i < valueJson.results.length; i++) {
            const li = document.createElement(`li`);
            li.setAttribute(`id`, `LI${valueJson.results[i].name}`)
            const node = document.createTextNode(`Nombre: ${valueJson.results[i].name}`);
            li.appendChild(node);
            const element = document.getElementById("listaPokemons");
            element.appendChild(li);
            const ul = document.createElement(`ul`);
            ul.setAttribute(`id`, `UL${valueJson.results[i].name}`)
            const element1 = document.getElementById(`LI${valueJson.results[i].name}`)
            element1.appendChild(ul);

            function getPokemon(url) {
                let getDataPokemon = apiRequest(url);
                getDataPokemon.then((value) => {
                    return value.json();
                }).then((valueJsonPokemon) => {

                    function displayDataObject(dataToGet) {
                        const li = document.createElement(`li`);
                        const node = document.createTextNode(`${dataToGet}: ${valueJsonPokemon[dataToGet]}`);
                        li.appendChild(node);
                        const element = document.getElementById(`UL${valueJson.results[i].name}`);
                        element.appendChild(li);
                    }


                    displayDataObject('height');
                    displayDataObject('weight');
                }).catch((err) => {
                    alert(`No se pudo indexar la data al indice`)
                })




            }
            getPokemon(`${valueJson.results[i].url}`);
        }
    }).catch((err) => {
        alert(`No se pudo procesar la peticion`)
    });
}






