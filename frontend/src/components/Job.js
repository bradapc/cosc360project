import React from 'react'
import '../css/Job.css';

const Job = ({job}) => {
  return (
    <div className="job-container">
        <div className="job-text">
            <h2>{job.company} - {job.title}</h2>
            <p>{job.description}</p>
            <p className="category">Category: {job.category}</p>
            <div className="job-bottom-info">
                <div className="tech-req-wrapper">
                    {job.techRequirements && job.techRequirements.map((requirement, idx) => (
                        <span key={idx} className="tech-req">{requirement}</span>
                    ))}
                </div>
                <span className="salary">${job.salaryRange.min} - ${job.salaryRange.max} per year</span>
                <span className={`status ${job.status}`}>{job.status[0].toUpperCase() + job.status.slice(1)}</span>
                <button className="view-job-posting">View Posting</button>
            </div>
        </div>
    </div>
  )
}

export default Job
