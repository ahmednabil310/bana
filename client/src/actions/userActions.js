import Api from '../apis/Api';
import history from '../history'; // to be able to make programatic navs

//Action to sign up the user by email
export const emailSignup = (data) => async (dispatch) => {
    await Api.post('/users/emailsignup', data);
}

//Action to sign up the user by linkedin
export const linkedinSignup = (data) => async (dispatch) => {
    const response = await Api.post('/users/linkedinsignup', data);
    dispatch({
        type: 'LINKEDIN_SIGNUP',
        payload: response.data
    })
    //Navigate to home page after email sign up
    history.push('/home')
}

//Action to sign up the user by email
export const emailLogin = (data) => async (dispatch) => {
    try {
        const response = await Api.post('/users/emailLogin', data);
        console.log(response.data)
        if (response.data.error) {
            return response.data.error
        } else {
            dispatch({
                type: 'EMAIL_LOGIN',
                payload: response.data
            })

            //Navigate to home page after email Log In
            history.push('/')
        }
    } catch (error) {
        return { error: error }
    }
}

//Action to login user by linkedin
export const linkedinLogin = (data) => {
    return ({
        type: 'LINKEDIN_LOGIN',
        payload: data
    })
}

//Action to Log out the user
export const logoutUser = () => async (dispatch, getState) => {
    console.log(getState().accessToken)
    await Api.post('/users/logout', {}, {
        headers: {
            Authorization: `Bearer ${getState().accessToken}`
        }
    });
    //dispatching first to clear the user from redux store in case the tken is not valid
    dispatch({
        type: 'LOGOUT_USER',
    })
    //Navigate to home page after email Log In
    history.push('/')
}

//activated user
export const activatedUser = (payload) => {
    return {
        type: 'EMAIL_LOGIN',
        payload
    }
}

//Action to add a favorite
export const addFavorite = (itemId, itemCategory) => async (dispatch, getState) => {
    const response = await Api.post('/addfavorite', {
        itemId,
        itemCategory,
    },
        {
            headers: {
                Authorization: `Bearer ${getState().accessToken}`
            }
        });
    dispatch({
        type: 'ADD_FAVORITE',
        payload: response.data
    })
}

//action to update user data
export const updateProfile = (user) => {
    return {
        type: 'UPDATE_PROFILE',
        payload: {
            user
        }
    }
}