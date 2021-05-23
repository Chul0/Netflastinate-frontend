import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const [user, setUser] = useContext(UserContext)

    return(
        <nav>
            {user.id &&
                <p>
                    Hey {user.name}, welcome back!
                </p>
            }
            <Link to='/'>HOME</Link>{' | '}

            {user.id ?
            <>
             <Link to='/movies'>MOVIES</Link>{' | '}
             <Link to='/mylist'>MY LIST</Link>{' | '}
             <Link to='/profile'>PROFILE</Link>{' | '}
             <Link to='/'
                onClick={()=>{
                    localStorage.removeItem('userId')
                    setUser('') 
                    //set user state as an empty string, so it will redirect me to home as set in App.js
                }}>SIGNOUT</Link>
           
            </>   
            :
            <>
                <Link to="/signup">SIGNUP</Link>{' | '}
                <Link to="/login">LOGIN</Link>
            </>
        }
        </nav>
    )
}

export default NavBar