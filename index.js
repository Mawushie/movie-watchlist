//variables
const searchBtn = document.getElementById("search-btn");
const searchText = document.getElementById("search-input");
const resultsContainer = document.getElementById("results-container");
const apikey = "73d7cd4";
let moviesArrayLocal = [];
let localStorageItems = [];

//get movies from imdb by search
const getMovies = () => {
  const imdbIDs = [];
  resultsContainer.innerHTML = "";
  const searchValue = searchText.value;
  fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=${apikey}`)
    .then((res) => res.json())
    .then((data) => {
      let searchResultsArr = data.Search;
      searchResultsArr.map((result) => {
        // console.log(result.imdbID);
        imdbIDs.push(result.imdbID);
      });
      getMovieDetails(imdbIDs);
    });
};

//get extra movie details with the ids
const getMovieDetails = (imdbIDs) => {
  const moviesArray = [];
  imdbIDs.map((id) => {
    // console.log(id);
    fetch(`http://www.omdbapi.com/?i=${id}&apikey=${apikey}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        moviesArray.push(data);
        // moviesHtml(moviesArray);
        moviesArrayLocal = [...moviesArray];
        moviesHtml(moviesArrayLocal);
        // console.log(moviesArrayLocal);
      });
  });
};

//add movie to watchlist
const addToWatchlist = (id) => {
  // console.log(id);
  const targetMovie = moviesArrayLocal.filter((movie) => {
    return movie.imdbID === id;
  })[0];
  // console.log(targetMovie);
  localStorageItems.push(targetMovie);
  // console.log(localStorageItems);
  localStorage.setItem("watchlist", JSON.stringify(localStorageItems));
};

//event listener on document
document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    // console.log(e.target.dataset.add);
    addToWatchlist(e.target.dataset.add);
  }
});

const moviesHtml = (moviesArrayLocal) => {
  const html = moviesArrayLocal
    .map((movie) => {
      const { Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID } = movie;
      return `
             <div class="search-result" id = "${imdbID}" >
                      <div>
                          <img
                            src=${Poster}
                            class="search-poster"
                          />
                      </div>
                      <div class="d-flex result-content">
                        <div class="d-flex gap-8 align-center">
                        <h3 class="search-title">${Title}</h3>
                        ${
                          imdbRating === "N/A"
                            ? ""
                            : `<span class="search-rating"><img src="./assets/star.png" />${imdbRating}</span>`
                        }
                          
                        </div>
                        <div class="d-flex gap-20 align-center">
                          ${
                            Runtime === "N/A"
                              ? ""
                              : `<p class="search-runtime">${Runtime}</p>`
                          }
                          <p class="search-genre">${Genre}</p>
                          <div class="d-flex watchlist" >
                            <img src="./assets/add.svg" class="add" data-add="${imdbID}"/> Watchlist
                          </div>
                        </div>
                        <div>
                          <p class="search-plot">
                            ${
                              Plot === "N/A"
                                ? ""
                                : `<p class="search-runtime">${Plot}</p>`
                            }
                          </p>
                        </div>
                      </div>
                     </div>
                    <hr />
            `;
    })
    .join("");

  resultsContainer.innerHTML = html;
  return html;
};

//event listener for when search button is clicked
searchBtn.addEventListener("click", getMovies);
