// In order to use the functions below you will need to generate an api key at https://developer.themoviedb.org/reference/intro/getting-started

const tmdbKey = 'your-tmdb-api-key';
const tmdbBaseUrl = 'https://api.themoviedb.org/3/';
const playBtn = document.getElementById('playBtn');

// Uses api to get the film genres for drop-down menu
const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try{
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
  } catch(error) { console.log(error) }
};


// Get movies data
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = 'discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genre=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try { 
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    } 
  } catch (error){ 
  console.log(error); 
  }
};


// Get short movie description
const getMovieInfo = async (movie) => {
  const movieId = movie.id; 
  const movieEndPoint = `movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndPoint}${requestParams}`;
  try{ 
    const response = await fetch(urlToFetch);
    if(response.ok){
      const movieInfo = await response.json();
      return movieInfo;
    }
   } catch(error) { console.log(error) }
};

// Get a list of movies and ultimately display the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
const movies = await getMovies();
const randomMovie = getRandomMovie(movies);
const info = await getMovieInfo(randomMovie);
displayMovie(info);
};

// Populate drop-down menu with genres
getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;