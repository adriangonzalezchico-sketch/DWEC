
const TMDB_API_KEY = "c70d967e8c3be3307188ab9ec159d975";
const contenedorResultado = document.getElementById("resultado");



const buscarPeliculaTMDB = async (tituloPelicula) => {

  const respuesta = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=es-ES&query=${encodeURIComponent(tituloPelicula)}`);

  const datos = await respuesta.json();

  return datos.results[0];
};

const obtenerPosterUrl = (posterPath) => {
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
};

// const usarBuscadorVisual = async () => {
//   const tituloPelicula = inputBuscador.value;
//   const pelicula =  await buscarPeliculaTMDB(tituloPelicula);
//   console.log(pelicula);
//   console.log(`Título: ${pelicula.title}`);
//   console.log(`Resumen: ${pelicula.overview}`);
//   console.log(`Fecha de estreno: ${pelicula.release_date}`);
//   console.log(`Valoración: ${pelicula.vote_average} (votos: ${pelicula.vote_count})`);
//   console.log(`Poster URL: ${obtenerPosterUrl(pelicula.poster_path)}`);
// };


const crearResultado = (peli, plataformas) => {
  const fragment = document.createDocumentFragment();

  const section = document.createElement("section");
  section.className = "buscador__resultado";

  const img = document.createElement("img");
  img.className = "buscador__img";
  img.src = obtenerPosterUrl(peli.poster_path);
  img.alt = peli.title;

  const info = document.createElement("div");
  info.className = "buscador__info";

  const h2 = document.createElement("h2");
  h2.className = "buscador__info--titulo";
  h2.textContent = peli.title;

  const resumen = document.createElement("p");
  resumen.className = "buscador__info--resumen";
  resumen.textContent = peli.overview;

  const fecha = document.createElement("p");
  fecha.className = "buscador__info--fecha";
  fecha.textContent = `Fecha de estreno: ${peli.release_date}`;

  const valoracion = document.createElement("p");
  valoracion.className = "buscador__info--valoracion";
  valoracion.textContent = `Valoración media: ${peli.vote_average}`;

  const disponibles = document.createElement("div");
  disponibles.className = "buscador__disponibles";

  const h3 = document.createElement("h3");
  h3.textContent = "Disponible en:";


  if (plataformas.length === 0) {
    const p = document.createElement("p");
    p.className = "buscador__info--disponible";
    p.textContent = "No disponible en España o hay un error";
    disponibles.appendChild(p);
  } else {
    plataformas.forEach((nombre) => {
      const p = document.createElement("p");
      p.className = "buscador__info--disponible";
      p.textContent = nombre;
      disponibles.appendChild(p);
    });
  }

  info.appendChild(h2);
  info.appendChild(resumen);
  info.appendChild(fecha);
  info.appendChild(valoracion);
  info.appendChild(h3);
  info.appendChild(disponibles);

  section.appendChild(img);
  section.appendChild(info);

  fragment.appendChild(section);

  return fragment;
};

const buscarYMostrar = async (titulo) => {
  contenedorResultado.replaceChildren();

  const peli = await buscarPeliculaTMDB(titulo);

  if (!peli) {
    contenedorResultado.textContent = "No se encontró la película.";
    return;
  }

  const idWatchmode = await buscarIdWatchmodePorTitulo(peli.title);
  let plataformas = [];

  if (idWatchmode) {
    const fuentes = await obtenerFuentesPorId(idWatchmode);
    plataformas = quitarDuplicadosPorNombre(fuentes);
  }

  contenedorResultado.appendChild(crearResultado(peli, plataformas));
};



buscador.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const titulo = inputBuscador.value.trim();
  if (!titulo) return;
  buscarYMostrar(titulo);
});