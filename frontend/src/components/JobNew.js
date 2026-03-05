import React from 'react'
import {useState, useEffect} from 'react'
import {useParams, useNavigate} from "react-router-dom";
import '../css/JobEdit.css';

const JobNew = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [company, setCompany] = useState("");
    const [salaryRange, setSalaryRange] = useState({min: "", max: ""});
    const [category, setCategory] = useState("");
    const [responsibilities, setResponsibilities] = useState([]);
    const [techRequirements, setTechRequirements] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [customQuestions, setCustomQuestions] = useState([])
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [newResponsibility, setNewResponsibility] = useState("");
    const [newTechRequirement, setNewTechRequirement] = useState("");
    const [newBenefit, setNewBenefit] = useState("");
    const [newCustomQuestion, setNewCustomQuestion] = useState("");
    const navigate = useNavigate();

    const postJob = () => {
        try {
            const response = fetch(`http://localhost:5000/jobs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    company,
                    category,
                    salaryRange,
                    responsibilities,
                    techRequirements,
                    benefits,
                    customQuestions
                })
            })
            if (!response.ok) {
                throw new Error(response.msg);
            }
            const json = response.json();
            navigate(`/jobs/${json.job._id}`)
        } catch (err) {
            setError(err);
        }
    };

    const addResponsibility = () => {
        if (newResponsibility === "") return;
        setResponsibilities(prev => [...prev, newResponsibility])
        setNewResponsibility("");
    };

    const addCustomQuestion = () => {
        if (newCustomQuestion === "") return;
        setCustomQuestions(prev => [...prev, newCustomQuestion])
        setNewCustomQuestion("")
    }

    const addTechRequirement = () => {
        if (newTechRequirement === "") return;
        setTechRequirements(prev => [...prev, newTechRequirement])
        setNewTechRequirement("");
    };

    const addBenefit = () => {
        if (newBenefit === "") return;
        setBenefits(prev => [...prev, newBenefit])
        setNewBenefit("");
    };

  return (
    <div className="job-edit">

        <label>Job Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Company</label>
        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />

        <label>Category</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />

        <label>Salary Range</label>
        <input
            type="text"
            placeholder="Minimum"
            value={salaryRange.min}
            onChange={(e) =>
                setSalaryRange(prev => ({min: e.target.value, max: prev.max}))
            }
        />
        <input
            type="text"
            placeholder="Maximum"
            value={salaryRange.max}
            onChange={(e) =>
                setSalaryRange(prev => ({min: prev.min, max: e.target.value}))
            }
        />

        <label>Responsibilities</label>
        {responsibilities.map((resp, idx) => (
            <div key={idx} className="resp">
                <span>{resp}</span>
                <button className="delete-btn"
                value={resp}
                onClick={() => setResponsibilities(prev => prev.filter(curResp => curResp !== resp))}>x</button>
            </div>
        ))}
        <input
            type="text"
            placeholder="Add Responsibility"
            value={newResponsibility}
            onChange={(e) => setNewResponsibility(e.target.value)}
        />
        <button className="add-btn-edit-job" onClick={() => addResponsibility()}>+</button>

        <label>Technical Requirements</label>
        {techRequirements.map((techReq, idx) => (
            <div key={idx} className="tech-requirement">
                <span>{techReq}</span>
                <button className="delete-btn"
                onClick = {() => setTechRequirements(prev => prev.filter(curTR => curTR !== techReq))}>x</button>
            </div>
        ))}
        <input
            type="text"
            placeholder="Add Tech Requirement"
            value={newTechRequirement}
            onChange={(e) => setNewTechRequirement(e.target.value)}
        />
        <button className="add-btn-edit-job" onClick={() => addTechRequirement()}>+</button>

        <label>Benefits</label>
        {benefits.map((benefit, idx) => (
            <div key={idx} className="benefit-edit-job">
                <span>{benefit}</span>
                <button className="delete-btn"
                onClick = {() => setBenefits(prev => prev.filter(curBenefit => curBenefit !== benefit))}>x</button>
            </div>
        ))}
        <input
            type="text"
            placeholder="Add Benefit"
            value={newBenefit}
            onChange={(e) => setNewBenefit(e.target.value)}
        />
        <button className="add-btn-edit-job" onClick={() => addBenefit()}>+</button>
        <label>Questions</label>
        {customQuestions.map((cq, idx) => (
            <div key={idx} className="benefit-edit-job">
                <span>{cq}</span>
                <button className="delete-btn"
                onClick = {() => setCustomQuestions(prev => prev.filter(curCq => curCq !== cq))}>x</button>
            </div>
        ))}
        <input
            type="text"
            placeholder="Add Question"
            value={newCustomQuestion}
            onChange={(e) => setNewCustomQuestion(e.target.value)}
        />
        <button className="add-btn-edit-job" onClick={() => addCustomQuestion()}>+</button>
        <div className="job-edit-actions">
            <button className="job-edit-cancel"
            onClick={() => navigate("/jobs")}>Cancel</button>
            <button className="job-edit-update"
            onClick={postJob}>Post Job</button>
        </div>
    </div>
  )
}

export default JobNew