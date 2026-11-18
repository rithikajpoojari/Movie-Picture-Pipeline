import React, { useState, useEffect } from "react";
import axios from "axios";

function MovieDetail({ movie }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!movie?.id) return;

    setLoading(true);
    setError("");
    setDetails(null);

    axios
      .get(`${process.env.REACT_APP_MOVIE_API_URL}/movies/${movie.id}`)
      .then((response) => {
        setDetails(response.data);
      })
      .catch(() => {
        setError("Unable to load movie details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [movie?.id]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;
  if (!details?.movie) return <p>Movie details not found.</p>;

  return (
    <div>
      <h2>{details.movie.title}</h2>
      <p>{details.movie.description}</p>
    </div>
  );
}

export default MovieDetail;
