import C from './contants';
import { AsyncStorage } from 'react-native';

export const fetchUrl = (relativeUrl, options) => {
    return AsyncStorage.getItem('AuthCookie').then(cookie => {
        if (options === undefined) {
            options = {};
        }
        if (options.hasOwnProperty('cookie')) {
            options.headers.cookie = cookie;
        } else {
            options.headers = { cookie };
        }

        return fetch(`${C.SERVER}/${relativeUrl}`, options);
    });
};

export const formatContact = contact => {
    if (contact.length === 10 && contact.search(/[^0-9]/) === -1) {
        return `(${contact.substr(0,3)}) ${contact.substr(3,3)}-${contact.substr(6)}`;
    }

    return contact;
};

export const logout = navigation => {
    fetchUrl(C.URL_LOGOUT, {})
        .then(response => response.json())
        .then(data => {
            if (data.Success) {
                AsyncStorage.removeItem('AuthCookie').then(() => {
                    navigation.navigate('SignIn');
                });
            }
        });
};

