import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class AdminBroadcasts extends Component {
    render() {
        const { navigation } = this.props;

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Admin Broadcasts</Text>
            </View>
        );
    }
}
