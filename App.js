import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './src/reducers';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import {
    AuthLoading,
    AdminGroupDetail,
    AdminGroupMembers,
    AdminGroupsNonMembers,
    AdminNewBroadcast,
    AdminNewGroup,
    AdminRenameGroup,
    AdminUserDetail,
    BroadcastDetail,
    ForgotPassword,
    Main,
    MainNoAdmin,
    ProfileContactDetail,
    Register1,
    Register2,
    ResetPassword,
    ResetPasswordDone,
    SignIn
} from "./src/screens";
import initialState from './src/initialState.json';

const AppRoutesBase = {
    ContactDetail: ProfileContactDetail,
    BroadcastDetail: BroadcastDetail,
    AdminUserDetail: AdminUserDetail,
    AdminNewBroadcast: AdminNewBroadcast,
    AdminNewGroup: AdminNewGroup,
    AdminGroupDetail: AdminGroupDetail,
    AdminGroupMembers: AdminGroupMembers,
    AdminGroupNonMembers: AdminGroupsNonMembers,
    AdminRenameGroup: AdminRenameGroup
};

const AppStackWithAdmin = createStackNavigator({
    Main: Main,
    ...AppRoutesBase
});

const AppStackNoAdmin = createStackNavigator({
    Main: MainNoAdmin,
    ...AppRoutesBase
});

const AuthStack = createStackNavigator(
    {
        SignIn: SignIn,
        ForgotPassword: ForgotPassword,
        ResetPassword: ResetPassword,
        ResetPasswordDone: ResetPasswordDone,
        Register1: Register1,
        Register2: Register2
    }
);

const RootStack = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        AppWithAdmin: AppStackWithAdmin,
        AppNoAdmin: AppStackNoAdmin,
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
