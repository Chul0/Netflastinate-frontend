import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CommentForm from '../components/CommentForm'
import CommentEditForm from '../components/CommentEditForm'


const SingleMovie = () => {
    const { id } = useParams()
    const [user, setUser ] = useContext(UserContext)
    const [movieInfo, setMovieInfo] = useState({})
    const [shouldReload, setShouldReload] = useState(true)
    const [showCommentEdit, setShowCommentEdit] = useState(false)

    const fetchSingleMovie = () => {
        if(!shouldReload) { return }

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/${id}`)
        .then((response) => {
            setMovieInfo(response.data)
            setShouldReload(false)
        })
    }

    useEffect(fetchSingleMovie, [])
    useEffect(fetchSingleMovie, [shouldReload])

    const saveMovies = (e) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/movies/${id}`,
        {},
        {
            headers:{
                Authorization: localStorage.getItem('userId')
            }
        }
        )
    }

    const handleCommentEdit = () => {
        setShowCommentEdit(true)
    }

    return(
        <div className="singleMovie-container" >
            <div className="movie-info">
            <>
            {
                movieInfo.movie ?
                <>
                <h1>{movieInfo.movie.title}</h1>
                <img src={movieInfo.movie.image}></img>
                <h3>{movieInfo.movie.plot}</h3>
                <iframe width="560" height="315" src={movieInfo.movie.videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <button onClick={saveMovies}>Save to my list</button>
                </>
                :
                
                <p>
            Loading...</p>
            }
            </>
            </div>
            <div className="commentForm-container">
                <>
                <CommentForm setShouldReload={setShouldReload}/>
                </>
                <div className="comment-container">
                    {
                        movieInfo.comments &&
                        movieInfo.comments.map((comment) => {
                            return <div key={comment.id}>
                                        <div>
                                        {/* Make the first letter of a name upper case */}
                                        <p>{comment.user.name.charAt(0).toUpperCase() + comment.user.name.slice(1)}{' | '}{comment.description}</p>
                                        {/* Print created date */}
                                        <p>{comment.createdAt.substr(0,10)}</p>

                                        {user.id === comment.user.id &&
                                            <>
                                            { showCommentEdit ?
                                                <CommentEditForm setShouldReload={setShouldReload}
                                                commentId={comment.id}
                                                setShowCommentEdit={setShowCommentEdit} />
                                            :
                                                <>
                                                <button onClick={handleCommentEdit}>EDIT</button>
                                                <button>DELETE</button>
                                                </>
                                            }
                                            </>
                                        }
                                        </div>

                                   </div>
                        })
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default SingleMovie
