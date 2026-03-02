import React from 'react'
import {useParams} from "react-router-dom";
import { useState, useEffect } from 'react';
import '../css/JobPage.css';

const JobPage = () => {
    const {id} = useParams();
    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    
    useEffect(() => {
    const fetchJob = async () => {
        try {
            const response = await fetch(`http://localhost:5000/jobs/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const json = await response.json();
            setJob(json);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };
    fetchJob();
    }, [id]);
  return (
    <div className="job-detail">
        {error && <span className="error-msg">Error: ${error.message}</span>}
        {loading && <span>Loading...</span>}
        {job && <div className="job-detail-container">
                <div className="job-detail-header">
                    <button className="job-detail-back">←</button>
                    <h1>{job.company} - {job.title}</h1>
                </div>
                <div className="job-detail-body">
                    <div className="job-detail-left">
                        <p>{job.description}</p>
                    </div>
                    <div className="job-detail-right">
                        <span>Salary: ${job.salaryRange.min} - ${job.salaryRange.max}</span>
                        <span>b</span>
                    </div>
                </div>
            </div>}
    </div>
  )
}


export default JobPage
