import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const FlexBoxPlayground = () => {
    const {
        errorColor,
        helpTextStyle,
        inputStyle,
        labelStyle,
        neutralColor,
        outerStyle,
        rowStyle,
        successColor,
        validationIconStyle
    } = styles;

    return (
        <View style={outerStyle}>
            <View style={rowStyle}>
                <Text style={{ ...labelStyle, color: successColor }}>Full Name</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={{ ...inputStyle, borderColor: successColor }} placeholder="John Doe"/>
                    <Ionicons name="md-checkmark" size={30} style={{ ...validationIconStyle, color: successColor }}/>
                </View>
                <Text style={{ ...helpTextStyle, color: successColor }}>Looks good</Text>
            </View>
            <View style={rowStyle}>
                <Text style={{ ...labelStyle, color: errorColor }}>Email</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={{ ...inputStyle, borderColor: errorColor }} placeholder="JohnDoe@example.com"/>
                    <Ionicons name="md-close" size={30} style={{ ...validationIconStyle, color: errorColor }}/>
                </View>
                <Text style={{ ...helpTextStyle, color: errorColor }}>Valid email required</Text>
            </View>
            <View style={rowStyle}>
                <Text style={{ ...labelStyle, color: neutralColor }}>Password</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput style={{ ...inputStyle, borderColor: neutralColor }} placeholder="password"/>
                    <View style={validationIconStyle}/>
                </View>
                <Text style={{ ...helpTextStyle, color: neutralColor }}>Passwords must contain at least 5 characters a letter and a number</Text>
            </View>
        </View>
    );
};

const styles = {
    outerStyle: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
    },

    rowStyle: {
        backgroundColor: '#fff',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,
        paddingBottom: 10,
        flexDirection: 'column'
    },

    errorColor: '#c72a27',
    neutralColor: '#aaa',
    successColor: '#009e0f',

    labelStyle: {
        fontSize: 16,
        marginBottom: 5

    },

    inputStyle: {
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 4,
        padding: 5,
        flexGrow: 1
    },

    helpTextStyle: {
        fontSize: 16,
        marginTop: 5
    },

    validationIconStyle: {
        paddingLeft: 10,
        paddingTop: 5,
        width: 30,
    }
};
