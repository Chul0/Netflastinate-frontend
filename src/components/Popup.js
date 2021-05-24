import { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Redirect } from 'react-router-dom'


const Popup = (props) => {
    const { id } = useParams()
    const [singleMovie, setSingleMovie] = useState({})
    const [popup, setPopup] = useState(true)
    const [redirectToTrailer, setRedirectToTrailer] = useState(false)


    const fetchSingleMovie = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/${id}`)
        .then((response) => {
            setSingleMovie(response.data)
        })
    }

    useEffect(fetchSingleMovie, [id])


    const handlePopup = () => {
        setPopup(!popup)
    }
    useEffect(handlePopup, [singleMovie])

    return(
        <div>
            <>
            {
                singleMovie.movie ?
                <>
                {popup && (
                    <dialog
                        className="popup"
                        open
                    >
                        <img
                            className="smallImage"
                            src={singleMovie.movie.image}
                            onClick={handlePopup}
                        />
                        <h1>{singleMovie.movie.title}</h1>
                        <h3>{singleMovie.movie.plot}</h3>
                        <button onClick={()=> setRedirectToTrailer(true)}>Watch Trailer</button>
                        
                    </dialog>
                )}
                </>
            :
            <p>
                Loading..
            </p>
            }
        </>
            {
                redirectToTrailer &&
                <Redirect to='/movie/:id' />
            }
        </div>
    )
}

export default Popup
