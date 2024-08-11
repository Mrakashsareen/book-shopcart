import React, { useState } from 'react';
import axios from 'axios';
import { User } from './Registration.types';
import styles from './Registration.module.css';

const Register: React.FC = () => {
    const [user, setUser] = useState<User>({ email: '', name: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/register', user);
            alert('Registration successful!');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed!');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.card}>
            <h2>Register New User</h2>
            <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
            <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
