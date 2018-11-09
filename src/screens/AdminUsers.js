import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mapAdminUsersProps, mapAdminUsersDispatch } from '../maps/AdminUsers.map';
import { connect } from 'react-redux';
import { FlatList, Picker, Text, TouchableOpacity, View } from 'react-native';
import { AdminUsersModal } from './AdminUsersModal';

class AdminUsersUi extends Component {
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

    renderDeliveryProblemsButton() {
        const label = `${this.props.numDeliveryProblems === 0 ? 'No' : this.props.numDeliveryProblems} blocked`;
        const {
            BlockedButtonSelectedStyle,
            BlockedButtonUnselectedStyle,
            BlockedTextStyle,
            NeutralButtonSelectedStyle,
            NeutralButtonUnselectedStyle,
            NeutralTextStyle
        } = styles;
        let buttonStyle;
        if (this.props.numDeliveryProblems) {
            buttonStyle = this.props.filterOn === 'onlydeliveryproblems' ? BlockedButtonSelectedStyle : BlockedButtonUnselectedStyle;
        } else {
            buttonStyle = this.props.filterOn === 'onlydeliveryproblems' ? NeutralButtonSelectedStyle : NeutralButtonUnselectedStyle;
        }

        return (
            <TouchableOpacity onPress={() => this.props.setFilterOn('onlydeliveryproblems')}>
                <View style={buttonStyle}>
                    <Text style={this.props.numDeliveryProblems ? BlockedTextStyle : NeutralTextStyle}>{label}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderHiddenUsersButton() {
        let label;
        const newFilterOn = this.props.filterOn === 'hidehidden' ? 'showhidden' : 'hidehidden';
        const { NeutralButtonSelectedStyle, NeutralButtonUnselectedStyle, NeutralTextStyle } = styles;
        const { filterOn, numHidden, setFilterOn } = this.props;
        const buttonStyle = (filterOn === 'showhidden' || filterOn === 'hidehidden') ?
            NeutralButtonSelectedStyle : NeutralButtonUnselectedStyle;
        if (numHidden === 0) {
            label = 'No hidden users';
        } else {
            if (filterOn === 'hidehidden') {
                label = `Show ${numHidden} hidden user${numHidden === 1 ? '' : 's'}`;
            } else {
                label = `Hide ${numHidden} hidden user${numHidden === 1 ? '' : 's'}`;
            }
        }

        return (
            <TouchableOpacity onPress={() => setFilterOn(newFilterOn)}>
                <View style={buttonStyle}>
                    <Text style={NeutralTextStyle}>{label}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderStatusBadge = user => {
        const {
            BlockedBadgeStyle,
            BlockedTextStyle,
            NeutralBadgeStyle,
            NeutralTextStyle,
            UnapprovedBadgeStyle,
            UnapprovedTextStyle
        } = styles;

        if (!user.Approved) {
            return (
                <View style={UnapprovedBadgeStyle}>
                    <Text style={UnapprovedTextStyle}>Not Approved</Text>
                </View>
            );
        }
        else if (user.HasDeliveryError) {
            return (
                <View style={BlockedBadgeStyle}>
                    <Text style={BlockedTextStyle}>Blocked</Text>
                </View>
            );
        }
        else if (user.Hidden) {
            return (
                <View style={NeutralBadgeStyle}>
                    <Text style={NeutralTextStyle}>Hidden</Text>
                </View>
            );
        } else {
            return null;
        }
    };

    renderSubtitle = user => {
        if (user.Approved) {
            return <Text>{user.Groups}</Text>;
        } else {
            return <Text style={styles.UnapprovedStyle}>Not Approved</Text>;
        }
    };

    renderUnapprovedButton() {
        const label = `${this.props.numUnapproved === 0 ? 'No' : this.props.numUnapproved} unapproved`;
        const {
            NeutralButtonSelectedStyle,
            NeutralButtonUnselectedStyle,
            NeutralTextStyle,
            UnapprovedButtonSelectedStyle,
            UnapprovedButtonUnselectedStyle,
            UnapprovedTextStyle
        } = styles;
        let buttonStyle;
        if (this.props.numUnapproved) {
            buttonStyle = this.props.filterOn === 'onlyunapproved' ? UnapprovedButtonSelectedStyle : UnapprovedButtonUnselectedStyle;
        } else {
            buttonStyle = this.props.filterOn === 'onlyunapproved' ? NeutralButtonSelectedStyle : NeutralButtonUnselectedStyle;
        }

        return (
            <TouchableOpacity onPress={() => this.props.setFilterOn('onlyunapproved')}>
                <View style={buttonStyle}>
                    <Text style={this.props.numUnapproved ? UnapprovedTextStyle : NeutralTextStyle}>{label}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderUserItem = ({item}) => {
        const {
            UserBadgeStyle,
            UserContainerStyle,
            UserNameStyle,
            UserTextStyle
        } = styles;

        let name = item.UsrName;
        if (item.IsAdmin) {
            name += ' (Admin)';
        }

        return (
            <TouchableOpacity onPress={() => this.props.showUserDetail(item.UsrId, this.props.navigation)}>
                <View style={UserContainerStyle}>
                    <View style={UserTextStyle}>
                        <Text style={UserNameStyle}>{name}</Text>
                        {this.renderSubtitle(item)}
                    </View>
                    <View style={UserBadgeStyle}>
                        {this.renderStatusBadge(item)}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const {
            ContainerStyle,
            UsersListStyle
        } = styles;

        return (
            <View style={ContainerStyle}>
                {this.renderAdminOrgHeader()}
                <AdminUsersModal/>
                <View style={{ flexDirection: 'row' }}>
                    {this.renderHiddenUsersButton()}
                    {this.renderUnapprovedButton()}
                    {this.renderDeliveryProblemsButton()}
                </View>
                <FlatList
                    data={this.props.users}
                    renderItem={this.renderUserItem}
                    style={UsersListStyle}
                    keyExtractor={item => item.UsrId.toString()}
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

    BlockedBadgeStyle: {
        backgroundColor: '#cf272a',
        borderRadius: 4,
        padding: 5,
        marginLeft: 10
    },

    BlockedButtonSelectedStyle: {
        backgroundColor: '#cf272a',
        borderRadius: 4,
        padding: 5,
        marginLeft: 10,
        borderWidth: 2,
        borderColor: '#25a3ff'
    },

    BlockedButtonUnselectedStyle: {
        backgroundColor: '#cf272a',
        borderRadius: 4,
        padding: 5,
        marginLeft: 10,
        borderWidth: 2,
        borderColor: '#cf272a'
    },

    BlockedTextStyle: {
        color: '#fff'
    },

    NeutralBadgeStyle: {
        backgroundColor: '#777',
        borderRadius: 4,
        padding: 5,
        marginLeft: 10
    },

    NeutralButtonSelectedStyle: {
        backgroundColor: '#777',
        borderRadius: 4,
        padding: 5,
        marginLeft: 10,
        borderWidth: 2,
        borderColor: '#25a3ff'
    },

    NeutralButtonUnselectedStyle: {
        backgroundColor: '#777',
        borderRadius: 4,
        padding: 5,
        marginLeft: 10,
        borderWidth: 2,
        borderColor: '#777'
    },

    NeutralTextStyle: {
        color: '#fff'
    },

    UnapprovedBadgeStyle: {
        backgroundColor: '#f7f351',
        borderRadius: 4,
        padding: 5,
        marginLeft: 10
    },

    UnapprovedButtonSelectedStyle: {
        backgroundColor: '#f7f351',
        borderRadius: 4,
        padding: 5,
        marginLeft: 10,
        borderWidth: 2,
        borderColor: '#25a3ff'
    },

    UnapprovedButtonUnselectedStyle: {
        backgroundColor: '#f7f351',
        borderRadius: 4,
        padding: 5,
        marginLeft: 10,
        borderWidth: 2,
        borderColor: '#f7f351'
    },

    UnapprovedTextStyle: {
        color: '#000'
    },

    UnapprovedStyle: {
        color: '#cf2a27'
    },

    UserBadgeStyle: {
        justifyContent: 'center'
    },

    UserContainerStyle: {
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 6,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1
    },

    UserNameStyle: {
        fontSize: 18
    },

    UserTextStyle: {
        flex: 1,
        flexDirection: 'column'
    },

    UsersListStyle: {
        marginTop: 10
    }
};

AdminUsersUi.propTypes = {
    adminOrgId: PropTypes.number.isRequired,
    adminOrgName: PropTypes.string.isRequired,
    adminOrgs: PropTypes.array.isRequired,
    filterOn: PropTypes.string.isRequired,
    numDeliveryProblems: PropTypes.number.isRequired,
    numHidden: PropTypes.number.isRequired,
    numUnapproved: PropTypes.number.isRequired,
    users: PropTypes.array.isRequired,

    adminOrgChanged: PropTypes.func.isRequired,
    init: PropTypes.func.isRequired,
    setFilterOn: PropTypes.func.isRequired,
    setOrgId: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    showUserDetail: PropTypes.func.isRequired
};

export const AdminUsers = connect(mapAdminUsersProps, mapAdminUsersDispatch)(AdminUsersUi);
