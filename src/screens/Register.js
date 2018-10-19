import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class Register extends Component {
    static navigationOptions = {
        title: 'Register'
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Register</Text>
            </View>
        );
    }
}
