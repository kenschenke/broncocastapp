import C from '../contants';

export const mapAdminUsersModalProps = state => {
    return {
        filterOn: state.admin_users.filterOn,
        isVisible: state.admin_users.modalVisible
    };
};

export const mapAdminUsersModalDispatch = dispatch => {
    return {
        closeModal() {
            dispatch({
                type: C.SET_ADMIN_USERS_DATA,
                payload: { modalVisible: false }
            });
        },

        setFilterOn(filterOn) {
            dispatch({
                type: C.SET_ADMIN_USERS_DATA,
                payload: { filterOn }
            });
        }
    };
};
