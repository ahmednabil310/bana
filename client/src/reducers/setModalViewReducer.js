
export default (state = false, action) => {
    if (action.type === 'SHOW_MODAL') {
        return true
    }

    if (action.type === 'HIDE_MODAL') {
        return false
    }

    else return state;
}