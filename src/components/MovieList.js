import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'


const MovieList = () => {
    const [ allMovies, setAllMovies ] = useState([])
    const [ children, setChildren ] = useState([])
    const [ horror, setHorror ] = useState([])
    const [ romance, setRomance ] = useState([])

    const fetchAllMovies = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/genres`)
        .then((response) => {
            let genre = response.data.genre
            let childrenMovies = []
            let horrorMovies = []
            let romanceMovies = []
            // console.log(childrenMovies);
            setAllMovies(response.data)
            for(let i=0; i < genre.length; i++){
                //filter genre by name and push movies into each genre
                if(genre[i].name.includes('Children & Family')){
                    childrenMovies.push(genre[i].movies)
                    setChildren(childrenMovies)
                } else if(genre[i].name.includes('Horror')){
                    horrorMovies.push(genre[i].movies)
                    setHorror(horrorMovies)
                } else if(genre[i].name.includes('Romance')){
                    romanceMovies.push(genre[i].movies)
                    setRomance(romanceMovies)
                }
            }
        })
    }
    useEffect(fetchAllMovies, [])

    return(
        <div className="movieContainer">
            <h1>Children & Family</h1>
            <div className="childrenMovies">
            {
                children.length ? 
                children[0].map((movie) => {
                    return  <div key={movie.id}
                                 className="children">
                                <img src={movie.image} style={{width:"200px", height:"250px", margin:"5px"}} />
                            </div>
                })
            :
                <p>
                    Loading...
                </p>
            }
            </div>

            <h1>Horror</h1>
            <div className="horrorMovies">
            {
                horror.length ? 
                horror[0].map((movie) => {
                    return  <div key={movie.id}
                                 className="horror">
                                <img src={movie.image} style={{width:"200px", height:"250px", margin:"5px"}} />
                            </div>
                })
            :
                <p>
                    Loading...
                </p>
            }
            </div>

            <h1>Romance</h1>
            <div className="romanceMovies">
            {
                romance.length ?
                romance[0].map((movie) => {
                    return  <div key={movie.id}
                                 className="romance">
                                <img src={movie.image} style={{width:"200px", height:"250px", margin:"5px"}} />
                            </div>
                })
            :
            <p>Loading</p>
            }
            </div>

            {/* <div>
            {
                allMovies.length ? 
                allMovies.map((movie) => {
                    return  <div key={movie.id}
                                 className="allMovies">
                                <img src={movie.image} style={{width:"200px", height:"250px", margin:"5px"}} />
                            </div>
                })
            :
                <p>
                    Loading...
                </p>
            }
            </div> */}
        </div>
    )
}

export default MovieList