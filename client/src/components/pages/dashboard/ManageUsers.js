import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import Api from '../../../apis/Api';
import Select from 'react-select';
//imported comps
import ConfirmModal from '../common/ConfirmModal/ConfirmModal';
import UserCard from './UserCard';

const filterOptions = [
  { value: 'all', label: 'All Users' },
  { value: 'pending', label: 'Pending Users' },
  { value: 'admins', label: 'Admins Users' },
  { value: 'approved', label: 'Approved Users' }
]

const ManageUsers = () => {
  //redux store state
  const accessToken = useSelector(state => state.accessToken);
  //comp local state
  const [users, setUsers] = useState([]);
  const [confirmData, setConfirmData] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('')

  const getUsers = async () => {
    const response = await Api.get(`/users?filter=${selectedFilter.value}`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    setUsers(response.data)
  }

  useEffect(() => {
    getUsers();
  }, [selectedFilter])

  const handleFilterChange = (selected) => {
    setSelectedFilter(selected)
  }

  return (
    <div className="users-container">
      <div className="d-flex justify-content-between">
        <h2 className="mb-4">Manage Users</h2>
        <Select
          className="w-25"
          value={selectedFilter}
          onChange={handleFilterChange}
          options={filterOptions}
        />
      </div>
      <Row>
        {users.map(user => {
          return (
            <Col md={6} lg={3} sm={12} key={user._id}>
              <UserCard user={user} setConfirmData={setConfirmData} getUsers={getUsers} />
            </Col>
          )
        })}
      </Row>

      {confirmData && <ConfirmModal confirmData={confirmData} setConfirmData={setConfirmData} />}
    </div>
  )
}

export default ManageUsers
