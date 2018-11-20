import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Profile } from './Profile';
import { MyBroadcasts } from './MyBroadcasts';
import { logout } from '../helpers';

export const MainNoAdmin = createBottomTabNavigator({
    Profile: Profile,
    'My Broadcasts': MyBroadcasts
}, {
    initialRouteName: 'Profile',
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Profile') {
                iconName = 'ios-person';
            } else if (routeName === 'My Broadcasts') {
                iconName = 'ios-radio';
            }

            return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor}/>
        }
    })
});

MainNoAdmin.navigationOptions = ({ navigation }) => ({
    title: 'BroncoCast',
    headerRight: (
        <TouchableOpacity
            onPress={() => logout(navigation)}
            style={{ flex: 1, marginRight: 5, alignItems: 'center'}}
        >
            <Ionicons name="ios-log-out" size={25} color="#000"/>
            <Text>Sign Out</Text>
        </TouchableOpacity>
    )
});
