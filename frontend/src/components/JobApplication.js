import React from 'react'
import { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import '../css/JobApplication.css';

const JobApplication = () => {
    const [job, setJob] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const {user, loading: authLoading} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));

        const answers = job.customQuestions.map((question, idx) => ({
            question,
            answer: formData[`customQuestion${idx}`]
        }));
        const data = {
            ...formData,
            answers,
            jobId: id
        };
        try {
            const response = await fetch(`http://localhost:5000/applications`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error("Submission failed");
            }
            const json = await response.json();
            navigate(`/applications/${json.id}`);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/login");
            return;
        }
  }, [user, authLoading, navigate])

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
    <div className="job-application-container">
            {loading && <p>Loading...</p>}
            {error && <span className="error-msg">{error}</span>}
            {job && 
            <>
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

        <form className="job-application-form" onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" placeholder="First Name" required></input>

            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" placeholder="Last Name" required></input>

            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Email Address" required></input>

            <label htmlFor="linkedin">LinkedIn</label>
            <input type="url" id="linkedin" name="linkedin" placeholder="LinkedIn"></input>

            <label htmlFor="experienceYears">Years of Experience</label>
            <input type="number" id="experienceYears" name="experienceYears" min="0" max="100" required></input>

            <label htmlFor="experienceDescription">Briefly describe your experience relevant to this job</label>
            <textarea
                id="experienceDescription"
                name="experienceDescription"
                maxLength="500"
                required ></textarea>
            {job.customQuestions.map((question, idx) => (
                <div key={idx} 
                className="custom-question">
                    <label htmlFor={`customQuestion${idx}`}>{question}</label>
                    <textarea className="customQuestionText"
                    id={`customQuestion${idx}`}
                    name={`customQuestion${idx}`}
                    maxLength="250"
                    required ></textarea>
                </div>
            ))}

            <button type="submit">Submit Application</button>
        </form>
        </>
        }
    </div>
  )
}

export default JobApplication
