import React, { useEffect , useState } from 'react';
import axios from 'axios';
import './MemberServices.css';

function MemberServices() {
  const [memberId, setMemberId] = useState('');
  const [classId, setClassId] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [planId, setPlanId] = useState('');

  const handleEnrollClass = async () => {
    try {
      await axios.post(`http://localhost:3001/api/members/${memberId}/enroll-class`, { class_id: classId });
      alert("Class enrollment successful!");
    } catch (error) {
      console.error("Error enrolling in class:", error);
      alert(error.response.data.error);
    }
  };

  const handleEmergencyContactSubmit = async () => {
    try {
      await axios.post(`http://localhost:3001/api/members/${memberId}/emergency-contact`, {
        contact_name: contactName,
        contact_phone: contactPhone
      });
      alert("Emergency contact added successfully!");
    } catch (error) {
      console.error("Error adding emergency contact:", error);
    }
  };

  const handleFollowWorkout = async () => {
    try {
      await axios.post(`http://localhost:3001/api/members/${memberId}/follow-workout`, { plan_id: planId });
      alert("Workout plan followed successfully!");
    } catch (error) {
      console.error("Error following workout plan:", error);
      alert(error.response.data.error);
    }
  };

  const [classes, setClasses] = useState([]);
  useEffect(() => {
        const fetchClasses = async () => {
            try {
            const response = await axios.get('http://localhost:3001/api/classes');
            setClasses(response.data);
            } catch (error) {
            console.error("Error fetching classes:", error);
            }
        }
        fetchClasses();}
  ,[]);

  const [plans, setPlans] = useState([]);
  useEffect(() => {
        const fetchPlans = async () => {
            try {
            const response = await axios.get('http://localhost:3001/api/schedules');
            setPlans(response.data);
            } catch (error) {
            console.error("Error fetching plans:", error);
            }
        }
        fetchPlans();}  
  ,[]);

  return (
    <div className='Container-member-services'>
      <h2>Member Services</h2>

      <label>
        Member ID:
        <input type="text" value={memberId} onChange={(e) => setMemberId(e.target.value)} placeholder='Enter Member ID to Add Details' />
      </label>

      <h3>Enroll in a Class</h3>
			<table>
				<thead>
					<tr key={99999}>
						<th>Class ID</th>
						<th>Class Name</th>
						<th>Instructor</th>
						<th>Schedule</th>
					</tr>
				</thead>
				<tbody>
					{classes.map(cls => (
						<tr key={`${cls.classid}-${cls.name}`}>
							<td>{cls.classid}</td>
							<td>{cls.classname}</td>
							<td>{cls.name}</td>
							<td>{cls.schedule}</td>
						</tr>
					))}
				</tbody>
			</table>
      <label>
        Select Class:
        <select value={classId} onChange={(e) => setClassId(e.target.value)}>
					<option value="">Select a Class</option> 
					{classes.map(cls => (
						<option key={cls.classid} value={cls.classid}>
							{cls.classname}
						</option>
					))}
				</select>
      </label>
      <button onClick={handleEnrollClass}>Enroll in Class</button>

      <h3>Emergency Contact</h3>
      <label>
        Contact Name:
        <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} />
      </label>
      <label>
        Contact Phone:
        <input type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
      </label>
      <button onClick={handleEmergencyContactSubmit}>Add Emergency Contact</button>

      <h3>Follow Workout Plan</h3>
			<table>
				<thead>
					<tr key={99999}>
						<th>Plan ID</th>
						<th>Name</th>
						<th>Minimum Fitness Level</th>
						<th>Equipment</th>
					</tr>
				</thead>
				<tbody>
					{plans.map(plan => (
						<tr key={plan.planid}>
							<td>{plan.planid}</td>
							<td>{plan.planname}</td>
							<td>{plan.minimumfitnesslevel}</td>
							<td>{plan.equipmentname}</td>
						</tr>
					))}
				</tbody>
			</table>
      <label>
        Select Plan:
        <select value={planId} onChange={(e) => setPlanId(e.target.value)}>
					<option value="">Select a Plan</option>
					{plans.map(plan => (
						<option key={plan.planid} value={plan.planid}>
							{plan.planname}
						</option>
					))}
				</select>
      </label>
      <button onClick={handleFollowWorkout}>Follow Workout Plan</button>
    </div>
  );
}

export default MemberServices;
