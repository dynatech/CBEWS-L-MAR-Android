import React from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import CurrentAlertScreen from '../../../components/layout/menu/alert_generation/CurrentAlertScreen';
import AlertValidationScreen from '../../../components/layout/menu/alert_generation/AlertValidationScreen';

let {height} = Dimensions.get('window');

const AlertGeneration = createMaterialTopTabNavigator({
    CurrentAlert: {
        screen: CurrentAlertScreen,
        navigationOptions: {
            tabBarLabel: 'Latest Alert Level'
        },
    },
    AlertValidation: {
        screen: AlertValidationScreen,
        navigationOptions: {
            tabBarLabel: 'Alert Validation'
        },
    }
}, {
    tabBarOptions: {
        labelStyle: {
            fontSize: height * 0.019,
            alignContent: 'center'
        },
        style: {
            backgroundColor: '#083451',
            height: height* 0.07,
        },
        indicatorStyle: {
            backgroundColor: '#f27e10'
        }
    }
});

export default createAppContainer(AlertGeneration);