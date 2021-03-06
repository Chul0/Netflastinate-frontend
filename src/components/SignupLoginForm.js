import axios from 'axios'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'


const SignupLoginForm = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_BACKEND_URL}${props.route}`, {
            name,
            email,
            password
        })
        .then((response) => {
            // console.log(response);
            if(response.data.user){
                 localStorage.setItem('userId', response.data.userId)
                alert(`Hi, ${response.data.user.name}! ${props.message}`)
                window.location.reload()
            }
            else if(response.data.error){
                setError(response.data.error)
            }
        })
    }

    return(
        <div className="signupFormPage">
            
                {error && 
                <p className="errorMsg" style={{color:"red"}}>*{error}</p>
                }
            <div className="SingupLoginForm-container">
                <h1>{props.title}</h1>
                <form onSubmit={handleSubmit}>
                    {props.showName &&
                    <>
                    <label htmlFor="new-name"><h2>NAME</h2></label>
                    <input className="formInput" value={name} onChange={(e)=> {setName(e.target.value)}} />
                    </>
                    }

                    <label htmlFor="new-email"><h2>EMAIL</h2></label>
                    <input className="formInput" value={email} onChange={(e)=> {setEmail(e.target.value)}} />
                    <label htmlFor="new-password"><h2>PASSWORD</h2></label>
                    <input className="formInput" type="password" value={password} onChange={(e)=> {setPassword(e.target.value)}} />
                    <div className="btnDiv">
                     <input class="submit-button" type="submit" value={props.buttonText} />
                    </div>
                    {/* Show this only in login page */}
                    {props.notAMember &&
                        <div className="signupLink">
                            <Link to="/signup">
                                <p>Not a member yet?</p>
                            </Link>
                        </div>
                    }
                    {/* Show this only in signup page */}
                    {props.alreadyAMember &&
                        <div className="signupLink">
                            <Link to="/login">
                                <p>Already a member?</p>
                            </Link>
                        </div>
                    }

                </form>
            </div>
        </div>
    )
}

export default SignupLoginForm