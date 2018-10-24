import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const CardSection = (props) => {
    const { containerStyle, backgroundStyles, borderStyles } = styles;
    let cardStyle = { ...containerStyle };
    if (props.showBorder) {
        cardStyle = { ...cardStyle, ...borderStyles };
    }
    if (!props.transparent) {
        cardStyle = { ...cardStyle, ...backgroundStyles };
    }

    return (
        <View style={{ ...cardStyle, ...props.style }}>
            {props.children}
        </View>
    );
};

CardSection.propTypes = {
    showBorder: PropTypes.bool.isRequired,
    transparent: PropTypes.bool.isRequired
};

CardSection.defaultProps = {
    showBorder: true,
    transparent: false
};

const styles = {
    containerStyle: {
        padding: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
    },

    backgroundStyles: {
        backgroundColor: '#fff'
    },

    borderStyles: {
        borderBottomWidth: 1,
        borderColor: '#ddd'
    }
};

export { CardSection };
