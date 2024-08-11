import React, { useState } from 'react';
import axios from 'axios';
import { AuthRequest } from './Registration.types';
import styles from './Registration.module.css';

const Login: React.FC = () => {
    const [credentials, setCredentials] = useState<AuthRequest>({ email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', credentials);
            localStorage.setItem('token', response.data.token);
            alert('Login successful!');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed!');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.card}>
            <h2>Login</h2>
            <input type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
