import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const CommentEditForm = (props) => {
    const { id } = useParams()
    const [ description, setDescription] = useState('')

    const handleEdit = (e) => {
        e.preventDefault()
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/movies/${id}/comment/${props.commentId}`, {
            description
        }, {
            headers: {
                AUthorization: localStorage.getItem('userId')
            }
        })
        .then((response) => {
            setDescription('')
            props.setShouldReload(true)
            props.setShowCommentEdit(false)

        })
    }

    return(
        <form onSubmit={handleEdit}>
            <label htmlFor="description"></label>
            <input id="comment-input" placeholder="Edit your comment" value={description} onChange={ (e)=> {setDescription(e.target.value)}}></input>
            <input id="comment-submit" type="submit" value="EDIT" />
        </form>
    )
}

export default CommentEditForm