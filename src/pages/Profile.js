import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Redirect } from 'react-router-dom'


const Profile = () => {
    const [user, setUser] = useContext(UserContext)
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [popup, setPopup] = useState(false)
    const [editingUser, setEditingUser] = useState({
        name:'',
        email:'',
        password:''
    })

    const handleChange =(e) => {
        const { name, value } = e.target
        setEditingUser({
            ...editingUser,
            [name]: value
        })
    }

    const handleEdit = () => {
        setEditingUser({name: user.name, email:user.email, password:''})
    }

    useEffect(handleEdit, [user])


    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            let response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/profile`,
            editingUser, {
                headers: {
                    Authorization: localStorage.getItem('userId')
                }
            })
            setShouldRedirect(true)
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }


    const handleDelete = async (e) => {
        try {
            e.preventDefault()
            let response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, {
                headers:{
                    Authorization: localStorage.getItem('userId')
                }
            })
            alert(`Bye ${response.data.user.name}`)
            setUser('')
            setShouldRedirect(true)
            setPopup(false)
        } catch (error) {
            console.log(error);
        }
    }

    const handleShowPopup = () => {
        setPopup(!popup)
    }

    return(
        <>
        <div className="profile-container">
            <h1>PROFILE SETTING</h1>
            { shouldRedirect && <Redirect to={'/'} /> }
            <form onSubmit={handleSubmit}>
                <div className="profile-input">    
                    <label htmlFor="new-name"><h2>NAME</h2></label>
                </div>
                <div className="profile-input">
                    <input name="name" value={editingUser.name} onChange={handleChange} />
                </div>
                <div className="profile-input">
                    <label htmlFor="new-email"><h2>EMAIL</h2></label>
                    <input name="email" value={editingUser.email} onChange={handleChange} />
                </div>
                <div className="profile-input">
                    <label htmlFor="new-password"><h2>PASSWORD</h2></label>
                    <input name="password" type="password" value={editingUser.password} onChange={handleChange} />
                </div>
            </form>
            <div className="buttons-div">
                <button onClick={handleSubmit}>EDIT</button>
                <button onClick={handleShowPopup}>DELETE</button>
            </div>
            <>
            {popup && (
                        
                <dialog
                    className="dialog2"
                    open
                    >
                        <h3 className="smallImage" >
                            You sure you want to delete your account?
                        </h3>
                        <div className="buttons-div">
                            <button onClick={handleDelete}>Yes</button>
                            <button onClick={handleShowPopup}>No</button>
                        </div>
                </dialog>
                    )}
            </>
        
         </div>
    </>
    )
}

export default Profile
