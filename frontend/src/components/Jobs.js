import React from 'react'
import useJobs from '../hooks/useJobs'
import Job from './Job';
import '../css/Jobs.css';

const Jobs = () => {
    const {jobs, loading, error} = useJobs();
  return (
    <div className="jobs-wrapper">
        {loading && <p>Loading jobs...</p>}
        {error && <p className="error-msg">Error: {error.message}</p>}
        {jobs && jobs.map((job, idx) => (
            <Job key={idx} job={job} />
        ))}
    </div>
  )
}

export default Jobs
