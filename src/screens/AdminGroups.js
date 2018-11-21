import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapAdminGroupsProps, mapAdminGroupsDispatch } from '../maps/AdminGroups.map';
import { connect } from 'react-redux';
import { FlatList, Picker, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Card, Spinner } from '../components';

class AdminGroupsUi extends Component {
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

    renderGroupItem = ({item}) => {
        const { GroupNameStyle } = styles;

        return (
            <TouchableOpacity onPress={() => this.props.showGroupDetail(item.GroupId, item.GroupName, this.props.navigation)}>
                <Card>
                    <Text style={GroupNameStyle}>{item.GroupName}</Text>
                </Card>
            </TouchableOpacity>
        );
    };

    render() {
        const {
            ContainerStyle,
            ErrorMsgStyle,
            GroupListStyle
        } = styles;

        if (this.props.fetching) {
            return (
                <View style={ContainerStyle}>
                    <Spinner label="Loading Groups"/>
                </View>
            );
        } else if (this.props.errorMsg) {
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
                    onPress={() => this.props.addNewGroup(this.props.navigation)}
                    title="Add Group"
                    fontWeight="600"
                />

                <FlatList
                    data={this.props.groups}
                    renderItem={this.renderGroupItem}
                    style={GroupListStyle}
                    keyExtractor={item => item.GroupId.toString()}
                />
            </View>
        );
    }
}

const styles = {
    ContainerStyle: {
        flex: 1,
        padding: 10
    },

    ErrorMsgStyle: {
        fontSize: 18,
        color: '#cf272a'
    },

    GroupListStyle: {
        marginTop: 10
    },

    GroupNameStyle: {
        fontSize: 18
    }
};

AdminGroupsUi.propTypes = {
    adminOrgId: PropTypes.number.isRequired,
    adminOrgs: PropTypes.array.isRequired,
    fetching: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
    groups: PropTypes.array.isRequired,

    addNewGroup: PropTypes.func.isRequired,
    adminOrgChanged: PropTypes.func.isRequired,
    init: PropTypes.func.isRequired,
    setOrgId: PropTypes.func.isRequired,
    showGroupDetail: PropTypes.func.isRequired
};

export const AdminGroups = connect(mapAdminGroupsProps, mapAdminGroupsDispatch)(AdminGroupsUi);
