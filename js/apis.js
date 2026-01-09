const inputBuscador = document.getElementById("input-buscador");
const buscador = document.getElementById("buscador");

const WATCHMODE_API_KEY = "jJrlBTswASneByRvbKhIIURDMb1GdeoG5dxFIxXv";

const buscarIdWatchmodePorTitulo = async (tituloPelicula) => {

  const respuesta = await fetch(`https://api.watchmode.com/v1/search/?apiKey=${WATCHMODE_API_KEY}&search_field=name&search_value=${encodeURIComponent(tituloPelicula)}`);

  const datos = await respuesta.json();

  return datos.title_results[0].id;
};

const obtenerFuentesPorId = async (idWatchmode) => {

  const respuesta = await fetch(`https://api.watchmode.com/v1/title/${idWatchmode}/sources/?apiKey=${WATCHMODE_API_KEY}`);
  const datos = await respuesta.json();

  return datos;
};


// const probarWatchmode = async () => {
//   const datos = await buscarIdWatchmodePorTitulo("cars");
//   const fuente = await obtenerFuentesPorId(datos);
//   console.log(datos);
//   console.log(fuente);
// };

// probarWatchmode();

const quitarDuplicadosPorNombre = (fuentes) => {
  const unicas = [];

  fuentes.forEach((fuente) => {
    if (!unicas.includes(fuente.name)) {
      unicas.push(fuente.name);
    }
  });

  return unicas;
};


const usarBuscador = async () => {
  const tituloPelicula = inputBuscador.value;
  const idWatchmode = await buscarIdWatchmodePorTitulo(tituloPelicula);
  const fuentes = await obtenerFuentesPorId(idWatchmode);

  const plataformasUnicas = quitarDuplicadosPorNombre(fuentes);
  console.log(plataformasUnicas);
};


buscador.addEventListener("submit", (evento) => {
  evento.preventDefault();
  usarBuscador();
});


