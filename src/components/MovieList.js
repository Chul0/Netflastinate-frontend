import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'




const MovieList = () => {
    const [ allMovies, setAllMovies ] = useState([])
    const [ children, setChildren ] = useState([])
    const [ horror, setHorror ] = useState([])
    const [ romance, setRomance ] = useState([])
    const [ thriller, setThriller ] = useState([])

    const fetchAllMovies = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/genres`)
        .then((response) => {
            let genre = response.data.genre
            let childrenMovies = []
            let horrorMovies = []
            let romanceMovies = []
            let thrillerMovies = []
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
                } else if (genre[i].name.includes('Thriller')){
                    thrillerMovies.push(genre[i].movies)
                    setThriller(thrillerMovies)
                }
            }
        })
    }
    useEffect(fetchAllMovies, [])
    

    return(
        <div className="movieContainer">
            <h2 style={{margin:"2px"}}>Children & Family</h2>
            <div className="childrenMovies" style={{margin:"2px"}}>
            {
                children.length ? 
                children[0].map((movie) => {
                    return  <div key={movie.id}
                                 className="children">
                                <Link to ={`/movies/${movie.id}`}>
                                <img src={movie.image} style={{width:"180px", height:"200px", margin:"2px"}} />
                                </Link>
                            </div>
                })
            :
                <p>
                    Loading...
                </p>
            }
            </div>

            <h2 style={{margin:"2px"}}>Horror</h2>
            <div className="horrorMovies" style={{margin:"2px"}}>
            {
                horror.length ? 
                horror[0].map((movie) => {
                    return  <div key={movie.id}
                                 className="horror">
                                <Link to ={`/movies/${movie.id}`}>
                                <img src={movie.image} style={{width:"180px", height:"200px", margin:"2px"}} />
                                </Link>
                            </div>
                })
            :
                <p>
                    Loading...
                </p>
            }
            </div>

            <h2 style={{margin:"2px"}}>Romance</h2>
            <div className="romanceMovies" style={{margin:"2px"}}>
            {
                romance.length ?
                romance[0].map((movie) => {
                    return  <div key={movie.id}
                                 className="romance">
                                <Link to ={`/movies/${movie.id}`}>
                                <img src={movie.image} style={{width:"180px", height:"200px", margin:"2px"}} />
                                </Link>
                            </div>
                })
            :
            <p>Loading...</p>
            }
            </div>

            <h2 style={{margin:"2px"}}>Thriller</h2>
            <div className="thrillerMovies" style={{margin:"2px"}}>
            {
                thriller.length ?
                thriller[0].map((movie) => {
                    return  <div key={movie.id}
                                 className="thriller">
                                <Link to ={`/movies/${movie.id}`}>
                                <img src={movie.image} style={{width:"180px", height:"200px", margin:"2px"}} />
                                </Link>
                            </div>
                })
            :
            <p>Loading...</p>
            }
            </div>
            
        </div>
    )
}

export default MovieList