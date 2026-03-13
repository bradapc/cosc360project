import React from 'react'
import useJobs from '../hooks/useJobs'
import Job from './Job';
import '../css/Jobs.css';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

const Jobs = () => {
    const {jobs, loading, error} = useJobs();
    const navigate = useNavigate();
    const {user, authLoading} = useAuth();

  return (
    <div className="jobs-wrapper">
        {loading && <p>Loading jobs...</p>}
        {error && <p className="error-msg">Error: {error.message}</p>}
        {jobs && 
        <div className="jobs-listings">
          {!authLoading && user && 
          <>
            <button className="add-job-listing"
            onClick={() => navigate("/jobs/new")}>+</button>
          </>
          }
          {jobs.map((job, idx) => (
            <Job key={idx} job={job} />
        ))}</div>}
    </div>
  )
}

export default Jobs
