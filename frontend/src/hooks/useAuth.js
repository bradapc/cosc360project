import { useState, useEffect } from "react";

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('http://localhost:5000/auth/me', {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await res.json();
                if (data.loggedIn) {
                    setUser(data);
                }
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);
    return {user, loading};
}