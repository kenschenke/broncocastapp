import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapProfileContactDetailProps, mapProfileContactDetailDispatch } from '../maps/ProfileContactDetail.map';
import { connect } from 'react-redux';
import { Alert, TextInput, View } from 'react-native';
import { Input } from '../components';
import { Button } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';

class ProfileContactDetailUi extends Component {
    deletePressed = () => {
        Alert.alert(
            'Delete Contact',
            'Are you sure?',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', style: 'destructive', onPress: () => this.props.deletePressed(this.props.navigation) }
            ]
        );
    };

    render() {
        const { buttonRowStyle, containerStyle } = styles;
        const {
            contact,
            contactChanged,
            helpText,
            isPhone,
            isValid,
            validateContact
        } = this.props;

        return (
            <View style={containerStyle}>
                <Input
                    label={isPhone ? 'Phone number' : 'Email address'}
                    value={contact}
                    onChangeText={contactChanged}
                    helpText={helpText}
                    keyboardType={isPhone ? 'phone-pad' : 'email-address'}
                    onIdleTimeout={validateContact}
                    inputComponent={isPhone ? TextInputMask : TextInput}
                    type="custom"
                    validContext={isValid ? 'neutral' : 'error'}
                    options={{ mask: '(999) 999-9999' }}
                />

                <View style={buttonRowStyle}>
                    <Button
                        borderRadius={5}
                        containerViewStyle={{ flex: 1 }}
                        backgroundColor="#006fce"
                        fontWeight="600"
                        title="Delete Contact"
                        onPress={this.deletePressed}
                    />

                    <Button
                        borderRadius={5}
                        containerViewStyle={{ flex: 1 }}
                        backgroundColor="#006fce"
                        fontWeight="600"
                        title="Send Test"
                        onPress={this.props.testPressed}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },

    buttonRowStyle: {
        // flex: 1,
        flexDirection: 'row'
    }
};

ProfileContactDetailUi.propTypes = {
    contact: PropTypes.string.isRequired,
    helpText: PropTypes.string.isRequired,
    isPhone: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    saved: PropTypes.bool.isRequired,
    updating: PropTypes.bool.isRequired,

    contactChanged: PropTypes.func.isRequired,
    deletePressed: PropTypes.func.isRequired,
    testPressed: PropTypes.func.isRequired,
    validateContact: PropTypes.func.isRequired
};

export const ProfileContactDetail =
    connect(mapProfileContactDetailProps, mapProfileContactDetailDispatch)(ProfileContactDetailUi);

ProfileContactDetail.navigationOptions = {
    title: 'Contact Details'
};
