import './App.css'
import axios from "axios"

function App() {
  
  const queryPokemon = async(event) => {
    try {
      event.preventDefault()
      document.getElementById('main-pokemon').innerHTML = ''
      document.getElementById('similar-pokemons').innerHTML = ''

      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")

      const randomPokeName = response.data.results[randomNum(1303)].name
      
      const mainPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokeName}`)
      const mainPokeType = mainPoke.data.types[0].type.name
      const mainPokeImg = mainPoke.data.sprites.front_default

      // Main Pokemon Image
      insertImg('main-pokemon', mainPokeImg)

      // Similar Pokemon Images
        const secondResponse = await axios.get(`https://pokeapi.co/api/v2/type/${mainPokeType}`)
        const pokeData = secondResponse.data.pokemon
        
        for (let i = 0; i < 5; i++) {
          const anotherRandomPokeName = secondResponse.data.pokemon[randomNum(pokeData.length + 1)].pokemon.name
  
          const thirdResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${anotherRandomPokeName}`)
          const similarPokeImg = thirdResponse.data.sprites.front_default
          insertImg('similar-pokemons', similarPokeImg)
        }
    } 
    catch (error) {
      console.error('An error ocurred:', error)
    }
  }

  const randomNum = (maxNum) => Math.floor(Math.random() * (maxNum - 0) + 0)

  const insertImg = (divId, imgUrl) => {
    let div = document.getElementById(`${divId}`)
    let img = document.createElement('img')
    img.src = `${imgUrl}`
    div.appendChild(img)
  }



  return (
    <>
      <div id='main-pokemon'></div>
      <div id='similar-pokemons'></div>
      <div>
        <form onSubmit={e => queryPokemon(e)}>
          <button type='submit'>Get Pokemon</button>
        </form>
      </div>
    </>
  )
}

export default App
