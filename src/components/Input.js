import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, Text } from 'react-native';
import _ from 'lodash';

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = { contents: '' };
        if (this.props.onIdleTimeout && this.props.idleTimeout) {
            this.idleHandler = _.debounce(this.props.onIdleTimeout, this.props.idleTimeout);
        } else {
            this.idleHandler = null;
        }
    }

    onChange = text => {
        if (this.props.onChangeText) {
            this.props.onChangeText(text);
        }

        if (this.idleHandler) {
            this.idleHandler();
        }

        this.setState({ contents: text })
    };

    render() {
        const {
            containerStyle,
            errorColor,
            helpTextStyle,
            inputStyle,
            labelStyle,
            neutralColor,
            successColor,
            validationIconStyle
        } = styles;

        let color;
        switch (this.props.validContext) {
            case 'error':
                color = errorColor;
                break;

            case 'success':
                color = successColor;
                break;

            case 'neutral':
            default:
                color = neutralColor;
                break;
        }

        let inputProps = {};
        for (let prop in this.props) {
            if (this.props.hasOwnProperty(prop)) {
                inputProps[prop] = this.props[prop];
            }
        }
        delete inputProps.validContext;
        delete inputProps.label;
        delete inputProps.helpText;
        delete inputProps.onChangeText;
        delete inputProps.inputComponent;

        const input = React.createElement(
            this.props.inputComponent ? this.props.inputComponent : TextInput,
            {
                style: { ...inputStyle, borderColor: color },
                onChangeText: this.onChange,
                ...inputProps
            }
        );

        return (
            <View style={containerStyle}>
                <Text style={{ ...labelStyle, color }}>{this.props.label}</Text>
                <View style={{ flexDirection: 'row' }}>
                    {input}
                    <View style={{ ...validationIconStyle, color }}/>
                </View>
                <Text style={{ ...helpTextStyle, color }}>{this.props.helpText}</Text>
            </View>
        );
    }
}

const styles = {
    errorColor: '#c72a27',
    neutralColor: '#aaa',
    successColor: '#009e0f',

    containerStyle: {
        // backgroundColor: '#fff',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 10,
        flexDirection: 'column'
    },

    helpTextStyle: {
        fontSize: 16,
        marginTop: 5
    },

    inputStyle: {
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
        flexGrow: 1
    },

    labelStyle: {
        fontSize: 16,
        marginBottom: 5
    },

    validationIconStyle: {
        paddingLeft: 10,
        paddingTop: 5,
        width: 30,
    }
};

Input.propTypes = {
    helpText: PropTypes.string.isRequired,
    idleTimeout: PropTypes.number.isRequired,
    inputComponent: PropTypes.func,
    label: PropTypes.string.isRequired,
    onChangeText: PropTypes.func,
    onIdleTimeout: PropTypes.func,
    validContext: PropTypes.string.isRequired
};

Input.defaultProps = {
    helpText: '',
    idleTimeout: 2000,
    label: '',
    validContext: 'neutral'
};

export { Input };
