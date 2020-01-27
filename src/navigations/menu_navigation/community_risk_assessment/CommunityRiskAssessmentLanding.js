import React from 'react';
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import CapacityAndVulnerabilityScreen from '../../../components/layout/menu/community_risk_assessment/CapacityAndVulnerabilityScreen';
import CommunityRiskAssessmentScreen from '../../../components/layout/menu/community_risk_assessment/CommunityRiskAssessmentScreen';
import HazardMapScreen from '../../../components/layout/menu/community_risk_assessment/HazardMapScreen';

let {height} = Dimensions.get('window');

const CommunityRiskAssessment = createMaterialTopTabNavigator({
    HazardMapping: {
        screen: HazardMapScreen,
        navigationOptions: {
            tabBarLabel: 'Hazard Mapping'
        },
    },
    CVD: {
        screen: CapacityAndVulnerabilityScreen,
        navigationOptions: {
            tabBarLabel: 'Capacity and Vulnerability'
        },
    },
    CRA: {
        screen: CommunityRiskAssessmentScreen,
        navigationOptions: {
            tabBarLabel: 'Community Risk Assessment'
        },
    },
}, {
    tabBarOptions: {
        labelStyle: {
            fontSize: height* 0.015,
            alignContent: 'center'
        },
        style: {
            backgroundColor: '#083451',
            height: height* 0.08,
        },
        indicatorStyle: {
            backgroundColor: '#f27e10'
        }
    }
});

CommunityRiskAssessment.navigationOptions = {
    headerShown: false,
};

export default createAppContainer(CommunityRiskAssessment);