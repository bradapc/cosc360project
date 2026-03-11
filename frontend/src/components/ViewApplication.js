import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../css/ViewApplication.css';

const ViewApplication = () => {

  const { id } = useParams()
  const [application, setApplication] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(`http://localhost:5000/applications/${id}`, {
            method: 'GET',
            credentials: "include"
        })

        if (!response.ok) {
          throw new Error("Failed to fetch application")
        }

        const data = await response.json()
        setApplication(data)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchApplication()
  }, [id])

  if (error) {
    return <div className="container">{error}</div>
  }

  if (!application) {
    return <div className="container">Loading...</div>
  }

  return (
    <div className="container">
      <h2>Application</h2>

      <div className="form-group">
        <label>First Name</label>
        <p>{application.firstName}</p>
      </div>

      <div className="form-group">
        <label>Last Name</label>
        <p>{application.lastName}</p>
      </div>

      <div className="form-group">
        <label>Email</label>
        <p>{application.email}</p>
      </div>

      <div className="form-group">
        <label>LinkedIn</label>
        <p>
          <a href={application.linkedin} target="_blank" rel="noreferrer">
            {application.linkedin}
          </a>
        </p>
      </div>

      <div className="form-group">
        <label>Years of Experience</label>
        <p>{application.experienceYears}</p>
      </div>

      <div className="form-group">
        <label>Experience Description</label>
        <p>{application.experienceDescription}</p>
      </div>

      <div className="form-group">
        <label>Status</label>
        <p>{application.status}</p>
      </div>

      <div className="form-group">
        <label>Answers</label>
        {application.answers && application.answers.map((answer, index) => (
            <div key={index}>
                <p>{answer.question}</p>
                <p>{answer.answer}</p>
            </div>
        ))}
      </div>

    </div>
  )
}

export default ViewApplication