import C from '../contants';
import { getProfileContacts, setSingleMsg, showContactDetail } from '../actions/profileContactsActions';

export const mapProfileContactsProps = state => {
    return {
        contacts: state.profile_contacts.contacts,
        singleMsg: state.profile_name.singleMsg,
        fetching: state.profile_contacts.fetching,
        errorMsg: state.profile_contacts.errorMsg
    };
};

export const mapProfileContactsDispatch = dispatch => {
    return {
        contactPressed(ContactId, ContactText, navigate) {
            dispatch(showContactDetail(ContactId, ContactText));
            navigate.navigate('ContactDetail');
        },

        init() {
            dispatch(getProfileContacts());
        },

        newEmailPressed(navigate) {
            dispatch({
                type: C.SET_CONTACT_DETAIL_DATA,
                payload: {
                    contact: '',
                    contactId: 0,
                    isPhone: false,
                    helpText: '',
                    isValid: true,
                    saved: false,
                    updating: false
                }
            });
            navigate.navigate('ContactDetail');
        },

        newPhonePressed(navigate) {
            dispatch({
                type: C.SET_CONTACT_DETAIL_DATA,
                payload: {
                    contact: '',
                    contactId: 0,
                    isPhone: true,
                    helpText: '',
                    isValid: true,
                    saved: false,
                    updating: false
                }
            });
            navigate.navigate('ContactDetail');
        },

        singleMsgChanged(singleMsg) {
            dispatch(setSingleMsg(singleMsg));
        }
    };
};
