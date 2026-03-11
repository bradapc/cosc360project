import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import '../css/UserProfilePage.css';
import {useAuth} from '../hooks/useAuth'

const UserProfilePage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const {user: authUser} = useAuth();

    const deleteAccount = async (e) => {
        try {
            const response = await fetch(`http://localhost:5000/users/${userId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
            })
            if (!response.ok) {
                throw new Error("Failed to delete user account");
            }
            navigate("/register");
        } catch (err) {
            console.error(err);
        }
    }

    const editAccount = async (e) => {
        navigate(`/users/${userId}/edit`)
    };

    useEffect(() => {
        console.log("Fetching user data for userId:", userId);
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/users/${userId}`, {
                    headers: { "Content-Type": "application/json" }
                });
                if (!response.ok) {
                    throw new Error(`Could not fetch user ${userId}`);
                }
                const json = await response.json();
                setUser(json);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [userId]);

    return (
        <div className="user-profile">
            {error && <span className="error-msg">Error: {error.message}</span>}
            {loading && <span>Loading...</span>}
            {user && (
                <div className="user-profile-container">
                    <div className="user-profile-header">
                        <button 
                                className="user-profile-back" 
                                onClick={() => navigate(-1)}
                            >
                                ← Back
                            </button>
                        <h2>{user.firstName} {user.lastName}</h2>
                    </div>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" className="profile-pic"></img>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.emailAddress}</p>
                    <p>Date of Birth: {new Date(user.dateOfBirth).toLocaleDateString()}</p>
                    {authUser && authUser?.userId === user._id && (
                        <>
                            <button onClick={editAccount}>Edit Account</button>
                            <button onClick={deleteAccount}>Delete Account</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserProfilePage;