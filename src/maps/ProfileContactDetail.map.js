import C from '../contants';
import { deleteContact, testContact, validateContact } from '../actions/profileContactsActions';

export const mapProfileContactDetailProps = state => {
    return {
        contact: state.contact_detail.contact,
        helpText: state.contact_detail.helpText,
        isPhone: state.contact_detail.isPhone,
        isValid: state.contact_detail.isValid,
        saved: state.contact_detail.saved,
        updating: state.contact_detail.updating
    };
};

export const mapProfileContactDetailDispatch = dispatch => {
    return {
        contactChanged(contact) {
            dispatch({
                type: C.SET_CONTACT_DETAIL_DATA,
                payload: { contact }
            });
        },

        deletePressed(navigate) {
            dispatch(deleteContact(navigate));
        },

        testPressed() {
            dispatch(testContact());
        },

        validateContact() {
            dispatch(validateContact(true));
        }
    };
};
