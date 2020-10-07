
const initialState = {
    modalType: null,
    modalProps: {}
}

export default (state = initialState, action) => {
    if (action.type === 'SHOW_MODAL') {
        return {
            modalType: action.payload.modalType,
            modalProps: action.payload.modalProps
        }
    }

    if (action.type === 'HIDE_MODAL') {
        return initialState;
    }

    return state;
}