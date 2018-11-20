import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapRegister1Props, mapRegister1Dispatch } from '../maps/Register1.map';
import { connect } from 'react-redux';
import { Alert, Switch, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from '../components';

class Register1Ui extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailHelpText: '',
            emailValidContext: 'neutral',
            passwordHelpText: '',
            passwordValidContext: 'neutral',
            showPassword: false
        };
    }

    emailChanged = email => {
        this.setState({ emailHelpText: '', emailValidContext: 'neutral' });
        this.props.emailChanged(email);
    };

    isEmailValid = () => {
        const email = this.props.email.trim();
        return email.length && email.search(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/) >= 0;
    };

    isPasswordValid = () => {
        return this.props.password.trim().length >= 5;
    };

    nextPressed = () => {
        this.validateEmail();
        if (!this.isEmailValid()) {
            Alert.alert('Problem', 'A valid email address is required');
            return;
        }

        this.validatePassword();
        if (!this.isPasswordValid()) {
            Alert.alert('Problem', 'A valid password is required');
            return;
        }

        this.props.navigation.navigate('Register2');
    };

    passwordChanged = password => {
        this.setState({ passwordHelpText: '', passwordValidContext: 'neutral' });
        this.props.passwordChanged(password);
    };

    validateEmail = () => {
        if (!this.isEmailValid()) {
            this.setState({ emailValidContext: 'error', emailHelpText: 'Email address not valid' });
        }
    };

    validatePassword = () => {
        if (!this.isPasswordValid()) {
            this.setState({
                passwordValidContext: 'error',
                passwordHelpText: 'Password must be at least 5 characters long'
            });
        }
    };

    render() {
        const {
            ShowPasswordContainerStyle,
            TopLevelStyle
        } = styles;

        return (
            <View style={TopLevelStyle}>

                <Input
                    label="Email Address"
                    placeholder="Enter email address"
                    keyboardType="email-address"
                    onChangeText={this.emailChanged}
                    validContext={this.state.emailValidContext}
                    value={this.props.email}
                    onIdleTimeout={this.validateEmail}
                    helpText={this.state.emailHelpText}
                />

                <Input
                    label="Password"
                    placeholder="Type password here"
                    value={this.props.password}
                    secureTextEntry={!this.state.showPassword}
                    onChangeText={this.passwordChanged}
                    onIdleTimeout={this.validatePassword}
                    validContext={this.state.passwordValidContext}
                    helpText={this.state.passwordHelpText}
                />

                <View style={ShowPasswordContainerStyle}>
                    <Switch
                        value={this.state.showPassword}
                        onValueChange={() => this.setState({ showPassword: !this.state.showPassword })}
                    />
                    <Text>Show password</Text>
                </View>

                <Button
                    borderRadius={5}
                    color={'#fff'}
                    backgroundColor={'#006fce'}
                    containerViewStyle={{ flex: 1 }}
                    title="Next"
                    fontWeight="600"
                    onPress={this.nextPressed}
                />

            </View>
        );
    }
}

const styles = {
    ShowPasswordContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },

    TopLevelStyle: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    }
};

Register1Ui.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,

    emailChanged: PropTypes.func.isRequired,
    passwordChanged: PropTypes.func.isRequired
};

export const Register1 = connect(mapRegister1Props, mapRegister1Dispatch)(Register1Ui);

Register1.navigationOptions = {
    title: 'Registration'
};
