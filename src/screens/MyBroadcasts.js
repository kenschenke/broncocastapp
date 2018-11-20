import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapMyBroadcastsProps, mapMyBroadcastsDispatch } from '../maps/MyBroadcasts.map';
import { connect } from 'react-redux';
import { Spinner } from '../components';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

class MyBroadcastsUi extends Component {
    componentDidMount() {
        this.props.init();
    }

    renderBroadcastItem = ({item}) => {
        const { BroadcastContainerStyle, ShortMsgStyle } = styles;

        return (
            <TouchableOpacity onPress={() => this.props.broadcastPressed(item.BroadcastId, this.props.navigation)}>
                <View style={BroadcastContainerStyle}>
                    <Text>{item.Delivered}</Text>
                    <Text numberOfLines={2} style={ShortMsgStyle}>{item.ShortMsg}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        if (this.props.fetching) {
            return (
                <View style={styles.ContainerStyle}>
                    <Spinner size="small" label="Retrieving Broadcasts"/>
                </View>
            );
        }

        if (this.props.errorMsg) {
            return (
                <View style={styles.ContainerStyle}>
                    <Text style={{ fontSize: 18, color: '#cf2a27'}}>
                        {this.props.errorMsg}
                    </Text>
                </View>
            );
        }

        const {
            BroadcastListStyle,
            ContainerStyle
        } = styles;

        return (
            <View style={ContainerStyle}>
                <FlatList
                    data={this.props.broadcasts}
                    renderItem={this.renderBroadcastItem}
                    style={BroadcastListStyle}
                    keyExtractor={item => item.BroadcastId.toString()}
                />
            </View>
        );
    }
}

const styles = {
    BroadcastContainerStyle: {
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
    },

    BroadcastListStyle: {
        marginTop: 10
    },

    ContainerStyle: {
        flex: 1,
        padding: 10
    },

    ErrorMsgStyle: {
        fontSize: 18,
        color: '#cf272a'
    },

    ShortMsgStyle: {
        fontSize: 16,
        marginTop: 10
    }
};

MyBroadcastsUi.propTypes = {
    broadcasts: PropTypes.array.isRequired,
    errorMsg: PropTypes.string.isRequired,
    fetching: PropTypes.bool.isRequired,

    broadcastPressed: PropTypes.func.isRequired,
    init: PropTypes.func.isRequired
};

export const MyBroadcasts = connect(mapMyBroadcastsProps, mapMyBroadcastsDispatch)(MyBroadcastsUi);
