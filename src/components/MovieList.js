import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'


const MovieList = () => {
    const [ allMovies, setAllMovies ] = useState([])
    const [ children, setChildren ] = useState([])
    const [ horror, setHorror ] = useState([])
    const [ romance, setRomance ] = useState([])

    const fetchAllMovies = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies`)
        .then((response) => {
            let movie = response.data.movies
            let childrenMovies = []
            let horrorMovies = []
            let romanceMovies = []
            
            setAllMovies(response.data.movies)
            for(let i=0; i < movie.length; i++){
                //filter genre by name and push movies into each genre
                if(movie[i].genre.name.includes('Children & Family')){
                    childrenMovies.push(movie[i])
                    setChildren(childrenMovies)
                } else if(movie[i].genre.name.includes('Horror')){
                    horrorMovies.push(movie[i])
                    setHorror(horrorMovies)
                } else if(movie[i].genre.name.includes('Romance')){
                    romanceMovies.push(movie[i])
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
                children.map((movie) => {
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
                horror.map((movie) => {
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
                romance.map((movie) => {
                    return  <div key={movie.id}
                                 className="romance">
                                <img src={movie.image} style={{width:"200px", height:"250px", margin:"5px"}} />
                            </div>
                })
            :
                <p>
                    Loading...
                </p>
            }
            </div>
        </div>
    )
}

export default MovieList