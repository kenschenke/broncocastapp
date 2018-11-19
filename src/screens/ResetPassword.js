import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapResetPasswordProps, mapResetPasswordDispatch } from '../maps/ResetPassword.map';
import { connect } from 'react-redux';
import { Alert, Switch, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from '../components';

class ResetPasswordUi extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPassword: '',
            newPasswordHelpText: '',
            newPasswordValidContext: 'neutral',
            resetCode: '',
            resetCodeHelpText: '',
            resetCodeValidContext: 'neutral',
            showPassword: false
        };
    }

    isNewPasswordValid = () => {
        return this.state.newPassword.length >= 5;
    };

    isResetCodeValid = () => {
        return this.state.resetCode.replace(/[^0-9]/g, '').length === 4;
    };

    newPasswordChanged = newPassword => {
        this.setState({
            newPassword,
            newPasswordValidContext: 'neutral',
            newPasswordHelpText: ''
        });
    };

    renderResetPasswordErrorMsg = () => {
        if (!this.props.resetPasswordErrorMsg.length) {
            return null;
        }

        return (
            <Text style={styles.ErrorMsgStyle}>{this.props.resetPasswordErrorMsg}</Text>
        );
    };

    renderSendCodeErrorMsg = () => {
        if (!this.props.sendCodeErrorMsg.length) {
            return null;
        }

        return (
            <Text style={styles.ErrorMsgStyle}>{this.props.sendCodeErrorMsg}</Text>
        );
    };

    resetCodeChanged = resetCode => {
        this.setState({
            resetCode,
            resetCodeValidContext: 'neutral',
            resetCodeHelpText: ''
        });
    };

    resetPasswordPressed = () => {
        if (!this.isResetCodeValid()) {
            Alert.alert('Problem', 'Please enter a valid reset code');
            return;
        }

            if (!this.isNewPasswordValid()) {
            Alert.alert('Problem', 'Please enter a valid password');
            return;
        }

        this.props.resetPasswordPressed(this.state.resetCode, this.state.newPassword, this.props.navigation);
    };

    validateNewPassword = () => {
        const valid = this.isNewPasswordValid();
        this.setState({
            newPasswordValidContext: valid ? 'neutral' : 'error',
            newPasswordHelpText: valid ? '' : 'Password must be at least 5 characters long'
        });
    };

    validateResetCode = () => {
        const valid = this.isResetCodeValid();
        this.setState({
            resetCodeValidContext: valid ? 'neutral' : 'error',
            resetCodeHelpText: valid ? '' : '4 digits required'
        });
    };

    render() {
        const {
            ShowPasswordContainerStyle,
            TopLevelStyle
        } = styles;

        return (
            <View style={TopLevelStyle}>
                <Text>Look for an email or text message with a code</Text>

                <Input
                    label="Reset Code"
                    placeholder="Type reset code here"
                    value={this.state.resetCode}
                    keyboardType={'phone-pad'}
                    onChangeText={resetCode => this.resetCodeChanged(resetCode)}
                    onIdleTimeout={this.validateResetCode}
                    validContext={this.state.resetCodeValidContext}
                    helpText={this.state.resetCodeHelpText}
                />

                <Input
                    label="New Password"
                    placeholder="Type new password here"
                    value={this.state.newPassword}
                    secureTextEntry={!this.state.showPassword}
                    onChangeText={newPassword => this.newPasswordChanged(newPassword)}
                    onIdleTimeout={this.validateNewPassword}
                    validContext={this.state.newPasswordValidContext}
                    helpText={this.state.newPasswordHelpText}
                />

                <View style={ShowPasswordContainerStyle}>
                    <Switch
                        value={this.state.showPassword}
                        onValueChange={() => this.setState({ showPassword: !this.state.showPassword })}
                    />
                    <Text>Show password</Text>
                </View>

                {this.renderResetPasswordErrorMsg()}

                <Button
                    borderRadius={5}
                    buttonStyle={{ marginTop: 10 }}
                    color={this.props.resettingPassword ? '#999' : '#fff'}
                    backgroundColor={this.props.resettingPassword ? '#ccc' : '#006fce'}
                    disabled={this.props.resettingPassword || this.props.sendingCode}
                    title={this.props.resettingPassword ? 'Resetting Password' : 'Reset Password'}
                    fontWeight="600"
                    onPress={this.resetPasswordPressed}
                    loading={this.props.resettingPassword}
                    loadingRight={true}
                />

                {this.renderSendCodeErrorMsg()}

                <Button
                    borderRadius={5}
                    buttonStyle={{ marginTop: 10 }}
                    color={this.props.sendingCode ? '#999' : '#fff'}
                    backgroundColor={this.props.sendingCode ? '#ccc' : '#006fce'}
                    disabled={this.props.resettingPassword || this.props.sendingCode}
                    title={this.props.sendingCode ? 'Sending Code' : 'Send Code Again'}
                    fontWeight="600"
                    onPress={this.props.sendCodePressed}
                    loading={this.props.sendingCode}
                    loadingRight={true}
                />
            </View>
        );
    }
}

const styles = {
    ErrorMsgStyle: {
        marginTop: 10,
        marginLeft: 35,
        fontSize: 18,
        color: '#cf272a'
    },

    TopLevelStyle: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },

    ShowPasswordContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    }
};

ResetPasswordUi.propTypes = {
    resetPasswordErrorMsg: PropTypes.string.isRequired,
    resettingPassword: PropTypes.bool.isRequired,
    sendCodeErrorMsg: PropTypes.string.isRequired,
    sendingCode: PropTypes.bool.isRequired,

    resetPasswordPressed: PropTypes.func.isRequired,
    sendCodePressed: PropTypes.func.isRequired
};

export const ResetPassword = connect(mapResetPasswordProps, mapResetPasswordDispatch)(ResetPasswordUi);

ResetPassword.navigationOptions = {
    title: 'Reset Password'
};
