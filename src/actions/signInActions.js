import C from '../contants';
import { fetchUrl } from '../helpers';
import { AsyncStorage } from 'react-native';
import CookieManager from 'react-native-cookies';

export const signIn = (username, password, navigation) => dispatch => {
    dispatch({
        type: C.SET_SIGN_IN_DATA,
        payload: {
            signingIn: true,
            errorMsg: ''
        }
    });

    let formData = new FormData();
    formData.append('_username', username);
    formData.append('_password', password);
    formData.append('_remember_me', 'on');
    formData.append('applogin', 'true');

    let cookie = null;
    fetchUrl('URL_SIGNIN', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'  // 'application/x-www-form-urlencoded'
        },
        body: formData
    })
        .then(response => {
            cookie = response.headers.get('set-cookie');
            return response.json();
        })
        .then(responseJson => {
            dispatch({
                type: C.SET_SIGN_IN_DATA,
                payload: { signingIn: false }
            });
            if (responseJson.Success) {
                CookieManager.clearAll().then(() => {
                    AsyncStorage.setItem('AuthCookie', cookie).then(() => {
                        navigation.navigate('App');
                    })
                });
            } else {
                dispatch({
                    type: C.SET_SIGN_IN_DATA,
                    payload: { errorMsg: responseJson.Error }
                });
            }
        });
};
