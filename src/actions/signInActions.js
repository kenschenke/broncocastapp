import C from '../contants';
import { fetchUrl } from '../helpers';
import { AsyncStorage } from 'react-native';
import CookieManager from 'react-native-cookies';

export const checkAuth = navigation => dispatch => {
    fetchUrl(C.URL_ISAUTH)
        .then(response => response.json())
        .then(data => {
            if (data.IsAuth) {
                dispatch(setAdminOrgData(data.AdminOrgs));
            }

            navigation.navigate(data.IsAuth ? (data.AdminOrgs.length ? 'AppWithAdmin' : 'AppNoAdmin') : 'Auth');
        });
};

export const setAdminOrgData = adminOrgs => dispatch => {
    // Look for the first org in AdminOrgs that the user is a member of

    dispatch({
        type: C.SET_ADMIN_ORG_DATA,
        payload: { adminOrgs }
    });

    for (let a = 0; a < adminOrgs.length; a++) {
        if (adminOrgs[a].AdminDefault) {
            dispatch({
                type: C.SET_ADMIN_ORG_DATA,
                payload: {
                    orgId: adminOrgs[a].OrgId,
                    orgName: adminOrgs[a].OrgName,
                    defaultTZ: adminOrgs[a].DefaultTZ
                }
            });
        }
    }
};

export const signIn = navigation => (dispatch, getState) => {
    const state = getState();

    dispatch({
        type: C.SET_SIGN_IN_DATA,
        payload: {
            signingIn: true,
            errorMsg: ''
        }
    });

    let formData = new FormData();
    formData.append('_username', state.sign_in.username);
    formData.append('_password', state.sign_in.password);
    formData.append('_remember_me', 'on');
    formData.append('applogin', 'true');

    let cookie = null;
    fetchUrl(C.URL_SIGNIN, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            cookie = response.headers.get('set-cookie');
            return response.json();
        })
        .then(data => {
            dispatch({
                type: C.SET_SIGN_IN_DATA,
                payload: { signingIn: false }
            });
            if (data.Success) {
                dispatch(setAdminOrgData(data.AdminOrgs));
                CookieManager.clearAll().then(() => {
                    AsyncStorage.setItem('AuthCookie', cookie).then(() => {
                        navigation.navigate(data.AdminOrgs.length ? 'AppWithAdmin' : 'AppNoAdmin');
                    })
                });
            } else {
                dispatch({
                    type: C.SET_SIGN_IN_DATA,
                    payload: { errorMsg: data.Error }
                });
            }
        });
};
