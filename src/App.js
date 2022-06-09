import React, { useState } from 'react'
const App = () => {

  const [input, SetInput] = useState("Pikachu");
  const [image, SetImage] = useState("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png");
  const [name, SetName] = useState("PIKACHU");
  const [type, SetType] = useState("ELECTRIC");
  const [ability, SetAbility] = useState("STATIC");
  const [experience, SetExperience] = useState("112");
  const [error_box, SetError_box] = useState(false);

  function search_pokemon() {
    let requestOne = "https://pokeapi.co/api/v2/pokemon/" + input.toLowerCase();

    fetch(requestOne)
      .then(res => {
        if (res.status === 200) {
          SetError_box(false);
          return res.json();
        } else {
          SetError_box(true);
          return "Pokemon Not Found!"
        }
      })
      .then((data) => {
        console.log(data)
        createCard(data)
      })
      .catch((error) => {
        return "Error: " + error;
      });

    function createCard(imageObj) {
      SetImage(imageObj.sprites["front_default"]);
      SetType(imageObj.types[0].type["name"].toUpperCase());
      SetName(imageObj.name.toUpperCase());
      SetAbility(imageObj.abilities[0].ability.name.toUpperCase());
      SetExperience(imageObj.base_experience);
    }
  }
  return (
    <>
      <header>
        <h1>PokeDex</h1>
      </header>

      <div className="search-bar">
        <input type="text" id="search_box" placeholder="Enter name of pokemon" onChange={(e) => SetInput(e.target.value)} />
        <button className="search-btn" onClick={search_pokemon}>Search</button>
      {
        error_box?<small id="error-box">Pokemon not found! :\</small>:null
      }
      </div>
      <div id="poke-card">
        <div id="poke-image-div">
          <img id="poke-image" src={image} alt="Image not found!" />
        </div>
        <h3 id="poke-name">Name: {name}</h3>
        <h3 id="poke-type">Type: {type}</h3>
        <h3 id="poke-ability">Ability: {ability}</h3>
        <h3 id="poke-experience">Experience: {experience}</h3>
      </div>
    </>
  )
}

export default App