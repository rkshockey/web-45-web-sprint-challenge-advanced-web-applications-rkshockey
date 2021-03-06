import React, {useState} from "react";
import axios from 'axios'

const initialValues = {
  username: '',
  password: '',
}

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState(initialValues)

  function handleChange (e){
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  function handleClick (e){
    e.preventDefault()
    axios.post(`http://localhost:5000/api/login`, credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        document.location.href = '/bubbles';
      })
      .catch(err => setError(err.message))
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form>
          <div>
            <label htmlFor='username'>Username: </label>
            <input id='username' name='username' value={credentials.username} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor='password'>Password: </label>
            <input id='password' name='password' value={credentials.password} onChange={handleChange}/>
          </div>
          <button onClick={handleClick} id='submit'>Login</button>
        </form>
      </div>

      <p id="error" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"