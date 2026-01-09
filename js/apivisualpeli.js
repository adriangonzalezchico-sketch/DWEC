
const TMDB_API_KEY = "c70d967e8c3be3307188ab9ec159d975";




const buscarPeliculaTMDB = async (tituloPelicula) => {

  const respuesta = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=es-ES&query=${encodeURIComponent(tituloPelicula)}`);

  const datos = await respuesta.json();

  return datos.results[0];
};

const obtenerPosterUrl = (posterPath) => {
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
};

const usarBuscadorVisual = async () => {
  const tituloPelicula = inputBuscador.value;
  const pelicula =  await buscarPeliculaTMDB(tituloPelicula);
  console.log(pelicula);
  console.log(`Título: ${pelicula.title}`);
  console.log(`Resumen: ${pelicula.overview}`);
  console.log(`Fecha de estreno: ${pelicula.release_date}`);
  console.log(`Valoración: ${pelicula.vote_average} (votos: ${pelicula.vote_count})`);
  console.log(`Poster URL: ${obtenerPosterUrl(pelicula.poster_path)}`);
};

buscador.addEventListener("submit", (evento) => {
  evento.preventDefault();
  usarBuscadorVisual();
});