//variables
const watchlistContainer = document.getElementById("watchlist-container");
let watchlist = JSON.parse(localStorage.getItem("watchlist"));

//event listener on document
document.addEventListener("click", (e) => {
  if (e.target.dataset.remove) {
    // console.log(e.target.dataset.add);
    removeFromWatchlist(e.target.dataset.remove);
  }
});

const removeFromWatchlist = (id) => {
  //   console.log(id, watchlistFile);
  let watchlistFile = [...watchlist];
  const remainingWatchlist = watchlistFile.filter((movie) => {
    return movie.imdbID !== id;
  });
  //   console.log(remainingWatchlist);
  watchlist = remainingWatchlist;
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  remainingWatchlist.length === 0
    ? (watchlistContainer.innerHTML = `
             <div class="watchlist-empty">
                <h4 class="grey">Your watchlist is looking a little empty...</h4>
                <a href = "./index.html" class="search-movies">
                    <div class="d-flex gap-8">
                    <img src="./assets/add.svg" />Let's add some movies!
                    </div>
                </a>
            </div>`)
    : watchlistHtml(remainingWatchlist);
};

const watchlistHtml = (watchlist) => {
  const html = watchlist
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
                              <img src="./assets/remove.svg" class="add" data-remove="${imdbID}"/> Remove
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

  watchlistContainer.innerHTML = html;
  return html;
};

watchlist
  ? watchlistHtml(watchlist)
  : (watchlistContainer.innerHTML = `
             <div class="watchlist-empty">
                <h4 class="grey">Your watchlist is looking a little empty...</h4>
                <a href = "./index.html" class="search-movies">
                    <div class="d-flex gap-8">
                    <img src="./assets/add.svg" />Let's add some movies!
                    </div>
                </a>
            </div>`);
