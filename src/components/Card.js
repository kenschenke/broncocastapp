import React from 'react';
import { View } from 'react-native';

export const Card = props => {
    return (
        <View style={styles.ContainerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    ContainerStyle: {
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
        borderRadius: 6,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1
    }
};

