import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../components/layout/LoginScreen';
import QuickRegistrationScreen from '../components/layout/QuickRegistrationScreen';
import ForgotPasswordScreen from '../components/layout/ForgotPasswordScreen';
import Landing from '../navigations/SideMenuNavigation';

const InitialScreens = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    Dashboard: {
        screen: Landing,
        navigationOptions: {
            headerShown: false
        }
    },
    ForgotPassword: {
        screen: ForgotPasswordScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    QuickRegistration: {
        screen: QuickRegistrationScreen,
        navigationOptions: {
            headerShown: false
        }
    }
});

export default createAppContainer(InitialScreens);
