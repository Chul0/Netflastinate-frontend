import SignupLoginForm from '../components/SignupLoginForm'

const Signup = (props) => {
    return(
        <SignupLoginForm 
        showName={true}
        // this true will be passed to props.showName in signuploginForm, and name input will be shown...
        buttonText="SIGN UP"
        route="/users"
        message="You are successfully signed up!"
        title="SIGN UP"
        alreadyAMember={true}
        />
    )
}

export default Signup
