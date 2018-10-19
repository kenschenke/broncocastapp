import C from './contants';
import { AsyncStorage } from 'react-native';

export const fetchUrl = (urlConst, options) => {
    return AsyncStorage.getItem('AuthCookie').then(cookie => {
        if (options === undefined) {
            options = {};
        }
        if (options.hasOwnProperty('cookie')) {
            options.headers.cookie = cookie;
        } else {
            options.headers = { cookie };
        }

        return fetch(makeUrl(urlConst), options);
    });
};

export const logout = navigation => {
    fetchUrl('URL_LOGOUT', {})
        .then(response => response.json())
        .then(data => {
            if (data.Success) {
                AsyncStorage.removeItem('AuthCookie').then(() => {
                    navigation.navigate('SignIn');
                });
            }
        });
};

export const makeUrl = urlConst => {
    return `${C.SERVER}/${C[urlConst]}`;
};
