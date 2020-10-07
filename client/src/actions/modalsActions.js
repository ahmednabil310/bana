export const showModal = (modalType, props) => {
    return {
        type: 'SHOW_MODAL',
        payload: {
            modalType: modalType,
            modalProps: props
        }
    }
}

export const hideModal = () => {
    return {
        type: 'HIDE_MODAL',
    }
}