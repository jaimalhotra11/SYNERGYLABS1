import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Styles.css';

const EditUser = () => {
    const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true); 
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                if (!response.ok) throw new Error('Failed to fetch user');
                const data = await response.json();
                setUserInfo({ name: data.name, email: data.email, phone: data.phone });
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); 
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userInfo),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            alert('User updated successfully!'); 
            navigate('/'); 
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user: ' + error.message);
        }
    };

    if (loading) return <p>Loading user data...</p>; 
    if (error) return <p>Error fetching user: {error}</p>; 

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit User</h2>
            <input
                name="name"
                value={userInfo.name}
                onChange={handleChange}
                required
                placeholder="Name"
            />
            <input
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                required
                placeholder="Email"
                type="email" 
            />
            <input
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                required
                placeholder="Phone"
            />
            <button type="submit">Update</button>
        </form>
    );
};

export default EditUser;
