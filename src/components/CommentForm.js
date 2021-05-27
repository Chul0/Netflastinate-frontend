import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const CommentForm = (props) => {
    const { id } = useParams()
    const [ description, setDescription] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/movies/${id}/comment`, {
            description
        }, {
            headers: {
                AUthorization: localStorage.getItem('userId')
            }
        })
        .then((response) => {
            setDescription('')
            props.setShouldReload(true)
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="description"></label>
            <input className="comment-input" placeholder="Your comment here" value={description} onChange={ (e)=> {setDescription(e.target.value)}}></input>
            <input className="comment-submit" type="submit" value="submit" />
        </form>
    )
}

export default CommentForm