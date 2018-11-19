import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export const ResetPasswordDone = props => {
    const {
        MessageContainerStyle,
        MessageLabelStyle,
        TopLevelStyle
    } = styles;

    return (
        <View style={TopLevelStyle}>
            <View style={MessageContainerStyle}>
                <Text style={MessageLabelStyle}>Your password has been reset</Text>
            </View>

            <Button
                borderRadius={5}
                color="#fff"
                backgroundColor="#006fce"
                title="Continue"
                fontWeight="600"
                onPress={() => props.navigation.popToTop()}
            />
        </View>
    );
};

const styles = {
    MessageContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    MessageLabelStyle: {
        fontSize: 18,
        marginTop: 25,
        marginBottom: 25
    },

    TopLevelStyle: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    }
};

ResetPasswordDone.navigationOptions = {
    title: 'Password Reset'
};
