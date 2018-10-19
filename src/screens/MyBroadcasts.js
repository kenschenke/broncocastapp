import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class MyBroadcasts extends Component {
    render() {
        const { navigation } = this.props;

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>My Broadcasts</Text>
            </View>
        );
    }
}
