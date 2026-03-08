import React from 'react'
import { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";

const JobApplication = () => {
    const [job, setJob] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`http://localhost:5000/jobs/${id}`, {
                    headers: { "Content-Type": "application/json" }
                });
                if (!response.ok) {
                    throw new Error(`Could not fetch job ${id}`);
                }
                const json = await response.json();
                setJob(json);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);
  return (
    <div>
            {job && 
            <div className="job-application-summary">
                <h1>Apply for: {job.title}</h1>
                <p>{job.company}</p>
                <p>${job.salaryRange.min} - ${job.salaryRange.max} / year</p>
                <p>Key Responsibilities:</p>
                <ul>
                    {job.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                    ))}
                </ul>
            </div>

        }
      <form className="job-application-form">

      </form>
    </div>
  )
}

export default JobApplication
