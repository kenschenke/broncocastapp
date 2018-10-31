import C from '../contants';
import React, { Component } from 'react';
import { Spinner } from '../components';
import { View } from 'react-native';
import { fetchUrl } from '../helpers';

export class AuthLoading extends Component {
    static navigationOptions = {
        title: 'AuthLoading'
    };

    componentDidMount() {
        fetchUrl(C.URL_ISAUTH)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ loading: false, isAuth: responseJson.IsAuth });
                this.props.navigation.navigate(responseJson.IsAuth ? 'App' : 'Auth');
            });
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Spinner label="Signing In"/>
            </View>
        );
    }
}
