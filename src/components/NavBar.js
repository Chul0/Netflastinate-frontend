import { useState, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const [user, setUser] = useContext(UserContext)

    return(
        <nav>
            {user.id &&
                <p 
                style={{textAlign:"left", padding:"10px", margin:"0",backgroundColor:"black"}}>
                    Hello {user.name.charAt(0).toUpperCase() + user.name.slice(1)}!
                </p>
            }
            <h1 id="home-name" style={{fontSize:"xxx-large", margin:"0 auto 30px auto"}}>NETFLASTINATE</h1>
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