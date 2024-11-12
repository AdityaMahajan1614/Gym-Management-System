import React, { useState } from "react";
import axios from "axios";
import "./Member.css";

function Member() {
    const [member, setMember] = useState({});
    const [memberId, setMemberId] = useState('');
    const [dob, setDob] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const handleMemberIdChange = (event) => {
        setMemberId(event.target.value);
    };

    const handleDobChange = (event) => {
        setDob(event.target.value);
    };

    const handleMember = async (event) => {
        event.preventDefault();
        if (memberId && dob) {
            try {
                const response = await axios.get(`http://localhost:3001/api/member/${memberId}`);
                const fetchedMember = response.data;
                
                const fetchedDob = new Date(fetchedMember.dob).toLocaleDateString('en-CA');
                if (fetchedDob === dob) {
                    setMember(fetchedMember);
                    setIsVerified(true);
                } else {
                    alert("DOB does not match. Please try again.");
                    setIsVerified(false);
                    setMember({});
                }
            } catch (error) {
                console.error("There was an error fetching the member details!", error);
            }
        }
    };

    return (
        <div className="Member-container">
            <form onSubmit={handleMember} id="member-form">
                <h2>Member Details</h2>
                <label>
                    Member ID:
                    <input type="text" name="memberinput" value={memberId} onChange={handleMemberIdChange} required />
                </label>
                <label>
                    Date of Birth:
                    <input type="date" name="dob" value={dob} onChange={handleDobChange} required />
                </label>
                <button type="submit">Get Member Details</button>
            </form>
            {isVerified && (
                <div className="Member-details">
                    <h3>Details of {member.fname} {member.lname}</h3>
                    <p>Member ID: {member.memberid}</p>
                    <p>First Name: {member.fname}</p>
                    <p>Last Name: {member.lname}</p>
                    <p>Age: {member.age}</p>
                    <p>Contact No: {member.contactno}</p>
                    <p>Emergency Contact: {member.contactname}</p>
                    <p>Emergency Contact No: {member.contactnumber}</p>
                    <p>Trainer: {member.name}</p>
                    <p>Fitness Level: {member.fitnesslevel}</p>
                    <p>Class: {member.classname}</p>
                    <p>Workout Plan: {member.planname}</p>
                </div>
            )}
        </div>
    );
}

export default Member;
