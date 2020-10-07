
export default (state = {}, action) => {
    if (action.type === 'EMAIL_SIGNUP' || action.type === 'EMAIL_LOGIN' || action.type === 'UPDATE_PROFILE' || action.type === 'LINKEDIN_LOGIN' || action.type === 'LINKEDIN_SIGNUP') {
        return action.payload.user;
    }

    if (action.type === 'LOGOUT_USER') {
        return {};
    }

    return state
}