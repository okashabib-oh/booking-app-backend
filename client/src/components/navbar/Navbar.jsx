import React, { useContext } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const Navbar = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className='navbar'>
            <div className="navContainer">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <span className="logo">Bookings</span>
                </Link>
                {user ? user.user.username : <div className="navItems">
                    <button className="navButton">Register</button>
                    <Link to='/login'>
                        <button className="navButton">Login</button>
                    </Link>
                </div>}
            </div>
        </div>
    )
}

export default Navbar