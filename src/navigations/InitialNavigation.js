import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from '../components/layout/LoginScreen';
import DashboardScreen from '../components/layout/DashboardScreen';

const InitialScreens = createStackNavigator({
    Login: {
        screen: LoginScreen
    },
    Dashboard: {
        screen: DashboardScreen
    }
});

export default createAppContainer(InitialScreens);
