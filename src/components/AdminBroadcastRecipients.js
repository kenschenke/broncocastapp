import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapAdminBroadcastRecipientsProps, mapAdminBroadcastRecipientsDispatch } from '../maps/AdminBroadcastRecipients.map';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native';
import { Spinner } from './Spinner';
import Icon from "react-native-vector-icons/MaterialIcons";
import _ from 'lodash';

class AdminBroadcastRecipientsUi extends Component {
    constructor(props) {
        super(props);

        this.state = { expanded: {} };
    }

    everyonePressed = () => {
        if (this.getEveryoneState() === 'full') {
            this.props.unselectEveryone();
        } else {
            this.props.selectEveryone();
        }
    };

    getEveryoneState = () => {
        let everyone = '';
        for (let group in this.props.groups) {
            if (this.props.groups.hasOwnProperty(group)) {
                const thisGroup = this.getGroupState(this.props.groups[group]);
                if (everyone === '') {
                    everyone = thisGroup;
                } else if (everyone === 'none') {
                    if (thisGroup !== 'none') {
                        everyone = 'partial';
                    }
                } else if (everyone === 'full') {
                    if (thisGroup !== 'full') {
                        everyone = 'partial';
                    }
                } else {
                    everyone = 'partial';
                }
            }
        }

        return everyone;
    };

    /**
     * Gets the selection state of the group of members
     * @param members
     * @returns 'full', 'partial', or 'none'
     */
    getGroupState = members => {
        let selected = 0;
        for (let i = 0; i < members.length; i++) {
            if (this.props.selected.indexOf(members[i].UserId) !== -1) {
                selected++;
            }
        }

        if (selected === 0) {
            return 'none';
        } else {
            return selected === members.length ? 'full' : 'partial';
        }
    };

    groupShowHidePressed = group => {
        const isExpanded = this.isGroupExpanded(group);
        let newExpanded = _.clone(this.state.expanded);
        newExpanded[group] = !isExpanded;
        this.setState({expanded: newExpanded});
    };

    groupCheckboxPressed = (members, groupState) => {
        const userIds = members.map(member => member.UserId);
        if (groupState === 'full') {
            this.props.unselectAllGroupMembers(userIds);
        } else {
            this.props.selectAllGroupMembers(userIds);
        }
    };

    isGroupExpanded = group => {
        return this.state.expanded.hasOwnProperty(group) && this.state.expanded[group];
    };

    renderGroups = () => {
        let groups = [];

        const {
            GroupHeaderLeftStyle,
            GroupHeaderStyle,
            LabelStyle,
            RecipientContainerStyle,
            ShowHideButtonContainerStyle,
            ShowHideButtonLabelStyle
        } = styles;

        for (let group in this.props.groups) {
            if (this.props.groups.hasOwnProperty(group)) {
                let groupIcon;
                const groupState = this.getGroupState(this.props.groups[group]);
                switch (groupState) {
                    case 'none': groupIcon = <Icon name="check-box-outline-blank" size={30}/>; break;
                    case 'partial': groupIcon = <Icon name="indeterminate-check-box" size={30}/>; break;
                    case 'full': groupIcon = <Icon name="check-box" size={30}/>; break;
                }

                let members = null;
                const isExpanded = this.isGroupExpanded(group);

                if (isExpanded) {
                    members = this.props.groups[group].map(member => {
                        const memberIcon = this.props.selected.indexOf(member.UserId) === -1 ?
                            <Icon name="check-box-outline-blank" size={30}/> :
                            <Icon name="check-box" size={30}/>;
                        return (
                            <View key={member.UserId} style={RecipientContainerStyle}>
                                <TouchableOpacity onPress={() => this.props.userPressed(member.UserId)}>
                                    {memberIcon}
                                </TouchableOpacity>
                                <Text style={LabelStyle}>{member.UserName}</Text>
                            </View>
                        );
                    });
                }

                groups.push(
                    <View key={group}>
                        <View style={GroupHeaderStyle}>
                            <View style={GroupHeaderLeftStyle}>
                                <TouchableOpacity onPress={() => this.groupCheckboxPressed(this.props.groups[group], groupState)}>
                                    {groupIcon}
                                </TouchableOpacity>
                                <Text style={LabelStyle}>{group}</Text>
                            </View>
                            <View style={ShowHideButtonContainerStyle}>
                                <TouchableOpacity onPress={() => this.groupShowHidePressed(group)}>
                                    <Text style={ShowHideButtonLabelStyle}>{isExpanded ? 'Hide' : 'Show'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {members}
                    </View>
                );
            }
        }

        return groups;
    };

    render() {
        const {
            EveryoneContainerStyle,
            ErrorMsgStyle,
            LabelStyle,
            MessageContainerStyle
        } = styles;

        if (this.props.fetching) {
            return (
                <View style={MessageContainerStyle}>
                    <Spinner label="Retrieving Groups"/>
                </View>
            );
        } else if (this.props.errorMsg.length) {
            return (
                <View style={MessageContainerStyle}>
                    <Text style={ErrorMsgStyle}>{this.props.errorMsg}</Text>
                </View>
            );
        }

        let everyoneIcon;
        switch (this.getEveryoneState()) {
            case 'none': everyoneIcon = <Icon name="check-box-outline-blank" size={30}/>; break;
            case 'partial': everyoneIcon = <Icon name="indeterminate-check-box" size={30}/>; break;
            case 'full': everyoneIcon = <Icon name="check-box" size={30}/>; break;
        }

        return (
            <View>
                <View style={EveryoneContainerStyle}>
                    <TouchableOpacity onPress={this.everyonePressed}>{everyoneIcon}</TouchableOpacity>
                    <Text style={LabelStyle}>Everyone ({this.props.selected.length} Selected)</Text>
                </View>

                {this.renderGroups()}
            </View>
        );
    }
}

const styles = {
    ErrorMsgStyle: {
        fontSize: 18,
        color: '#cf272a'
    },

    EveryoneContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    GroupHeaderStyle: {
        flexDirection: 'row',
        marginLeft: 35,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    GroupHeaderLeftStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    LabelStyle: {
        fontSize: 18,
        marginLeft: 10
    },

    MessageContainerStyle: {
        flex: 1,
        padding: 10
    },

    RecipientContainerStyle: {
        flexDirection: 'row',
        marginLeft: 70,
        padding: 5,
        alignItems: 'center'
    },

    ShowHideButtonContainerStyle: {
        borderRadius: 4,
        backgroundColor: '#006fce',
        padding: 5
    },

    ShowHideButtonLabelStyle: {
        fontSize: 14,
        color: '#fff'
    }
};

AdminBroadcastRecipientsUi.propTypes = {
    fetching: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string.isRequired,
    groups: PropTypes.object.isRequired,
    selected: PropTypes.arrayOf(PropTypes.number).isRequired,

    selectAllGroupMembers: PropTypes.func.isRequired,
    selectEveryone: PropTypes.func.isRequired,
    unselectAllGroupMembers: PropTypes.func.isRequired,
    unselectEveryone: PropTypes.func.isRequired,
    userPressed: PropTypes.func.isRequired
};

export const AdminBroadcastRecipients =
    connect(mapAdminBroadcastRecipientsProps, mapAdminBroadcastRecipientsDispatch)
    (AdminBroadcastRecipientsUi);
