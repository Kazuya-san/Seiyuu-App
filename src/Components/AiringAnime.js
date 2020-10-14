import React, { useEffect, useState } from "react";
import Jikanjs from "jikanjs";

const AiringAnime = () => {
  const [animes, setAnimes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const searchForAnime = () => {
    setLoading(true);
    setSearch("");
    Jikanjs.search("anime", search, null)
      .then(animes => {
        setAnimes(animes.results);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    Jikanjs.loadTop("anime", 1, "airing")
      .then(anime => {
        setAnimes(anime.top);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="dark-bg">
      <div className="container">
        <div className="row">
          <div className="col-md-8 mt-3 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for any Anime"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-success mb-3 mt-3 ml-3"
              onClick={searchForAnime}
            >
              {" "}
              <i className="fa fa-search "></i>{" "}
              <span className="pl-2">Search Anime</span>{" "}
            </button>
          </div>
        </div>
        {!loading && (
          <div className="row">
            {animes.map(anime => {
              return (
                <div
                  className="col-md-4 col-xl-3 col-sm-6 shadow text-center text-white mt-3 mb-3"
                  key={anime.mal_id}
                >
                  <a href={anime.url} className="link" target="_blank" rel="noopener noreferrer">
                    <h4>{anime.title}</h4>
                  </a>

                  <a href={anime.url} target="_blank" rel="noopener noreferrer">
                    <img src={anime.image_url} alt={anime.title} />
                  </a>
                  <p className="badge badge-success m-3 d-block">
                    Score: {anime.score}
                  </p>
                  {anime.start_date && (
                    <p className="badge badge-success m-3 d-block">
                      Start Date: {anime.start_date.slice(0, 10)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {loading && (
          <div className="text-center mb-5 pb-5 mt-5">
            <p className="display-4">Loading....</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiringAnime;