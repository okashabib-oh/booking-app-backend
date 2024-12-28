import React, { useContext, useState } from 'react'
import "./login.css"
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })
    const { user, loading, error, dispatch } = useContext(AuthContext)

    const handleChange = (e) => {
        setCredentials(prev => ({
            ...prev, [e.target.id]: e.target.value
        }))

    }

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" })

        try {
            const res = await axios.post("http://localhost:8008/api/auth/login", credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
            navigate('/')
        } catch (err) {
            dispatch({ type: "LOGIN_FAILED", payload: err.response.data });
            console.log(err);
        }
    }
    console.log(user);

    return (
        <div className='login'>
            <div className="lContainer">
                <h1 className='lTitle'>Login</h1>
                <input type="text"
                    placeholder='username'
                    id='username'
                    className='lInput'
                    onChange={handleChange}
                />
                <input type="password"
                    placeholder='password'
                    id='password'
                    className='lInput'
                    onChange={handleChange}
                />
                <button className='lButton' onClick={handleLogin} disabled={loading} >Login</button>
                {error && <span className='loginErr'>{error}</span>}
            </div>
        </div>
    )
}

export default Login