import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './register.scss'

export default function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('https://my-blog-app-backend.herokuapp.com/api/auth/register', {
                username,
                email,
                password
            });
            res.data && window.location.replace("/login")
        }
        catch(err){
            setError(true)
        }
    }
    return (
        <div className="register">
            <span className="title">Register</span> 
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)}/>
                <label>Email</label>
                <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
                <label>Password</label>
                <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
                <button className="registerBtn" type="submit">Register</button>
            </form>
            <button className="registerLoginBtn">
                <Link to="/login" className="link">Login</Link>
            </button>
            {error && (<span className="err">Something went wrong!</span>)}
        </div>
    );
}