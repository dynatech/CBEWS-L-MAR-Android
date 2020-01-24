import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from '../components/layout/LoginScreen';
import QuickRegistrationScreen from '../components/layout/QuickRegistrationScreen';
import ForgotPasswordScreen from '../components/layout/ForgotPasswordScreen';
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
    },
    ForgotPassword: {
        screen: ForgotPasswordScreen,
        navigationOptions: {
            header: null
        }
    },
    QuickRegistration: {
        screen: QuickRegistrationScreen,
        navigationOptions: {
            header: null
        }
    }
});

export default createAppContainer(InitialScreens);
