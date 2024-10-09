import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css'; 
import Cookies from 'js-cookie';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
            Cookies.set('username', username); 
            Cookies.set('token', response.data.token);
            alert("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            alert("Invalid login details: " + error.response.data.message);
        }
    };

    return (
        <div className="container login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username" 
                    value={username} 
                    placeholder="Username" 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <p className="mt-3">
                Don't have an account? <Link to="/register">Create one</Link>
            </p>
        </div>
    );
};

export default Login;
