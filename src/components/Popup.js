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
            window.scrollTo(0, 0)
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
                        <div className="movieTitle">
                            <h1>{singleMovie.movie.title}</h1>
                        </div>
                        <div className="movieInfo">
                            <abbr title="Click to close">
                            <img
                                className="smallImage"
                                src={singleMovie.movie.image}
                                onClick={handlePopup}
                            />
                            </abbr>

                            <div className="plotButton">
                                <h3 id="plot">{singleMovie.movie.plot}</h3>
                                <div className="trailerBtn">
                                    <h3 id="▶" onClick={()=> setRedirectToTrailer(true)}>Go Watch Trailer ▶</h3>
                                </div>
                            </div>
                        </div>                        
                        {
                        redirectToTrailer &&
                        <Redirect to={`/movie/${singleMovie.movie.id}`} />
                        }
                        
                    </dialog>
                )}
                </>
            :
            <p>
                Loading..
            </p>
            }
        </>
            
        </div>
    )
}

export default Popup
