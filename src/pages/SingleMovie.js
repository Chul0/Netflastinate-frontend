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


    //Get a selected movie info
    const fetchSingleMovie = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies/${id}`)
        .then((response) => {
            setMovieInfo(response.data)
            setShouldReload(false)
        })
    }

    useEffect(fetchSingleMovie, [])
    useEffect(fetchSingleMovie, [shouldReload])

    //Save a movie to my list
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

    //To show comment editing form
    const handleCommentEdit = () => {
        setShowCommentEdit(true)
    }

    //Delete a selected comment
    const deleteComment = (commentId) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/movies/${id}/comment/${commentId}`,
        {
            headers: {
                Authorization: localStorage.getItem('userId')
            }
        })
        .then((response) => {
            setShouldReload(true)
        })
    }

    return(
        <div className="singleMovie-page" >
            <div className="movie-info">
            <>
            {
                movieInfo.movie ?
                <div className="trailer-container">
                    <div className="title" style={{margin:"0"}}>
                        <h1 style={{fontSize:"50px", textAlign:"left"}}>{movieInfo.movie.title}</h1>
                    </div>
                        <h3 className="save" onClick={saveMovies}>Save to my list</h3>
                    <div className="posterVid-container">
                        <img src={movieInfo.movie.image}></img>
                        {/* <h3>{movieInfo.movie.plot}</h3> */}
                        <iframe className="trailerVid" width="700" height="400" src={movieInfo.movie.videoUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
                :
                
                <p>
            Loading...</p>
            }
            </>
            </div>
            <div className="footer">
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
                                        <div className="showComments">
                                            <div style={{display:"flex"}}>
                                            <p className="commentName">{comment.user.name.charAt(0).toUpperCase() + comment.user.name.slice(1)}</p>
                                            {/* Print created date */}
                                            <p className="commentDate">{comment.createdAt.substr(0,10)}</p>
                                            </div>
                                            <div className="singleComment">
                                            <p className="commentDescription">{comment.description}</p>
                                            {user.id === comment.user.id &&
                                                <>
                                                { showCommentEdit ?
                                                    <CommentEditForm setShouldReload={setShouldReload}
                                                    commentId={comment.id}
                                                    setShowCommentEdit={setShowCommentEdit} />
                                                :
                                                    <div className="editFormBtn">
                                                    <button onClick={handleCommentEdit}>EDIT</button>
                                                    <button onClick={() => deleteComment(comment.id)}>DELETE</button>
                                                    </div>
                                                }
                                                </>
                                            }
                                            </div>
                                        </div>    

                                        </div>

                                   </div>
                        })
                    }
                    
                </div>
            </div>
            </div>
        </div>
    )
}

export default SingleMovie
