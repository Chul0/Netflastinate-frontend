import logo from './logo.svg';
import './App.css';

import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import { Route, Redirect } from 'react-router-dom'

import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Movies from './pages/Movies'
import MyList from './pages/MyList'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import SingleMovie from './pages/SingleMovie'

function App() {
  const [user, setUser] = useContext(UserContext)
  return (
    <div>
      <NavBar />
  
      <Route 
         path="/"
         exact
         render={()=>{
           return <Home />
         }}
      />

      <Route
        path="/signup"
        render={()=>{
          if(user.id){
            return <Redirect to ="/movies" />
          }else {
            return <Signup />
          }
        }} 
      />

      <Route 
        path="/login"
        render={()=>{
          if(user.id){
            return <Redirect to="/movies" />
          }else{
            return <Login />
          }
        }}
      />

      <Route 
       path="/movies"
       render={()=>{
        if(user.id){
          return <Movies />
        }else{
         return <Redirect to="/" />
        }
       }}
      />
      
      <Route 
       path="/mylist"
       render={()=>{
        if(user.id){
          return <MyList />
        }else{
         return <Redirect to="/" />
        }
       }}
      />

      <Route 
       path="/profile"
       render={()=>{
        if(user.id){
          return <Profile />
        }else{
         return <Redirect to="/" />
        }
       }}
      />

      <Route 
        path="/movies/:id"
        render={()=>{
          if(user.id){
            return <SingleMovie />
          }else{
            return <Redirect to="/" />
          }
        }}
      />


    </div>
  );
}

export default App;
