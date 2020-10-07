
export default (status = '', action) => {
    if (action.type === 'EMAIL_SIGNUP' || action.type === 'EMAIL_LOGIN' || action.type === 'LINKEDIN_LOGIN' || action.type === 'LINKEDIN_SIGNUP') {
        if (action.payload.token) return action.payload.token
    }

    if (action.type === 'LOGOUT_USER') {
        return '';
    }

    return status
}