import React, {useState} from "react";
//Store user input in useState

function SignUpForm ({setToken}) {
    console.log('props >>----->', setToken);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)
     
    const handleSubmit = async (event) => {
        // PREVENT DEFAULT BEHAVIOR OF THE FORM SUBMIT
        event.preventDefault();
        if (username.length < 8) {
            setError('Username must be at least 8 characters long.');
            return;
          }
        // FETCH DATA
        try {
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                username: username,
                password: password
            })
        });
        if (!response.ok) {
            const dataError = await response.json();
            throw new Error(dataError.messag || 'Signup Failed!')
        }
        const data = await response.json();
        console.log('data >>----->', data.token);
        setToken(data.token)
        setError('')
        setUserName('');
        setPassword('');
        
        } catch (error) {
            setError(error.message || 'Signup Error');
        }
        // RESET INPUT VALUES
       
     };

     //Event handler
     const usernameHandler = (event) => {
        // console.log('Event --->', event.target.value)
        // SET STATE TO INPUT BOX VALUE (FOUND IN COUSOLE LOG)
        setUserName(event.target.value)
        // UPDATES USERNAME VALUE EVERYTIME USER TYPES IN BOX
     };

     const passwordHandler = (event) => {
        setPassword(event.target.value);
     };

     console.log('>>----->', 'username', username, 'password', password)
    
    return (
        <>
            <h2>Sign Up</h2>
            {error && <p>{error}</p>}
            <form className="sign-in-form" onSubmit={handleSubmit} > 
                <div>
                    <label htmlFor="username">User Name: </label>
                    <input 
                    value={username}
                    placeholder="username"
                    onChange={usernameHandler}/>
                    {/*Everytime user types, the value prop tells react the username by storing it inside the value prop */}
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input 
                    type="password"
                    value={password}
                    placeholder="password" 
                    minLength={8}
                    onChange={passwordHandler}/>
                </div>
                <button type="submit">Sign Up</button>

    </form>
        
        </>
    );
}

export default SignUpForm;