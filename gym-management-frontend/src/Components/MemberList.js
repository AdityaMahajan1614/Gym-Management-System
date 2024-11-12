import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MemberList() {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/members');
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);
  return (
    <div>
      <h2 style={{textAlign:'center',padding:'30px 0 0 0'}}>All Members enrolled in Performyx</h2>
      <table>
        <thead>
          <tr key={99999}>
            <th>Member ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Trainer</th>
            <th>Fitness Level</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.memberid}>
              <td>{member.memberid}</td>
              <td>{member.fname}</td>
              <td>{member.lname}</td>
              <td>{member.age}</td>
              <td>{member.contactno}</td>
              <td>{member.trainerid}</td>
              <td>{member.fitnesslevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberList;
