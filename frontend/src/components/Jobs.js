import React, { useState } from 'react';
import useJobs from '../hooks/useJobs';
import Job from './Job';
import '../css/Jobs.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Jobs = () => {
    const navigate = useNavigate();
    const { user, authLoading } = useAuth();

    const [filters, setFilters] = useState({
        search: '',
        category: '',
        status: '',
        minSalary: '',
        maxSalary: '',
        skills: '',
        sortBy: 'createdAt',
        sortOrder: 'desc'
    });

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const { jobs, loading, error } = useJobs(filters);

    return (
        <div className="jobs-wrapper">
            <div className="job-filters">
                <input 
                    type="text" 
                    name="search" 
                    placeholder="Search jobs..." 
                    value={filters.search} 
                    onChange={handleFilterChange} 
                />
                
                <input 
                    type="text" 
                    name="category" 
                    placeholder="Category" 
                    value={filters.category} 
                    onChange={handleFilterChange} 
                />
            
                <select name="status" value={filters.status} onChange={handleFilterChange}>
                    <option value="">All Statuses</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                </select>

                <input 
                    type="number" 
                    name="minSalary" 
                    placeholder="Min Salary" 
                    value={filters.minSalary} 
                    onChange={handleFilterChange} 
                />

                <input 
                    type="number" 
                    name="maxSalary" 
                    placeholder="Max Salary" 
                    value={filters.maxSalary} 
                    onChange={handleFilterChange} 
                />

                <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
                    <option value="createdAt">Date Posted</option>
                    <option value="salaryRange.min">Salary</option>
                </select>
                
                <select name="sortOrder" value={filters.sortOrder} onChange={handleFilterChange}>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>

            {error && <p className="error-msg">Error: {error.message}</p>}
            
            {jobs && 
            <div className="jobs-listings">
                {!authLoading && user && 
                <>
                    <button className="add-job-listing" onClick={() => navigate("/jobs/new")}>+</button>
                </>
                }
                {jobs.map((job, idx) => (
                    <Job key={idx} job={job} />
                ))}
            </div>}
        </div>
    )
}

export default Jobs;