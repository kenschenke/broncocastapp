import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { VerticalSection } from "./VerticalSection";

const Spinner = ({ label, size }) => {
    const { spinnerContainerStyle, spinnerStyle, spinnerTextContainerStyle, spinnerTextStyle } = styles;

    return (
        <View style={spinnerContainerStyle}>
            <VerticalSection>
                <View style={spinnerStyle}>
                    <ActivityIndicator size={size || 'large'} />
                </View>
            </VerticalSection>
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
        flex: 1,
        padding: 5,
        flexDirection: 'column'
    },

    spinnerTextContainerStyle: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    spinnerTextStyle: {
        fontSize: 18
    }
};

export { Spinner };
