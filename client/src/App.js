import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState("");
  const [moviesUrl, setMoviesUrl] = useState("");
  const [List, setList] = useState([]);

  const fetchMovies = () => {
    axios
      .get("/movies")
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const sendMovieName = (e) => {
    e.preventDefault();
    if (movies && movies.length > 0 && moviesUrl && moviesUrl.length > 0) {
      const data = { title: movies, url: moviesUrl };
      axios
        .post("/moviename", data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      return console.log("Please enter details");
    }
    setMovies("");
    setMoviesUrl("");
  };

  return (
    <div className="App">
      <div>
        <form>
          <input
            type="text"
            placeholder="Enter Movie Name"
            value={movies}
            onChange={(e) => setMovies(e.target.value)}
            class="form-control"
            required
          />
          <input
            type="text"
            placeholder="Enter Image URL"
            value={moviesUrl}
            onChange={(e) => setMoviesUrl(e.target.value)}
            class="form-control"
            required
          />

          <button
            class="btn btn-primary"
            type="submit"
            onClick={(e) => sendMovieName(e)}
          >
            Submit
          </button>
        </form>
      </div>

      <div className="movieWrap">
        {List &&
          List.length > 0 &&
          List.map((item, i) => (
            <div>
              <ul>
                <li key={i}>{item.title}</li>
              </ul>
              <img src={item.url} alt={item.title} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
