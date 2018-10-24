import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const Card = (props) => {
    const { containerStyle, backgroundStyle } = styles;
    let cardStyles = { ...containerStyle };
    if (!props.transparent) {
        cardStyles = { ...cardStyles, ...backgroundStyle };
    }

    return (
        <View style={cardStyles}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 0,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    },

    backgroundStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1
    }
};

Card.propTypes = {
    transparent: PropTypes.bool.isRequired
};

Card.defaultProps = {
    transparent: false
};

export { Card };
