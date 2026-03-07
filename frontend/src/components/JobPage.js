import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import '../css/JobPage.css';
import {useAuth} from '../hooks/useAuth'

const JobPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const {user, authLoading} = useAuth();

    const deleteListing = async (e) => {
        try {
            const response = await fetch(`http://localhost:5000/jobs/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: { "Content-Type": "application/json" },

            })
            if (!response.ok) {
                throw new Error("Failed to delete job resource");
            }
            navigate(-1);
        } catch (err) {
            console.error(err);
        }
    }

    const editListing = async (e) => {
        navigate(`/jobs/${id}/edit`)
    };
    
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
                console.log(json)
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    return (
        <div className="job-detail">
            {error && <span className="error-msg">Error: {error.message}</span>}
            {loading && <span>Loading...</span>}
            {job && (
                <div className="job-detail-container">
                    <div className="job-detail-header">
                        <button 
                            className="job-detail-back" 
                            onClick={() => navigate(-1)}
                        >
                            ← Back
                        </button>
                        <h1>{job.company} - {job.title}</h1>
                    </div>
                    <div className="job-detail-body">
                        <span className="job-category">{job.category}</span>
                        <span className="job-meta">
                            Posted {job.createdAt.replace("T", " ")} by {job.createdBy.username}
                        </span>
                        <span className="job-meta">
                            Last updated {job.updatedAt.replace("T", " ")}
                        </span>
                        <p className="job-description">{job.description}</p>

                        {job.responsibilities.length > 0 && (
                            <div className="responsibilities-container">
                                <strong>Responsibilities:</strong>
                                <ul>
                                    {job.responsibilities.map((resp, idx) => (
                                        <li key={idx}>{resp}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {job.techRequirements.length > 0 && (
                            <div className="tech-requirements-container">
                                <strong>Technical Requirements:</strong>
                                <ul>
                                    {job.techRequirements.map((req, idx) => (
                                        <li key={idx}>{req}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {job.benefits.length > 0 && (
                            <div className="benefits-container">
                                {job.benefits.map((benefit, idx) => (
                                    <span className="benefit" key={idx}>{benefit}</span>
                                ))}
                            </div>
                        )}

                        <span className="job-salary">
                            Salary: ${job.salaryRange.min} - ${job.salaryRange.max}
                        </span>
                        <button className="apply-now">
                            Apply
                        </button>
                        <button className="report-listing">
                            Report
                        </button>
                        {!authLoading && user?.userId === job.createdBy._id && 
                        <>
                        <button className="edit-listing"
                        onClick={(e) => editListing(e)}>Edit</button>
                        <button className="delete-listing"
                        onClick={(e) => deleteListing(e)}>Delete</button>
                        </>
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobPage;