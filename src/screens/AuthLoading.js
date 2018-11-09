import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '../components';
import { View } from 'react-native';
import { checkAuth } from "../actions/signInActions";

const mapDispatch = dispatch => {
    return {
        checkAuth(navigation) {
            dispatch(checkAuth(navigation));
        }
    };
};

class AuthLoadingUi extends Component {
    static navigationOptions = {
        title: 'AuthLoading'
    };

    componentDidMount() {
        this.props.checkAuth(this.props.navigation);
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Spinner label="Signing In"/>
            </View>
        );
    }
}

AuthLoadingUi.propTypes = {
    checkAuth: PropTypes.func.isRequired
};

export const AuthLoading = connect(null, mapDispatch)(AuthLoadingUi);
