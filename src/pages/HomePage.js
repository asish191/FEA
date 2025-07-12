import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import { useEffect, useRef } from "react";
import Row from "../components/Row";
import SkeletonLoader from "../components/SkeletonLoader";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import {
  getMovies,
  getMoviesStatus,
  getMoviesError,
  selectAllMovies,
} from "../slices/movieSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const status = useSelector(getMoviesStatus);
  const error = useSelector(getMoviesError);
  const movies = useSelector(selectAllMovies);
  const hasDispatched = useRef(false);
  
  // Debounce the status to prevent rapid UI changes
  const debouncedStatus = useDebounce(status, 300);

  useEffect(() => {
    if (status === "idle" && !hasDispatched.current) {
      hasDispatched.current = true;
      dispatch(getMovies());
    }
  }, [dispatch, status]);

  const isLoading = debouncedStatus === "loading" || debouncedStatus === "idle";
  const isError = debouncedStatus === "failed";

  // Prevent rendering until we have a stable state
  if (status === "idle" && !hasDispatched.current) {
    return (
      <div
        className="page"
        style={{ backgroundColor: "#111", overflow: "hidden" }}
      >
        <Navbar />
        <SkeletonLoader key="initial-skeleton" type="banner" />
        <div style={{ padding: "20px 0" }}>
          {[1, 2, 3, 4].map((index) => (
            <div key={index} style={{ marginBottom: "40px" }}>
              <div style={{ 
                width: "200px", 
                height: "24px", 
                background: "linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)",
                backgroundSize: "200px 100%",
                animation: "shimmer 1.5s infinite",
                borderRadius: "4px",
                marginBottom: "15px",
                marginLeft: "20px"
              }}></div>
              <div style={{ display: "flex", overflowX: "auto", padding: "0 20px" }}>
                <SkeletonLoader key={`initial-row-${index}`} type="movie-poster" count={6} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="page"
      style={{ backgroundColor: "#111", overflow: "hidden" }}
    >
      <Navbar />
      
      {isLoading ? (
        <SkeletonLoader key="banner-skeleton" type="banner" />
      ) : (
        <Banner />
      )}

      {isLoading ? (
        // Show skeleton loaders for movie rows
        <div style={{ padding: "20px 0" }}>
          {[1, 2, 3, 4].map((index) => (
            <div key={index} style={{ marginBottom: "40px" }}>
              <div style={{ 
                width: "200px", 
                height: "24px", 
                background: "linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)",
                backgroundSize: "200px 100%",
                animation: "shimmer 1.5s infinite",
                borderRadius: "4px",
                marginBottom: "15px",
                marginLeft: "20px"
              }}></div>
              <div style={{ display: "flex", overflowX: "auto", padding: "0 20px" }}>
                <SkeletonLoader key={`row-skeleton-${index}`} type="movie-poster" count={6} />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div style={{ 
          padding: "40px 20px", 
          textAlign: "center", 
          color: "#fff",
          backgroundColor: "#111"
        }}>
          <h2>Error Loading Movies</h2>
          <p>{error || "Something went wrong. Please try again later."}</p>
          <button 
            onClick={() => dispatch(getMovies())}
            style={{
              padding: "10px 20px",
              backgroundColor: "#e50914",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            Retry
          </button>
        </div>
      ) : (
        Object.keys(movies).map((title) => (
          <Row key={title} title={title} movies={movies[title]} />
        ))
      )}
    </div>
  );
};

export default HomePage;
