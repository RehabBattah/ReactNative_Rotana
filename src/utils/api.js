const API_KEY = "9fce3030adb4f213b18b7d9916a54081";

export const fetchMovieById = async (id) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data;
};

export const fetchRecommendations = async (movieId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results.slice(0, 10);
};
