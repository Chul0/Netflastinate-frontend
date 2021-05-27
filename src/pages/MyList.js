import { useState, useEffect } from 'react'
import axios from 'axios'


const MyList = () => {
    const [savedMovies, setSavedMovies] = useState([])
    const [shouldReload, setShouldReload] = useState(true)


    const fetchSavedMovies = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/mylist`, {
                headers:{
                    Authorization: localStorage.getItem('userId')
                }
            })
            setSavedMovies(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(fetchSavedMovies, [])

    const deleteMovie = async (movieId) => {
        try {
            let response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/movies/${movieId}`, {
                headers: {
                    Authorization: localStorage.getItem('userId')
                }
            })
            setShouldReload(!shouldReload)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(fetchSavedMovies, [shouldReload])

    return(
        <div className="myList-container">
            <div className="myListTitle">
                <h1>MY LIST</h1>
            </div>
            <div className="list-container">
                {
                    savedMovies.length ?
                    savedMovies.map((movie) => {
                        return <div className="eachPoster" key={movie.id}>
                                    <img className="myListPoster" src={movie.image} style={{width:"250px", height:"320px", margin:"10px"}}/>
                                    <p className="deleteList" onClick={ () => deleteMovie(movie.id)}>delete</p>
                            </div>
                    })
                :
                    <p>
                        You haven't added any movies!
                    </p>
                }
            </div>
            
        </div>
    )
}

export default MyList
