import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddMember.css';

function AddMember() {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    contactno: '',
    trainer_id: '',
    fitness_level: '',
    dob: '',
    age: ''
  });

  const [trainers, setTrainers] = useState([]);
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/trainers');
        setTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    }
    fetchTrainers();}
  ,[]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/newmember', formData);
      document.getElementById("id-message").innerHTML = `Member added: ${response.data.fname} ${response.data.lname} <br> Member ID: ${response.data.memberid}`;
    } catch (error) {
      console.error("Error adding member:", error);
      alert("Error adding member.");
    }
  };
  return (
    <div className='Container-add-member'>
      <h2> New Member Registration</h2>
      <div>
        <form onSubmit={handleSubmit} id='add-member-form'>
          <label>First Name: </label>
          <input type="text" name="fname" placeholder="First Name" onChange={handleChange} required />
          
          <label>Last Name: </label>
          <input type="text" name="lname" placeholder="Last Name" onChange={handleChange} required />
          
          <label>Contact No: </label>
          <input type="text" name="contactno" placeholder="Contact No" onChange={handleChange} required />
          
          <label>Choose Trainer: </label>
          <select name="trainer_id" onChange={handleChange}>
            <option value="">Select a Trainer</option> 
            {trainers.map(trainer => (
              <option key={trainer.trainerid} value={trainer.trainerid}>
                {trainer.name}
              </option>
            ))}
          </select>
          
          <label>Fitness Level: </label>
          <input type="text" name="fitness_level" placeholder="On a scale of 1-10" onChange={handleChange} />
          
          <label>Date of Birth: </label>
          <input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} />
          
          <button type="submit">Add Member</button>
          <p id="id-message"></p>
        </form>
      </div>
      <div>
        <h3>List of Available Trainers</h3>
        <table>
          <thead>
            <tr key={99999}>
              <th>Trainer ID</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Supervisor</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map(trainer => (
              <tr key={trainer.trainerid}>
                <td>{trainer.trainerid}</td>
                <td>{trainer.name}</td>
                <td>{trainer.specialization}</td>
                <td>{trainer.supervisorid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
}

export default AddMember;
