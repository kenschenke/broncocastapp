import C from '../contants';
import { fetchUrl } from '../helpers';

export const deleteContact = navigate => (dispatch, getState) => {
    const state = getState();
    const { contactId } = state.contact_detail;
    const { contacts } = state.profile_contacts;

    dispatch({
        type: C.SET_CONTACT_DETAIL_DATA,
        payload: { helpText: 'Deleting contact' }
    });

    fetchUrl(`${C.URL_CONTACTS}/${contactId}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            if (!data.Success) {
                dispatch({
                    type: C.SET_CONTACT_DETAIL_DATA,
                    payload: { isValid: false, helpText: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_PROFILE_CONTACTS_DATA,
                payload: {
                    contacts: contacts.filter(c => c.ContactId !== contactId)
                }
            });

            navigate.goBack();
        });
};

export const getProfileContacts = () => dispatch => {
    dispatch({
        type: C.SET_PROFILE_CONTACTS_DATA,
        payload: {
            contacts: [],
            fetching: true,
            errorMsg: ''
        }
    });

    fetchUrl(C.URL_CONTACTS)
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: C.SET_PROFILE_CONTACTS_DATA,
                payload: { fetching: false }
            });

            if (!data.Success) {
                dispatch({
                    type: C.SET_PROFILE_CONTACTS_DATA,
                    payload: { errorMsg: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_PROFILE_CONTACTS_DATA,
                payload: { contacts: data.Contacts }
            });
        });
};

export const saveContact = () => (dispatch, getState) => {
    const state = getState();
    const { contact, contactId, isPhone } = state.contact_detail;

    dispatch({
        type: C.SET_CONTACT_DETAIL_DATA,
        payload: { helpText: 'Saving'}
    });

    let formData = new FormData();
    const newContact = isPhone ? contact.replace(/[^0-9]/g, '') : contact;
    formData.append('Key', newContact);

    fetchUrl(contactId ? `${C.URL_CONTACTS}/${contactId}` : C.URL_CONTACTS, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            dispatch({
                type: C.SET_PROFILE_NAME_DATA,
                payload: { updating: false, saved: true }
            });
            if (!data.Success) {
                dispatch({
                    type: C.SET_CONTACT_DETAIL_DATA,
                    payload: { isValid: false, helpText: data.Error }
                });
                return;
            }

            let payload = { isValid: true, helpText: 'Contact saved' };
            if (!contactId) {
                payload.contactId = data.ContactId;
            }

            dispatch({ type: C.SET_CONTACT_DETAIL_DATA, payload });

            if (contactId) {
                // Update the contact in the contacts list
                dispatch({
                    type: C.SET_PROFILE_CONTACTS_DATA,
                    payload: {
                        contacts: state.profile_contacts.contacts.map(c => {
                            return {
                                ...c,
                                Contact: c.ContactId === contactId ? newContact : c.Contact
                            };
                        })
                    }
                });
            } else {
                // Add the contact to the contacts list
                dispatch({
                    type: C.SET_PROFILE_CONTACTS_DATA,
                    payload: {
                        contacts: [...state.profile_contacts.contacts, {
                            ContactId: data.ContactId,
                            Contact: newContact
                        }]
                    }
                });
            }
        });
};

export const setSingleMsg = singleMsg => (dispatch, getState) => {
    const state = getState();
    
    const name = state.profile_name.name.trim();
    if (!name.length) {
        dispatch({
            type: C.SET_PROFILE_NAME_DATA,
            payload: { errorMsg: 'A name is required' }
        });
        return;
    }

    let formData = new FormData();
    formData.append('UsrName', name);
    formData.append('SingleMsg', singleMsg ? 'true' : 'false');

    fetchUrl(C.URL_PROFILE, {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.Success) {
                dispatch({
                    type: C.SET_PROFILE_NAME_DATA,
                    payload: { singleMsg }
                });
            }
        });
};

export const showContactDetail = (ContactId, ContactText) => dispatch => {
    dispatch({
        type: C.SET_CONTACT_DETAIL_DATA,
        payload: {
            contact: ContactText,
            contactId: ContactId,
            helpText: '',
            isPhone: ContactText.search(/[^0-9]/) === -1,
            isValid: false,
            saved: false,
            updating: false
        }
    });

    dispatch(validateContact(false));
};

export const testContact = () => (dispatch, getState) => {
    const state = getState();
    const { contactId } = state.contact_detail;

    dispatch({
        type: C.SET_CONTACT_DETAIL_DATA,
        payload: { helpText: 'Sending test message' }
    });

    fetchUrl(`${C.URL_CONTACTS}/test/${contactId}`, { method: 'PUT' })
        .then(response => response.json())
        .then(data => {
            if (!data.Success) {
                dispatch({
                    type: C.SET_CONTACT_DETAIL_DATA,
                    payload: { isValid: false, helpText: data.Error }
                });
                return;
            }

            dispatch({
                type: C.SET_CONTACT_DETAIL_DATA,
                payload: { helpText: 'Test message sent' }
            });
        });
};

export const validateContact = saveIfValid => (dispatch, getState) => {
    const state = getState();

    const { contact, isPhone } = state.contact_detail;
    let helpText = '';
    let isValid = true;

    if (isPhone) {
        const phone = contact.replace(/[^0-9]/g, '');
        if (phone.length !== 10) {
            isValid = false;
            helpText = 'Not a valid 10-digit phone number';
        }
    } else {
        if (contact.search(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/) === -1) {
            isValid = false;
            helpText = 'Not a valid email address';
        }
    }

    dispatch({
        type: C.SET_CONTACT_DETAIL_DATA,
        payload: { isValid, helpText }
    });

    if (isValid && saveIfValid) {
        dispatch(saveContact());
    }
};
