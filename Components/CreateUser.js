import React, { useState, useEffect, setUsers, setError, setLoading} from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
    const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
    const navigate = useNavigate();
    
    const handleChange = e => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo),
            });
            
            if (!response.ok) {
                throw new Error('Failed to create user');
            }

            navigate('/'); 
        } catch (error) {
            alert('Error creating user');
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) throw new Error('Failed to fetch users');
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchUsers();
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create User</h2>
            <input name="name" value={userInfo.name} onChange={handleChange} required placeholder="Name" />
            <input name="email" value={userInfo.email} onChange={handleChange} required placeholder="Email" />
            <input name="phone" value={userInfo.phone} onChange={handleChange} required placeholder="Phone" />
            <button type="submit">Create</button>
        </form>
    );
};

export default CreateUser;
