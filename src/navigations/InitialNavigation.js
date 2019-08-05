import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from '../components/layout/LoginScreen';
import Landing from '../navigations/SideMenuNavigation';

const InitialScreens = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    },
    Dashboard: {
        screen: Landing,
        navigationOptions: {
            header: null
        }
    }
});

export default createAppContainer(InitialScreens);
