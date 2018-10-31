import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapSignInProps, mapSignInDispatch } from '../maps/SignIn.map';
import { Button, Card, CardSection, Input, Spinner } from '../components';
import { Text, View } from 'react-native';

class SignInUi extends Component {
    static navigationOptions = {
        title: 'Sign In'
    };

    componentDidMount() {
        this.props.init();
    }

    renderButtons() {
        if (this.props.signingIn) {
            return (
                <CardSection showBorder={false} transparent={true}>
                    <Spinner label="Signing In"/>
                </CardSection>
            );
        } else {
            return (
                <View>
                    <CardSection showBorder={false} transparent={true}>
                        <Button onPress={this.signInPressed}>Sign In</Button>
                    </CardSection>

                    <CardSection showBorder={false} transparent={true}>
                        <Button onPress={() => this.props.navigation.navigate('Register')}>Register</Button>
                        <Button onPress={() => this.props.navigation.navigate('ForgotPassword')}>Forgot Password</Button>
                    </CardSection>
                </View>
            );
        }
    }

    renderErrorMsg() {
        if (this.props.errorMsg.length) {
            return (
                <CardSection showBorder={false}>
                    <Text style={{color: '#f00'}}>{this.props.errorMsg}</Text>
                </CardSection>
            );
        } else {
            return null;
        }
    }

    signInPressed = () => {
        this.props.signIn(this.props.navigation);
    };

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff' }}>
                <Input
                    label="Email or phone number (digits only)"
                    value={this.props.username}
                    onChangeText={username => this.props.usernameChanged(username)}
                    keyboardType="email-address"
                />

                <Input
                    secureTextEntry
                    label="Password"
                    value={this.props.password}
                    onChangeText={password => this.props.passwordChanged(password)}
                />

                {this.renderErrorMsg()}

                <Card transparent={true}>
                    {this.renderButtons()}
                </Card>
            </View>
        );
    }
}

SignInUi.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    signingIn: PropTypes.bool.isRequired,

    init: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    usernameChanged: PropTypes.func.isRequired,
    passwordChanged: PropTypes.func.isRequired
};

export const SignIn = connect(mapSignInProps, mapSignInDispatch)(SignInUi);
