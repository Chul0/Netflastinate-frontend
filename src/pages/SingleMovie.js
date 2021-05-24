import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const SingleMovie = () => {
    const { id } = useParams()
    const [movieInfo, setMovieInfo] = useState({})

    const fetchSingleMovie = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/${id}`)
        .then((response) => {
            setMovieInfo(response.data)
        })
    }

    useEffect(fetchSingleMovie, [])

    return(
        <div className="singleMovieContainer">
        <>
        {
            movieInfo.movie ?
            <>
            <h1>{movieInfo.movie.title}</h1>
            <img src={movieInfo.movie.image}></img>
            <h3>{movieInfo.movie.plot}</h3>
            <iframe width="560" height="315" src={movieInfo.movie.videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </>
            :
            
            <p>
        Loading...</p>
        }
        </>
        </div>
    )
}

export default SingleMovie
