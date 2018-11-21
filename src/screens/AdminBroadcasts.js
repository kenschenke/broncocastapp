import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapAdminBroadcastsProps, mapAdminBroadcastsDispatch } from '../maps/AdminBroadcasts.map';
import { connect } from 'react-redux';
import { FlatList, Picker, Text, TouchableOpacity, View} from 'react-native';
import { Button } from 'react-native-elements';
import { Card, Spinner } from '../components';

class AdminBroadcastsUi extends Component {
    constructor(props) {
        super(props);

        this.state = { adminOrgId: 0 };
    }

    componentDidMount() {
        this.props.init();
        this.props.adminOrgChanged();
    }

    componentDidUpdate() {
        if (this.props.adminOrgId !== this.state.adminOrgId) {
            this.props.adminOrgChanged();
            this.setState({ adminOrgId: this.props.adminOrgId });
        }
    }

    renderAdminOrgHeader() {
        const items = this.props.adminOrgs.map(org => {
            return <Picker.Item key={org.OrgId} label={org.OrgName} value={org.OrgId}/>;
        });

        return (
            <Picker selectedValue={this.props.adminOrgId} onValueChange={this.props.setOrgId}>
                {items}
            </Picker>
        );
    }

    renderBroadcastItem = ({item}) => {
        const { ShortMsgStyle } = styles;

        return (
            <TouchableOpacity onPress={() => this.props.showBroadcast(item.BroadcastId, this.props.navigation)}>
                <Card>
                    <Text>{item.Time} ({item.IsDelivered ? 'Delivered' : 'Scheduled'})</Text>
                    <Text numberOfLines={2} style={ShortMsgStyle}>{item.ShortMsg}</Text>
                </Card>
            </TouchableOpacity>
        );
    };

    render() {
        const {
            BroadcastListStyle,
            ContainerStyle,
            ErrorMsgStyle
        } = styles;

        if (this.props.fetching) {
            return (
                <View style={ContainerStyle}>
                    <Spinner label="Loading Broadcasts"/>
                </View>
            );
        } else if (this.props.errorMsg.length) {
            return (
                <View style={ContainerStyle}>
                    <Text style={ErrorMsgStyle}>{this.props.errorMsg}</Text>
                </View>
            );
        }

        return (
            <View style={ContainerStyle}>
                {this.renderAdminOrgHeader()}

                <Button
                    borderRadius={5}
                    backgroundColor="#006fce"
                    onPress={() => this.props.newBroadcast(this.props.navigation)}
                    title="New Broadcast"
                    fontWeight="600"
                />

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

AdminBroadcastsUi.propTypes = {
    adminOrgId: PropTypes.number.isRequired,
    adminOrgs: PropTypes.array.isRequired,
    broadcasts: PropTypes.array.isRequired,
    errorMsg: PropTypes.string.isRequired,
    fetching: PropTypes.bool.isRequired,

    adminOrgChanged: PropTypes.func.isRequired,
    init: PropTypes.func.isRequired,
    newBroadcast: PropTypes.func.isRequired,
    setOrgId: PropTypes.func.isRequired,
    showBroadcast: PropTypes.func.isRequired
};

export const AdminBroadcasts = connect(mapAdminBroadcastsProps, mapAdminBroadcastsDispatch)(AdminBroadcastsUi);
