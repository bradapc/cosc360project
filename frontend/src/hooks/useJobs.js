import { useState, useEffect } from "react";

function useJobs(filters = {}) {
    const [jobs, setJobs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
        if (filters[key]) {
            queryParams.append(key, filters[key]);
        }
    });
    const queryString = queryParams.toString();

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const url = `http://localhost:5000/jobs${queryString ? `?${queryString}` : ''}`;

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch jobs");
                }
                const json = await response.json();
                setJobs(json);
                setError(null);
            } catch (err) {
                setError(err);
            } finally{
                setLoading(false);
            }
        };

        fetchJobs();
    }, [queryString]);

    return {jobs, loading, error}
}

export default useJobs;