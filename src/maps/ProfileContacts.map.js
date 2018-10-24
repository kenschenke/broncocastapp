import C from '../contants';
import { getProfileContacts } from '../actions/profileContactsActions';

export const mapProfileContactsProps = state => {
    return {
        contacts: state.profile_contacts.contacts,
        fetching: state.profile_contacts.fetching,
        errorMsg: state.profile_contacts.errorMsg
    };
};

export const mapProfileContactsDispatch = dispatch => {
    return {
        init() {
            dispatch(getProfileContacts());
        }
    };
};
