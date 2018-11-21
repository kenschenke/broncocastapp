import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const Spinner = ({ label, size }) => {
    const {
        spinnerContainerStyle,
        spinnerStyle,
        spinnerTextContainerStyle,
        spinnerTextStyle,
        topLevelStyle
    } = styles;

    return (
        <View style={topLevelStyle}>
            <View style={spinnerContainerStyle}>
                <View style={spinnerStyle}>
                    <ActivityIndicator size={size || 'large'} />
                </View>
            </View>
            <View style={spinnerTextContainerStyle}>
                <Text style={spinnerTextStyle}>{label}</Text>
            </View>
        </View>
    );
};

const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    spinnerContainerStyle: {
        padding: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
    },

    spinnerTextContainerStyle: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    spinnerTextStyle: {
        fontSize: 18
    },

    topLevelStyle: {
        flex: 1,
        padding: 5,
        flexDirection: 'column'
    }
};

export { Spinner };
