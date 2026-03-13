import { useState, useEffect } from "react";

function useJobs() {
    const [jobs, setJobs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch("http://localhost:5000/jobs", {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const json = await response.json();
                setJobs(json);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return {jobs, loading, error}
}

export default useJobs;