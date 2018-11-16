import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapForgotPasswordProps, mapForgotPasswordDispatch } from '../maps/ForgotPassword.map';
import { connect } from 'react-redux';
import { Alert, Text, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Button } from 'react-native-elements';
import { Input } from '../components';

class ForgotPasswordUi extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            emailContext: 'neutral',
            emailHelpText: '',
            phone: '',
            phoneContext: 'neutral',
            phoneHelpText: ''
        };
    }

    emailChanged = email => {
        this.setState({ email, emailContext: 'neutral', emailHelpText: '' });
    };

    findAccountPressed = () => {
        const email = this.state.email.trim();
        const phone = this.state.phone.replace(/[^0-9]/g, '');
        const { emailContext, phoneContext } = this.state;

        this.validateEmail();
        this.validatePhone();

        if (email.length && emailContext === 'neutral' && phone.length && phoneContext === 'neutral') {
            Alert.alert('One Only', 'Please enter only a phone number or an email address');
            return;
        }

        let contactToSend = '';
        if (email.length && emailContext === 'neutral') {
            contactToSend = email;
        } else if (phone.length && phoneContext === 'neutral') {
            contactToSend = phone;
        } else {
            Alert.alert('Missing Info', 'Please enter a phone number or email address');
            return;
        }

        this.props.findAccount(contactToSend, this.props.navigation);
    };

    phoneChanged = phone => {
        this.setState({ phone, phoneContext: 'neutral', phoneHelpText: '' });
    };

    validateEmail = () => {
        const email = this.state.email.trim();
        if (email.length && email.search(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/) < 0) {
            this.setState({ emailContext: 'error', emailHelpText: 'Email address not valid' });
        }
    };

    validatePhone = () => {
        const phone = this.state.phone.replace(/[^0-9]/g, '');
        if (phone.length && phone.length !== 10) {
            this.setState({ phoneContext: 'error', phoneHelpText: 'Phone number must be 10 digits' });
        }
    };

    renderErrorMsg = () => {
        if (!this.props.errorMsg.length) {
            return null;
        }

        return (
            <View style={styles.ErrorMsgContainerStyle}>
                <Text style={styles.ErrorMsgLabelStyle}>{this.props.errorMsg}</Text>
            </View>
        );
    };

    render() {
        const {
            OrContainerStyle,
            OrLabelStyle,
            TopLevelStyle
        } = styles;

        return (
            <View style={TopLevelStyle}>
                <Input
                    label="Email Address"
                    placeholder="Enter email address"
                    keyboardType="email-address"
                    onChangeText={this.emailChanged}
                    validContext={this.state.emailContext}
                    value={this.state.email}
                    onIdleTimeout={this.validateEmail}
                    helpText={this.state.emailHelpText}
                />

                <View style={OrContainerStyle}>
                    <Text style={OrLabelStyle}>Or</Text>
                </View>

                <Input
                    label="Phone Number"
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    inputComponent={TextInputMask}
                    type="custom"
                    validContext={this.state.phoneContext}
                    options={{ mask: '(999) 999-9999' }}
                    onChangeText={this.phoneChanged}
                    value={this.state.phone}
                    onIdleTimeout={this.validatePhone}
                    helpText={this.state.phoneHelpText}
                />

                {this.renderErrorMsg()}

                <Button
                    borderRadius={5}
                    color={this.props.findingAccount ? '#999' : '#fff'}
                    backgroundColor={this.props.findingAccount ? '#ccc' : '#006fce'}
                    disabled={this.props.findingAccount}
                    containerViewStyle={{ flex: 1 }}
                    title={this.props.findingAccount ? 'Finding Account' : 'Find Account'}
                    fontWeight="600"
                    onPress={this.findAccountPressed}
                    loading={this.props.findingAccount}
                    loadingRight={true}
                />
            </View>
        );
    }
}

const styles = {
    ErrorMsgContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    },

    ErrorMsgLabelStyle: {
        fontSize: 18,
        color: '#cf272a'
    },

    OrContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    OrLabelStyle: {
        fontSize: 32
    },

    TopLevelStyle: {
        flex: 1,
        backgroundColor: '#fff'
    }
};

ForgotPasswordUi.propTypes = {
    errorMsg: PropTypes.string.isRequired,
    findingAccount: PropTypes.bool.isRequired,

    findAccount: PropTypes.func.isRequired,
};

export const ForgotPassword = connect(mapForgotPasswordProps, mapForgotPasswordDispatch)(ForgotPasswordUi);

ForgotPassword.navigationOptions = {
    title: 'Forgot Password'
};
