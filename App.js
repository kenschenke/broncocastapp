import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './src/reducers';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { AuthLoading, ForgotPassword, Main, ProfileContactDetail, Register, ResetPassword, SignIn } from "./src/screens";
import { FlexBoxPlayground } from './src/screens/FlexBoxPlayground';
import initialState from './src/initialState.json';

const AppStack = createStackNavigator(
    {
        Main: Main,
        ContactDetail: ProfileContactDetail
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
        Auth: AuthStack,
        FlexBoxPlayground: FlexBoxPlayground
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
