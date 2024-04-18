import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = "872a56ce8dffb321ded14ae4c6f4bbeb";

const MoviePopular = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);

  const popularMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${API_KEY}`,
        { headers: { accept: "application/json" } }
      );
      console.log("response data", response.data);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    popularMovies();
  });
  return (
    <div className="">
      <header className="bg-gray-800 text-white py-4 px-4">
        <h1 className="text-3xl font-bold">Popular Movies</h1>
      </header>
      <div className="grid grid-cols-3 gap-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-300"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-fit object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>
              <p className="text-gray-700 mb-2">
                {movie.overview.length > 160
                  ? `${movie.overview.substring(0, 160)}...`
                  : movie.overview}
              </p>
              <p className="text-gray-600">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviePopular;
