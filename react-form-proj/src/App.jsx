import React, {useState}  from "react";
import SignUpForm from './components/SignUpForm'
import Authenticate from './components/Authenticate'

function App () {
    const [token, setToken] = useState('');
    return (
        <>
            <h1>User Login</h1>
            <SignUpForm token={token} setToken={setToken}/>
           <Authenticate token={token} setToken={setToken} />
        </>
    );

}

export default App;