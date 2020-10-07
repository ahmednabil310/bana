import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import CustomPopover from '../common/CustomPopover/CustomPopover';
import Api from '../../../apis/Api';
import { updateProfile } from '../../../actions/userActions';

const Name = () => {
  //redux store state
  const currentUser = useSelector(state => state.currentUser);
  const accessToken = useSelector(state => state.accessToken);
  const dispatch = useDispatch();
  //comp local state
  const [name, setName] = useState(currentUser.name)
  const [error, setError] = useState('')

  const renderPopoverContent = () => {
    return (
      <div>
        <div className="d-flex">
          <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
          <Button className="ml-2" variant="outline-secondary" size="small" onClick={onSaveClick}>Save</Button>
        </div>
        {error && <div className="error" style={{ color: 'red' }}>{error}</div>}
      </div>

    )
  }

  const onSaveClick = async () => {

    if (name) {
      setError('');
      const response = await Api.post('/updateprofile', { name }, {
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      })

      dispatch(updateProfile(response.data));

      //closing the popover
      document.body.click()
    } else {
      setError('Please enter your name');
    }
  }


  return (
    <h2 className="m-0 p-0">{currentUser.name}
      <CustomPopover
        trigger={<span className="material-icons text-light text-lg pointer ml-2">create</span>}
        content={renderPopoverContent()}
        placement="right"
        title="Edit your name"
      /></h2>

  )
}

export default Name
