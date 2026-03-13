import React from 'react'
import '../css/AdminDashboard.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

const AdminDashboard = () => {
  return (
    <>
        <h2>Analytics</h2>
        <div class="Analytics">
          <div>
            Value <br/>
            Registered users
          </div>
          <div>
            Value <br/>
            Active Job Listings
          </div>
          <div>
            Value <br/>
            Applications
          </div>
          <div>
            Value <br/>
            Feedback Comments
          </div>
        </div>

        <h3>Most Active Jobs</h3>
          <table class = "MostActive">
            <tr>
              <th>Job Name</th>
              <th># Applicants</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>Job Name</td>
              <td>Applicants data</td>
              <td>Status data</td>
            </tr>
          </table>

        <h3>Most Reviewed Applicants</h3>
        <table class = "MostReviewed">
            <tr>
             <th>Applicant Name</th>
             <th># Reviews</th>
           </tr>
           <tr>
             <td>Applicant Names</td>
             <td>Review data</td>
           </tr>
         </table>

        <h3>Moderation Queue</h3>
          <table class = "ModQueue">
            <tr>
              <th>Job Name</th>
              <th>Report Reason</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
            <tr>
              <td>Job Names</td>
              <td>Report Reasons</td>
              <td>Dates</td>
              <td>Actions</td>
            </tr>
          </table>
    </>
  )
}

export default AdminDashboard