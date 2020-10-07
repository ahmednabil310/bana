import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import Api from '../../../apis/Api';

const UserCard = ({ user, setConfirmData, getUsers }) => {
  //redux store state
  const accessToken = useSelector(state => state.accessToken);

  const onApproveClick = async (user) => {
    const response = await Api.post('/users/approve', { userId: user._id }, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })

    getUsers();
  }

  const onRemoveClick = (user) => {
    setConfirmData({
      payload: user,
      onConfirmClick: deleteUser,
      confirmButtonLabel: 'Delete User',
      confirmButtonVariant: 'danger',
      body: `Deleting a user, will also delete all his recipes and videos, Are you sure you want to delete ${user.name}?`
    })
  }

  const deleteUser = async (user) => {
    const response = await Api.delete('/users', {
      data: { userId: user._id },
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })

    getUsers();
    setConfirmData('');
  }

  const onAdminChange = async (state, user) => {
    const response = await Api.post('/users/admin', { userId: user._id, admin: state }, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
    getUsers();
  }

  return (
    <Card className="user-card">
      <Card.Body className="text-center m-2 p-2">
        <img className="user-card-image" src={user.image || require('../../../images/default-profile-picture.png')} alt="user-image" />

        <p className="m-0 p-0 mt-3 text-lg text-highliten">{user.name}</p>

        <p className="m-0 p-0 text-sm">{user.email}</p>
        <p className="m-0 p-0 text-sm">{user.userRole}</p>
        <p className="m-0 p-0 text-sm">Joined: {getDate(user.createdAt)}</p>

        {!user.activated && <Button className="px-2 py-1 mt-2 text-xs" variant="success" size="sm" onClick={() => onApproveClick(user)}>Approve</Button>}

      </Card.Body>
      <Card.Footer className="d-flex justify-content-between">
        <Form.Check
          checked={user.userRole === 'admin'}
          onChange={(e) => onAdminChange(e.target.checked, user)}
          type="switch"
          id={user._id}
          label="Admin"
        />
        <span className="text-red pointer" onClick={() => onRemoveClick(user)}>remove</span>
      </Card.Footer>
    </Card>
  )
}

function getDate(date) {
  var a = new Date(date);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var day = a.getDate();
  return (`${month} ${day}, ${year}`)
}

export default UserCard
