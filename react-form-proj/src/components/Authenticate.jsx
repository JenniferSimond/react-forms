import React, {useState} from "react";


function Authenticate ({token}) {
    const [successMessage, setSuccessMessage] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [error, setError] = useState(null);
    const handleClick = async () => {
        console.log('Button Click!!')
        console.log('token >>--->', token)

        try {
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const message = await response.json();
        if (message.success) {
            setSuccessMessage(message.message);
            setUserInfo(message.data);
        } else {
            throw new Error(message.message)
        }
        console.log('Message >>--->', message.message)

        } catch (error) {
            setError(error.message);
        }
    };
    return(
        <>
        
        <div>
            <h2>Authenticate</h2>
            {successMessage && <p>{successMessage}</p>}
            {userInfo.username && <p>Welcome, {userInfo.username}!</p>}
            {error && <p>{error}</p>}
            <button onClick={handleClick}>Authenticate Token!</button>
            
        </div>
        </>

    );

}

export default Authenticate;