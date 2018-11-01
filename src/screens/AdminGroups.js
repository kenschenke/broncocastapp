import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class AdminGroups extends Component {
    render() {
        const { navigation } = this.props;

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Admin Groups</Text>
            </View>
        );
    }
}
