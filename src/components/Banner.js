import { useEffect, useState } from "react";
import "../styles/Banner.css";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

const opts = {
  height: "400",
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};

const Banner = ({selectedMovie}) => {

  const [movie, setMovie] = useState(selectedMovie ? selectedMovie : {
    title: "",
    release_date: "",
    backdrop_poster: "",
    overview: "",
  });
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock Netflix Originals data
        const mockNetflixOriginals = [
          {
            title: "Stranger Things",
            release_date: "2016-07-15",
            backdrop_poster: "https://image.tmdb.org/t/p/original/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
            overview: "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back."
          },
          {
            title: "The Crown",
            release_date: "2016-11-04",
            backdrop_poster: "https://image.tmdb.org/t/p/original/7k9vdtVOjxl4k64myL5oQYEvIhI.jpg",
            overview: "The story of Queen Elizabeth II and the events that shaped the second half of the twentieth century."
          },
          {
            title: "Money Heist",
            release_date: "2017-05-02",
            backdrop_poster: "https://image.tmdb.org/t/p/original/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
            overview: "Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan."
          },
          {
            title: "Bridgerton",
            release_date: "2020-12-25",
            backdrop_poster: "https://image.tmdb.org/t/p/original/9k9vdtVOjxl4k64myL5oQYEvIhI.jpg",
            overview: "Wealth, lust, and betrayal set against the backdrop of Regency-era England, seen through the eyes of the powerful Bridgerton family."
          }
        ];
        
        setMovie(
          mockNetflixOriginals[
            Math.floor(Math.random() * (mockNetflixOriginals.length - 1))
          ]
        );
      } catch (error) {
        console.log(error);
      }
    };

    if(!selectedMovie){
      fetchData();
    }
  }, [selectedMovie]);

  const truncate = (str, limit) => {
    return str?.length > limit ? str.substr(0, limit - 1) + "..." : str;
  };

  const handlePlayClick = (event) => {
    event.preventDefault();

    // here we should the call seen movies

    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie.title || "").then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"))
      }).catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <header
        className="banner"
        style={{
          backgroundImage: `url("${movie.backdrop_poster}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">{movie.title}</h1>
          <div className="banner_buttons">
            <button
              className="banner_button"
              onClick={(event) => handlePlayClick(event)}
            >
              Play
            </button>
            <button className="banner_button">My List</button>
            <span className="banner_release_date">
              {movie.release_date
                ? new Date(movie?.release_date).toISOString().split("T")[0]
                : ""}
            </span>
            <p className="banner_description">
              {truncate(movie.overview, 150)}
            </p>
          </div>
          {/* <div className="fade"></div> */}
        </div>
      </header>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
    </div>
  );
};

export default Banner;
