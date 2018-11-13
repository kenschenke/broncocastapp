import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './src/reducers';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import {
    AuthLoading,
    AdminGroupDetail,
    AdminNewGroup,
    AdminUserDetail,
    BroadcastDetail,
    ForgotPassword,
    Main,
    ProfileContactDetail,
    Register,
    ResetPassword,
    SignIn
} from "./src/screens";
import initialState from './src/initialState.json';

const AppStack = createStackNavigator(
    {
        Main: Main,
        ContactDetail: ProfileContactDetail,
        BroadcastDetail: BroadcastDetail,
        AdminUserDetail: AdminUserDetail,
        AdminNewGroup: AdminNewGroup,
        AdminGroupDetail: AdminGroupDetail
    }
);

const AuthStack = createStackNavigator(
    {
        SignIn: SignIn,
        ForgotPassword: ForgotPassword,
        ResetPassword: ResetPassword,
        Register: Register
    }
);

const RootStack = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        App: AppStack,
        Auth: AuthStack
    },
    {
        initialRouteName: 'AuthLoading'
    }
);

export default class App extends Component {
    render() {
        return (
            <Provider store={createStore(appReducer, initialState, applyMiddleware(thunk))}>
                <RootStack/>
            </Provider>
        );
    }
}
