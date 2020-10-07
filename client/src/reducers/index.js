import { combineReducers } from 'redux';

import currentUserReducer from './currentUserReducer';
import accessTokenReducer from './accessTokenReducer';
import setModalViewReducer from './setModalViewReducer';
import modalTypeReducer from './modalTypeReducer';

export default combineReducers({
    currentUser: currentUserReducer,
    accessToken: accessTokenReducer,
    modalVisible: setModalViewReducer,
    modalType: modalTypeReducer,
})