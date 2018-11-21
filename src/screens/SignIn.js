import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapSignInProps, mapSignInDispatch } from '../maps/SignIn.map';
import { Input, Spinner } from '../components';
import { Button } from 'react-native-elements';
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
            return <Spinner label="Signing In"/>;
        } else {
            return (
                <View>
                    <Button
                        borderRadius={5}
                        backgroundColor="#006fce"
                        fontWeight="600"
                        onPress={this.signInPressed}
                        title="Sign In"
                    />

                    <View style={styles.ButtonRowStyle}>
                        <Button
                            borderRadius={5}
                            containerViewStyle={{ flex: 1 }}
                            backgroundColor="#006fce"
                            fontWeight="600"
                            title="Register"
                            onPress={() => this.props.registerPressed(this.props.navigation)}
                        />

                        <Button
                            borderRadius={5}
                            containerViewStyle={{ flex: 1 }}
                            backgroundColor="#006fce"
                            fontWeight="600"
                            title="Forgot Password"
                            onPress={() => this.props.navigation.navigate('ForgotPassword')}
                        />
                    </View>
                </View>
            );
        }
    }

    renderErrorMsg() {
        const { ErrorMsgContainerStyle, ErrorMsgLabelStyle } = styles;

        if (this.props.errorMsg.length) {
            return (
                <View style={ErrorMsgContainerStyle}>
                    <Text style={ErrorMsgLabelStyle}>{this.props.errorMsg}</Text>
                </View>
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
            <View style={styles.TopLevelStyle}>
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

                {this.renderButtons()}

            </View>
        );
    }
}

const styles = {
    ButtonRowStyle: {
        flexDirection: 'row',
        marginTop: 10
    },

    ErrorMsgContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    },

    ErrorMsgLabelStyle: {
        color: '#f00',
        fontSize: 18
    },

    TopLevelStyle: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff'
    }
};

SignInUi.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    signingIn: PropTypes.bool.isRequired,

    init: PropTypes.func.isRequired,
    registerPressed: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    usernameChanged: PropTypes.func.isRequired,
    passwordChanged: PropTypes.func.isRequired
};

export const SignIn = connect(mapSignInProps, mapSignInDispatch)(SignInUi);
