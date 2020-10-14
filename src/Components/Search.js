import React, {useContext, useState, useEffect} from "react";
import AutoComplete from "./AutoComplete"
import {JikanContext} from "../context/JikanContext"
import Jikan from "jikanjs"

import "./Search.css"

const Search = () => {
  const {selectedUsers} = useContext(JikanContext);
  const [commonAnimes, setCommonAnimes] = useState([]);
  const [onlyMain , setOnlyMain] = useState(true);
  useEffect(() => {
    setCommonAnimes([])
  }, [selectedUsers])

  const getAnimes = async () => {
    let raw1 = await Jikan.loadPerson(selectedUsers[0].value);
    let data1 = await raw1.voice_acting_roles;
    let raw2 = await Jikan.loadPerson(selectedUsers[1].value);
    let data2 = await raw2.voice_acting_roles;
    let animes = []
    for(let i = 0; i < data1.length; i++)
    {
      for(let j = 0; j < data2.length; j++)
      {
        if(onlyMain ? data1[i].anime.mal_id === data2[j].anime.mal_id && data1[i].role === "Main" && data2[j].role === "Main" : data1[i].anime.mal_id === data2[j].anime.mal_id )
        {
          let obj = {
            anime: data1[i].anime,
            character1: {...data1[i].character, Seiyuuimg: selectedUsers[0].avatar, Seiyuu: selectedUsers[0].name},
            character2: {...data2[j].character,Seiyuuimg: selectedUsers[1].avatar, Seiyuu: selectedUsers[1].name}
          }

          animes.push(obj)
        }
      }
    }
    setCommonAnimes(animes);
  }

  const handleChange = () => setOnlyMain(!onlyMain);
  
  return (
    <div className="dark-bg">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mt-5 mb-3 display-4 text-white">Search</h1>
            <AutoComplete />
            <div className="text-center mt-3"><label className="checkbox-inline text-white"><input type="checkbox" className="mr-2" defaultChecked onClick={handleChange} value={onlyMain}/>Only Main Roles</label></div>
            <div className="text-center mt-3 mb-3"><button onClick={getAnimes} className="button">Get Animes!</button></div>
          </div>
        </div>
        <div className="row mt-3">
          {commonAnimes.length > 0 && commonAnimes.map(anime => {
            return (   
              <div className="col-md-6 col-sm-12 mt-3 mb-3" key={anime.anime.mal_id}>
                <div className="card m-auto mb-2 d-flex" style={{width: '18rem'}}>
                  <img className="img-fluid" src={anime.anime.image_url} alt={anime.anime.name} />
                  <div className="card-body">
                    <div className="text-center">
                      <h5 className="card-title text-center mt-3 mb-3">{anime.anime.name}</h5>
                      <a href={anime.anime.url} target="_blank" rel="noopener noreferrer" className="text-center button">View at MyanimeList</a>  
                    </div>
                  </div>
                  </div>
                </div>
            )
           })}
          </div>
        </div>
      </div>
  )
}

export default Search;
