import SignupLoginForm from '../components/SignupLoginForm'


const Login = () => {
    return(
        <SignupLoginForm 
        buttonText="LOGIN"
        route="/users/login"
        //this route value will be passed to SignupLoginForm
        message="Welcome back!"
        title="LOGIN"
        />
    )
}

export default Login
