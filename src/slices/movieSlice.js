import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: {
    "Top Rated": [],
    Trending: [],
    Comedy: [],
    Horror: [],
    Documentaries: [],
    "Netflix Originals": [],
  },
  status: "idle",
  error: null,
};

export const getMovies = createAsyncThunk("movies/fetchMovies", async () => {
  try {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    if (!user) {
      throw new Error("User not logged in");
    }

    const userData = JSON.parse(user);
    if (!userData.token) {
      throw new Error("No authentication token");
    }

    // Mock movie data
    const mockMovies = {
      "Top Rated": [
        { 
          movie_id: 1, 
          title: "The Shawshank Redemption", 
          poster: "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
          backdrop_poster: "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
        },
        { 
          movie_id: 2, 
          title: "The Godfather", 
          poster: "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
          backdrop_poster: "https://image.tmdb.org/t/p/original/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
        }
      ],
      "Trending": [
        { 
          movie_id: 3, 
          title: "Inception", 
          poster: "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
          backdrop_poster: "https://image.tmdb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
        },
        { 
          movie_id: 4, 
          title: "Interstellar", 
          poster: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
          backdrop_poster: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
        }
      ],
      "Comedy": [
        { 
          movie_id: 5, 
          title: "The Grand Budapest Hotel", 
          poster: "https://image.tmdb.org/t/p/original/eWdyYQreja6eis6OUJf6q9fEUpj.jpg",
          backdrop_poster: "https://image.tmdb.org/t/p/original/eWdyYQreja6eis6OUJf6q9fEUpj.jpg"
        }
      ],
      "Horror": [
        { 
          movie_id: 6, 
          title: "The Shining", 
          poster: "https://image.tmdb.org/t/p/original/9fgh3Ns1CgqV9j8TyENV58m1ZUp.jpg",
          backdrop_poster: "https://image.tmdb.org/t/p/original/9fgh3Ns1CgqV9j8TyENV58m1ZUp.jpg"
        }
      ],
      "Documentaries": [
        { 
          movie_id: 7, 
          title: "Planet Earth", 
          poster: "https://image.tmdb.org/t/p/original/8TUbPZaTR1XBVhDVb0oZCu7V4lQ.jpg",
          backdrop_poster: "https://image.tmdb.org/t/p/original/8TUbPZaTR1XBVhDVb0oZCu7V4lQ.jpg"
        }
      ],
      "Netflix Originals": [
        { 
          movie_id: 8, 
          title: "Stranger Things", 
          poster: "https://image.tmdb.org/t/p/original/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
          backdrop_poster: "https://image.tmdb.org/t/p/original/49WJfeN0moxb9IPfGn8AIqMGskD.jpg"
        }
      ]
    };
    
    console.log("Mock movies data:", mockMovies);
    return { movies: mockMovies };
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw new Error(error.message || 'Failed to fetch movies');
  }
});

const movieSlice = createSlice({
  /** the name of the slice will also be used as the actoin type string
   * in combination with the extraReducer name i.e. posts/getPosts or posts/addPost
   */
  name: "movies",
  initialState,
  // add reducers for the sync on the UI
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state, action) => {
      state.status = "loading";
    })
    .addCase(getMovies.fulfilled, (state, action) => {
      if (action.payload && action.payload.movies) {
        state.movies = action.payload.movies;
        state.status = "success";
      } else {
        state.status = "failed";
        state.error = "Invalid response format";
      }
    })
    .addCase(getMovies.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    });
  },
});

export default movieSlice.reducer

export const selectAllMovies = (state) => state.movies.movies
export const getMoviesStatus = (state) => state.movies.status
export const getMoviesError = (state) => state.movies.error