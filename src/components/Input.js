import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, Text } from 'react-native';

const Input = props => {
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
    switch (props.validContext) {
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

    return (
        <View style={containerStyle}>
            <Text style={{ ...labelStyle, color }}>{props.label}</Text>
            <View style={{ flexDirection: 'row' }}>
                <TextInput style={{ ...inputStyle, borderColor: color }} {...props}/>
                <View style={{ ...validationIconStyle, color }}/>
            </View>
            <Text style={{ ...helpTextStyle, color }}>{props.helpText}</Text>
        </View>
    );
};

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
    label: PropTypes.string.isRequired,
    validContext: PropTypes.string.isRequired,
};

Input.defaultProps = {
    helpText: '',
    label: '',
    validContext: 'neutral'
};

export { Input };
