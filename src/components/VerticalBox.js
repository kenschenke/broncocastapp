import React from 'react';
import { View } from 'react-native';

const VerticalBox = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        padding: 5,
        flexDirection: 'column'
    }
};

export { VerticalBox };
